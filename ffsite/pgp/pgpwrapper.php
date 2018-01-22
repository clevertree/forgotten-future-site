<?php
/**
 * Created by PhpStorm.
 * User: ari
 * Date: 1/21/2018
 * Time: 6:32 PM
 */
namespace FFSite\PGP;

use phpseclib\Crypt\RSA;

require_once __DIR__ . '/lib/openpgp/lib/openpgp.php';
require_once __DIR__ . '/lib/openpgp/lib/openpgp_crypt_rsa.php';
require_once __DIR__ . '/lib/openpgp/lib/openpgp_crypt_symmetric.php';

class PGPWrapper
{
    public function generateKeyPair($bitCount = 1024) {

        $rsa = new RSA();
        $k = $rsa->createKey($bitCount);

        $rsa->loadKey($k['privatekey']);

        $nkey = new \OpenPGP_SecretKeyPacket(array(
            'n' => $rsa->modulus->toBytes(),
            'e' => $rsa->publicExponent->toBytes(),
            'd' => $rsa->exponent->toBytes(),
            'p' => $rsa->primes[2]->toBytes(),
            'q' => $rsa->primes[1]->toBytes(),
            'u' => $rsa->coefficients[2]->toBytes()
        ));



        $uid = new \OpenPGP_UserIDPacket('Test <test@example.com>');

        $wkey = new \OpenPGP_Crypt_RSA($nkey);
        $m = $wkey->sign_key_userid(array($nkey, $uid));
        $pubm = clone($m);
        $pubm[0] = new \OpenPGP_PublicKeyPacket($pubm[0]);

        $privateKey = \OpenPGP::enarmor($m->to_bytes(), 'PRIVATE KEY');
        $privateKey = wordwrap($privateKey, 64, "\n", 1);

        $publicKey = \OpenPGP::enarmor($pubm->to_bytes(), 'PUBLIC KEY');
        $publicKey = wordwrap($publicKey, 64, "\n", 1);

        return array($privateKey, $publicKey);
    }

    public function encrypt($armoredPublicKey, $unencryptedContent) {
        $publicKey = \OpenPGP::unarmor($armoredPublicKey, 'PUBLIC KEY');
        $publicKey = \OpenPGP_Message::parse($publicKey);

        $data = new \OpenPGP_LiteralDataPacket($unencryptedContent, array('format' => 'u'));  // , 'filename' => 'stuff.txt'
        $encrypted = \OpenPGP_Crypt_Symmetric::encrypt($publicKey, new \OpenPGP_Message(array($data)));
        $armoredMessage = \OpenPGP::enarmor($encrypted->to_bytes(), "PGP MESSAGE");
        $armoredMessage = wordwrap($armoredMessage, 64, "\n", 1);
        return $armoredMessage;
    }

    public function decrypt($armoredPrivateKey, $armoredMessage) {
        $privateKey = \OpenPGP::unarmor($armoredPrivateKey, 'PRIVATE KEY');
        $privateKey = \OpenPGP_Message::parse($privateKey);

        $message = \OpenPGP::unarmor($armoredMessage, 'PGP MESSAGE');
        $encryptedMessage = \OpenPGP_Message::parse($message);


// Now decrypt it with the same key
        $decryptor = new \OpenPGP_Crypt_RSA($privateKey);
        $decrypted = $decryptor->decrypt($encryptedMessage);

        return $decrypted[0]->data;
    }


    // Static


    // Unit Test

    public static function _test() {
        echo "\nTesting " . __CLASS__ . "...\n";
        set_include_path(dirname(__DIR__, 2));
        spl_autoload_register();
        $PGP = new PGPWrapper();
        $keypair = $PGP->generateKeyPair();
        print_r($keypair);

        $text = 'encrypt me';
        $encryptedText = $PGP->encrypt($keypair[1], $text);
        echo $encryptedText;

        $decryptedText = $PGP->decrypt($keypair[0], $encryptedText);
        echo "\n" . $decryptedText;
    }
}

if(@$argv[0] === __FILE__)
    PGPWrapper::_test();

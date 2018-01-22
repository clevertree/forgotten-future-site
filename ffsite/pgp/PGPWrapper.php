<?php
/**
 * Created by PhpStorm.
 * User: ari
 * Date: 1/21/2018
 * Time: 6:32 PM
 */
namespace FFSite\PGP;

use phpseclib\Crypt\RSA;

require_once dirname(__DIR__, 2).'/lib/openpgp/lib/openpgp.php';
require_once dirname(__DIR__, 2).'/lib/openpgp/lib/openpgp_crypt_rsa.php';

class PGPWrapper
{
    public function generateKeyPair($bitCount = 1024) {

        $rsa = new RSA();
        $k = $rsa->createKey($bitCount);
        return array($k['privatekey'], $k['publickey']);
    }


    // Static


    // Unit Test

    public static function _test() {
        set_include_path(dirname(__DIR__, 2));
        spl_autoload_register();
        $PGP = new PGPWrapper();
        $keypair = $PGP->generateKeyPair();
        print_r($keypair);
    }
}

if(@$argv[0] === __FILE__)
    PGPWrapper::_test();

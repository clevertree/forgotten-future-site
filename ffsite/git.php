<?php
/**
 * Created by PhpStorm.
 * User: ari
 * Date: 9/11/2017
 * Time: 4:07 PM
 */

header("Content-Type: text/plain");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$params = @$_REQUEST['payload'] ?: file_get_contents('php://input');
if($params && $params[0] === '{') {
    $params = json_decode($params, true);
} else {
    $params = $_REQUEST;
}

echo "Executing Git Pull...\n";
chdir('/var/www/forgotten-future');
echo exec("git pull");
chdir('/var/www/forgotten-future/game');
echo exec("git pull");
chdir('/var/www/forgotten-future/media');
echo exec("git pull");

echo "\nParameters: \n";
print_r ($params);

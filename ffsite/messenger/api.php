<?php
/**
 * Created by PhpStorm.
 * User: ari
 * Date: 9/11/2017
 * Time: 4:07 PM
 */

use FFSite\Database;
use FFSite\Table\UserTokenRow;
use FFSite\Messenger\MessengerAPI;

set_include_path(dirname(__DIR__, 2));
spl_autoload_register();

header("Content-Type: application/json");

$params = @$_REQUEST['payload'] ?: file_get_contents('php://input');
if($params && $params[0] === '{') {
    $params = json_decode($params, true);
} else {
    $params = $_POST;
}

//$params = array(
//    'action' => 'subscribe',
//    'token' => 'omg',
//);

$DB = new Database();

$json = array('error' => null);
try {
    switch($params['action']) {
        default:
            $json = array(
                'error' => 'No Action',
                'params' => $params
            );
            break;

        case 'subscribe':
            $token = htmlspecialchars($params['token']);
            $topics = explode(', ', htmlspecialchars(@$params['topics'] ?: 'default'));

            $Token = UserTokenRow::fetchByToken($token, false);
            if($Token) {
//                http_response_code(409);
                $json = array(
                    'message' => "Token was already found",
//                'user_id' => 1,
                );
            } else {
                $Token = UserTokenRow::createNewToken($token);
                $json = array(
                    'message' => "User token stored successfully",
//                'user_id' => 1,
                );
            }

            $API = new MessengerAPI();


            foreach(array('news', 'dev') as $availableTopic) {
                if(in_array($availableTopic, $topics)) {
                    $API->subscribeToTopic($Token, $availableTopic);
                } else {
                    $API->unSubscribeToTopic($Token, $availableTopic);
                }
                unset($topics[array_search($availableTopic, $topics)]);
            }
            if($topics)
                error_log("Invalid Topics: " . print_r($topics, true));

            $json['message_result'] = $API->sendMessage($Token, "WELCOME TEST BODY", "TEST TITLE");

            break;
    }
} catch (Exception $ex) {
    http_response_code(400);
    $json = array(
        'error' => $ex->getMessage(),
        'trace' => $ex->getTraceAsString(),
        'params' => $params
    );
}

echo json_encode($json, JSON_PRETTY_PRINT);

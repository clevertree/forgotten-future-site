<?php
/**
 * Created by PhpStorm.
 * User: ari
 * Date: 1/19/2018
 * Time: 4:18 PM
 */

namespace FFSite\Messenger;


use FFSite\Table\UserTokenRow;

class MessengerAPI
{
    static $AUTH_KEY = "AIzaSyD4wjBH_zXgZJfcmLrY7EO8jKgwFTwq9BE"; // "AIzaSyCAt5-jWUZm44niJxq4c1PonrnQdJI0v-U";
    static $PROJECT_ID = "forgotten-future";

    /**
     * @param UserTokenRow $Token
     * @param $topic
     * @throws \Exception
     */
    function subscribeToTopic(UserTokenRow $Token, $topic, $verb = "POST") {
        $URL = "https://iid.googleapis.com/iid/v1/{$Token->getToken()}/rel/topics/$topic";

        $ch = curl_init($URL);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $verb);
//        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));
//        curl_setopt($ch, CURLOPT_HEADER  , true);  // we want headers
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                "Content-Type: application/json",
                "Authorization: key=" . self::$AUTH_KEY,
                'Content-Length: 0', // . strlen($data_string))
        ));

        $result = curl_exec($ch);
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
//        echo $httpcode;
        if($httpcode !== 200)
            throw new \Exception($result);
    }

    function sendMessage(UserTokenRow $Token, $body, $title) {
//        $URL = "https://fcm.googleapis.com/v1/projects/" . MessengerAPI::$PROJECT_ID . "/messages:send";
        $URL = "https://fcm.googleapis.com/fcm/send";
        $params = array(
//            'to' => $Token->getToken(),
            'to' => '/topics/news',
            'data' => array(
                'title' => $title,
                'body' => $body,
                'icon' => 'assets/img/icon/logo_192.png',
            )
        );
        $param_string = json_encode($params, JSON_PRETTY_PRINT);

        $ch = curl_init($URL);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $param_string);
//        curl_setopt($ch, CURLOPT_HEADER  , true);  // we want headers
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "Content-Type: application/json",
            "Authorization: key=" . self::$AUTH_KEY,
            'Content-Length: ' . strlen($param_string)
        ));

        $result = curl_exec($ch);
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
//        echo $httpcode;
        if($httpcode !== 200)
            throw new \Exception($result);

        $json = json_decode($result, true);
        return $json;
    }

    /**
     * @param UserTokenRow $Token
     * @param $topic
     * @param string $verb
     * @throws \Exception
     */
    function unSubscribeToTopic(UserTokenRow $Token, $topic, $verb = "DELETE") {
        $this->subscribeToTopic($Token, $topic, $verb);
    }
}

/**

POST https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send HTTP/1.1

Content-Type: application/json
Authorization: Bearer ya29.ElqKBGN2Ri_Uz...HnS_uNreA
{
"message":{
"topic" : "foo-bar",
"notification" : {
"body" : "This is a Firebase Cloud Messaging Topic Message!",
"title" : "FCM Message",
}
}
}


https://iid.googleapis.com/iid/v1/nKctODamlM4:CKrh_PC8kIb7O...clJONHoA/rel/topics/movies
Content-Type:application/json
Authorization:key=AIzaSyZ-1u...0GBYzPu7Udno5aA
 **/
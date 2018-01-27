<?php
/**
 * Created by PhpStorm.
 * User: ari
 * Date: 1/19/2018
 * Time: 3:03 PM
 */

namespace FFSite\Table;

use FFSite\Database;

class UserTokenRow
{
    const _CLASS = __CLASS__;
    const TABLE = 'user_token';

    // Table ticket
    protected $id;
    protected $user_id;
    protected $token;
    protected $created;
    protected $extra;

    const SQL_SELECT = "
        SELECT
            ut.*
        FROM user_token ut
        LEFT JOIN user u on u.id = ut.user_id
";
    const SQL_GROUP_BY = ""; // "\nGROUP BY s.id";
    const SQL_ORDER_BY = "\nORDER BY ut.id DESC";

    public function getID()             { return $this->id; }
    public function getUserID()         { return $this->user_id; }
    public function getToken()          { return $this->token; }
    public function getCreateDate()     { return $this->created; }
    public function getExtra() {
        if(!is_array($this->extra))
            $this->extra = json_decode($this->extra, false);
        return $this->extra;
    }

    public function updateExtra(Array $extra, $replace=false) {
        if(!$replace)
            $extra = $extra + $this->getExtra();

        $this->extra = json_encode($extra, JSON_PRETTY_PRINT);

        $values = array(
            ':extra' => $this->extra,
            ':id' => $this->id
        );

        $SQL = "UPDATE user_token SET 
            `extra` = :extra
        WHERE id = :id";

        $DB = Database::getInstance();
        $stmt = $DB->prepare($SQL);

        $ret = $stmt->execute($values);
        if(!$ret)
            throw new \PDOException("Failed to update row");

        return $stmt->rowCount();
    }


    // Static


    /**
     * Delete a row
     * @param UserTokenRow $UserTokenRow
     */
    public static function delete(UserTokenRow $UserTokenRow) {
        $SQL = "DELETE from user_token WHERE id = :id";
        $DB = Database::getInstance();
        $stmt = $DB->prepare($SQL);
        $ret = $stmt->execute(array(
            ':id' => $UserTokenRow->getID()
        ));

        if(!$ret)
            throw new \PDOException("Failed to delete row");
        if($stmt->rowCount() === 0)
            error_log("Failed to delete row: " . print_r($UserTokenRow, true));
    }

    /**
     * @param string $token
     * @param UserRow $UserRow
     * @param null $ip_address
     * @param null $hostname
     * @param null $agent
     * @param array|null $extra
     * @return UserTokenRow
     */
    public static function createNewToken(
        $token,
        UserRow $UserRow=null,
        $ip_address = null,
        $hostname = null,
        $agent = null,
        Array $extra = NULL
    ){
        $ip_address = $ip_address   ?: @$_SERVER['REMOTE_ADDR'];
        $hostname = $hostname       ?: gethostbyaddr($ip_address);
        $agent = $agent             ?: @$_SERVER['HTTP_USER_AGENT'];

        $values = array(
            ':token' => $token,
            ':user_id' => $UserRow ? $UserRow->getID() : NULL,
            ':ip_address' => $ip_address,
            ':hostname' => $hostname,
            ':agent' => $agent,
            ':extra' => $extra ? json_encode($extra, JSON_PRETTY_PRINT) : NULL,
        );

        $SQL = "INSERT INTO user_token SET 
            `token` = :token,
            `user_id` = :user_id,
            `ip_address` = :ip_address,
            `hostname` = :hostname,
            `agent` = :agent,
            `extra` = :extra,
            `created` = UTC_TIMESTAMP()
            ";

        $DB = Database::getInstance();
        $stmt = $DB->prepare($SQL);
        $stmt->execute($values);

        $id = $DB->lastInsertId();
        $Row = static::fetchByID($id);
        return $Row;
    }

    // Query and Fetch

    public static function queryByField($field, $value) {
        $DB = Database::getInstance();
        $Query = $DB->prepare(static::SQL_SELECT . "WHERE ut.{$field} = ?");
        /** @noinspection PhpMethodParametersCountMismatchInspection */
        $Query->setFetchMode(\PDO::FETCH_CLASS, self::_CLASS);
        $Query->execute(array($value));
        return $Query;
    }

    /**
     * @param $field
     * @param $value
     * @param bool $throwException
     * @return UserTokenRow
     */
    public static function fetchByField($field, $value, $throwException=true) {
        $Row = static::queryByField($field, $value)
            ->fetch();
        if(!$Row && $throwException)
            throw new \InvalidArgumentException("{$field} not found: " . $value);
        return $Row;
    }


    /**
     * @param string $token
     * @param bool $throwException
     * @return UserTokenRow
     * @throws \Exception
     */
    public static function fetchByToken($token, $throwException=true) {
        return static::fetchByField('token', $token, $throwException);
    }

    /**
     * @param string $id
     * @param bool $throwException
     * @return UserTokenRow
     */
    public static function fetchByID($id, $throwException=true) {
        return static::fetchByField('id', $id, $throwException);
    }

    // Generate UID

    /**
     * Generate a UID
     * @return string
     */
    public static function generateReferenceNumber() {
        return 'U-' . sprintf('%04X%04X-%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
    }

    // Unit Test

    public static function _test() {
        echo "\nTesting " . __CLASS__ . "...\n";
        set_include_path(dirname(__DIR__, 2));
        spl_autoload_register();
        $TestUserToken = UserTokenRow::createNewToken('_testtoken');
        UserTokenRow::delete($TestUserToken);
        print_r($TestUserToken);
    }
}

if(@$argv[0] === __FILE__)
    UserTokenRow::_test();

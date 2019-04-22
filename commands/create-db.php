<?php


$root          = $argv[1];
$root_password = $argv[2];
$db            = $argv[3];
$host          = '127.0.0.1';
$driver        = 'mysql';

$user = isset($argv[4]) ? $argv[4] : $argv[3];
$pass = '123456';


try {
    $dbh = new PDO("mysql:host=$host", $root, $root_password);

    $dbh->exec("CREATE DATABASE `$db`;
                CREATE USER '$user'@'localhost' IDENTIFIED BY '$pass';
                GRANT ALL ON `$db`.* TO '$user'@'localhost';
                FLUSH PRIVILEGES;")
    or die(print_r($dbh->errorInfo(), true));

} catch (PDOException $e) {
    die("DB ERROR: ". $e->getMessage());
}
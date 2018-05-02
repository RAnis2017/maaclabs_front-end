<?php
    class db{
        // Properties 
        public $dbhost = 'localhost';
        public $dbuser = 'root';
        public $dbpass = '';
        public $dbname = 'newman';
    
    public function connect(){
        $dbhost = 'localhost';
        $dbuser = 'root';
        $dbpass = '';
        $dbname = 'newman';
    
        $mysql_connect_str = "mysql:host=".$dbhost.";dbname=".$dbname.";";
        $dbConnection = new PDO($mysql_connect_str,$dbuser,$dbpass);
        $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbConnection;
    }
}
?>
<?php

define('TPREFIX', "nms");

class TNDB {
    public static $ctx = null;
    public static function init() {
        self::$ctx = new medoo(array(
        'database_type' => 'mysql',
        'database_name' => "lc000386_nms", 
        'server' => "localhost", 
        'username' => "lc000386_nms",
        'password' => "Gugurama12"
      ));

        DB::$user       = 'lc000386_nms';
        DB::$password   = 'Gugurama12'; 
        DB::$dbName     = 'lc000386_nms';
        DB::$host       = 'localhost'; 
        DB::$port       = '3306';
    }
}


//PERFIL

class FlightHelper{
    public static function getData() {
        return json_decode(file_get_contents('php://input'),TRUE);
    }
}


class TN_Group {
    public static function add($description) {
        TNDB::$ctx->insert('tn_group', [
                "description"=>$description
            ]);
    }
}

class TN_Profile {
    public static function add($description,$_group_id) {
        TNDB::$ctx->insert('tn_profile', [
                "description"=>$description,
                "_group_id" => $_group_id
            ]);
    }
}

class TN_User {
    public static function add($name,$pass,$_group_id,$_perfil_id) {
        TNDB::$ctx->insert('tn_user', [
                "name"=>$name,
                "pass"=>$pass,
                "_group_id"=>$_group_id,
                "_perfil_id"=>$_perfil_id
            ]);
    }
}


?>

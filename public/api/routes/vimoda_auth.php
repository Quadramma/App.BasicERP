<?php
//VIMODA_LOGIN

define('VIMODA_LOGIN_ROUTE_GETTOKEN', "POST /login");
define('VIMODA_LOGIN_ROUTE_CHECKTOKEN', "GET /login/@token");
define('VIMODA_LOGIN_ROUTE_AUTH'    , "POST /login/@id:[0-9]+");

define('VIMODA_GROUP_ID', "3");

Flight::map("DecodeToken",function($token){
    $tokenDecoded = base64_decode($token);
    return json_decode($tokenDecoded);
});
Flight::map("ValidateToken",function($tokenObj){
    $ok = true;
    $message = "Token Validated";
    
    //DB User
    $user = Flight::DB_GetUserByID($tokenObj->_user_id);
    
    //Group validation
    if($tokenObj->_group_id != $user["_group_id"]){
        $message = "Token Validation Fail (_group_id)";
        $ok = false;
    }

    //Profile validation
    if($tokenObj->_profile_id != $user["_profile_id"]){
        $message = "Token Validation Fail (_profile_id)";
        $ok = false;
    }

    //Date expiration validation
    $currDate = strtotime((string)date("Y-m-d H:i:s"));
    $expDate  = strtotime($tokenObj->tokenExp);
    $hasExpire = (abs($currDate) > abs($expDate));
    if($hasExpire){
        $message = "Token Validation Fail (Token expired)";
        $ok = false;
    }

    
    return array(
            "ok" => $ok
            //,"token" => $tokenObj
            ,"message" => $message
        );
});

Flight::route(VIMODA_LOGIN_ROUTE_CHECKTOKEN, function($token){
    Flight::setCrossDomainHeaders();
    TNDB::init();//always.
    $tokenObj = Flight::DecodeToken($token);
    $tokenValidation = Flight::ValidateToken($tokenObj);
    Flight::jsoncallback($tokenValidation);
});

Flight::route(VIMODA_LOGIN_ROUTE_GETTOKEN, function(){
    Flight::setCrossDomainHeaders();
	TNDB::init();//always.

    $data = FlightHelper::getData();//data

    $user = Flight::DB_GetUserByCredentials($data["loginname"],$data["password"]);

    $currDate = date("Y-m-d H:i:s");
    $tokenExp = date('Y-m-d H:i:s', strtotime("+1 min"));

    $res = array(
            "loginname" => $rta["loginname"]
            ,"token" =>  base64_encode(json_encode(array(
                "_user_id" => $user["_id"]
                ,"_group_id"=> $user["_group_id"]
                ,"_profile_id"=>$user["_profile_id"]
                ,"tokenExp" => $tokenExp
                ))) 
            ,"tokenNow" => $currDate
            ,"tokenExp" => $tokenExp
        );

    Flight::jsoncallback($res);
    //Flight::jsoncallback(array("post_loginname"=>$data["loginname"]));
});


Flight::map("DB_GetUserByCredentials",function($loginname,$password){
    $cols = "user._id";
    $cols = $cols. ","."user.loginname";
    $cols = $cols. ","."user.password";
    $cols = $cols. ","."usrgrp_grp._group_id";
    $cols = $cols. ","."usrgrp_grp._profile_id";

    $sql = "SELECT ".$cols." FROM nms_user user";
    $sql = $sql . " INNER JOIN nms_usergroup_group usrgrp_grp on usrgrp_grp._usergroup_id = user._usergroup_id and _group_id = %i_group_id";
    $sql = $sql . " WHERE user.loginname = %s_loginname"; // AND user.password = %s_password";

    $rta = DB::query($sql,array(
        "group_id" => VIMODA_GROUP_ID,
        "loginname" => $loginname
        //,"password" => ""
        ));
    return $rta[0];
});

Flight::map("DB_GetUserByID",function($id){
    $cols = "user._id";
    $cols = $cols. ","."user.loginname";
    $cols = $cols. ","."user.password";
    $cols = $cols. ","."usrgrp_grp._group_id";
    $cols = $cols. ","."usrgrp_grp._profile_id";
    //
    $sql = "SELECT ".$cols." FROM nms_user user";
    $sql = $sql . " INNER JOIN nms_usergroup_group usrgrp_grp on usrgrp_grp._usergroup_id = user._usergroup_id and _group_id = %i_group_id";
    $sql = $sql . " WHERE user._id = %i_id";
    //
    $rta = DB::query($sql,array(
        "group_id" => VIMODA_GROUP_ID,
        "id" => $id
        ));
    return $rta[0];
});



?>
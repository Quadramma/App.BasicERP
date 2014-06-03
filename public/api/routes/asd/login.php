<?php

//login

Flight::route('GET /login', function(){
    header("Access-Control-Allow-Origin: *");
    Flight::callback(json_encode(array("error"=>"You need to call POST with username,password")));
});

Flight::route('/login', function(){
	TNDB::init();//always.
    $data = FlightHelper::getData();
	$name 	= $data["username"];
	$pass 	= $data["password"];
    $has 	= TNDB::$ctx->has('qm_user', ["AND"=>["name"=>$name,"pass"=>$pass]])?1:0;

    header("Access-Control-Allow-Origin: *");
    Flight::callback(json_encode(array(
    	"ok"=>$has
    	, "username"=>$name
    	, "password"=>$pass
    	, "error" => TNDB::$ctx->error()
        , "data" => $data
    	)));
});


?>
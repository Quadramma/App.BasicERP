<?php

//USERS


Flight::route('/users', function(){
	TNDB::init();//always.
    $collection = TNDB::$ctx->select('tn_user', "*");
    Flight::callback(json_encode($collection));
});

Flight::route('/user/@id:[0-9]+', function($id){
    TNDB::init();//always.
    $collection = TNDB::$ctx->select('tn_user', "*",["_id"=>$id]);
    Flight::callback(json_encode($collection));
});

?>
<?php

//GROUPS

Flight::route('/groups', function(){
	TNDB::init();//always.
    $collection = TNDB::$ctx->select('tn_group', "*");
    Flight::callback(json_encode($collection));
});

Flight::route('/group/@id:[0-9]+', function($id){
    TNDB::init();//always.
    $collection = TNDB::$ctx->select('tn_group', "*",["_id"=>$id]);
    Flight::callback(json_encode($collection));
});

?>
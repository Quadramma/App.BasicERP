<?php

//CATEGORY
define('GA_CATEGORY_ROUTE_ALL', "GET /category");
define('GA_CATEGORY_ROUTE_SINGLE', "GET /category/@id:[0-9]+");
define('GA_CATEGORY_ROUTE_CREATE', "POST /category");
define('GA_CATEGORY_ROUTE_UPDATE', "POST /category/@id:[0-9]+");
define('GA_CATEGORY_ROUTE_DELETE', "DELETE /category/@id");
define('GA_CATEGORY_TABLE', 'ga_category');


Flight::route(GA_CATEGORY_ROUTE_ALL, function(){
	Flight::setCrossDomainHeaders();
	TNDB::init();
	$rta = TNDB::$ctx->select(GA_CATEGORY_TABLE, "*");
    Flight::jsoncallback($rta);
});

Flight::route(GA_CATEGORY_ROUTE_SINGLE, function($id){
	Flight::setCrossDomainHeaders();
    TNDB::init();//always.
    $rta = TNDB::$ctx->select(GA_CATEGORY_TABLE, "*",["_id"=>$id]);
    Flight::jsoncallback($rta);
});

Flight::route(GA_CATEGORY_ROUTE_CREATE, function(){
	Flight::setCrossDomainHeaders();
	TNDB::init();//always.
	$data = FlightHelper::getData();//data
	TNDB::$ctx->insert(GA_CATEGORY_TABLE, [
		"description" => $data["description"],
		"_category_type_id" => $data["_category_type_id"]
		]);
	Flight::jsoncallback(array(
			"ok"=>true,
			"dbResult"=>TNDB::$ctx->error(),
			));
});

Flight::route(GA_CATEGORY_ROUTE_UPDATE, function($id){
	TNDB::init();//always.
	Flight::setCrossDomainHeaders();
	$data = FlightHelper::getData();//data
	TNDB::$ctx->update(GA_CATEGORY_TABLE, [
		"description" => $data["description"]]
		,["_id" => $data["_id"]]);
	Flight::jsoncallback(array(
			"ok"=>true,
			"dbResult"=>TNDB::$ctx->error(),
			));
});

Flight::route(GA_CATEGORY_ROUTE_DELETE, function($id){
	Flight::setCrossDomainHeaders();
	TNDB::init();//always.
	TNDB::$ctx->delete(GA_CATEGORY_TABLE, ["_id" => $id]);
	Flight::jsoncallback(array(
			"ok"=> !TNDB::$ctx->has(GA_CATEGORY_TABLE, ["_id" => $id]),
			"dbResult"=>TNDB::$ctx->error()
			));
});




?>
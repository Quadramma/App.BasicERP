<?



//PROJECT
define('GA_PROJECT_ROUTE_ALL', "GET /project");
define('GA_PROJECT_ROUTE_SINGLE', "GET /project/@id:[0-9]+");
define('GA_PROJECT_ROUTE_CREATE', "POST /project");
define('GA_PROJECT_ROUTE_UPDATE', "POST /project/@id:[0-9]+");
define('GA_PROJECT_ROUTE_DELETE', "DELETE /project/@id");
define('GA_PROJECT_TABLE', 'ga_project');


Flight::route(GA_PROJECT_ROUTE_ALL, function(){
    Flight::setCrossDomainHeaders();
	TNDB::init();//always.
    $rta  = TNDB::$ctx->select(GA_PROJECT_TABLE
        , [   "[><]ga_category" => ["_category_id" => "_id"] ]
        , ["ga_project._id"
        ,"ga_project._category_id"
        ,"ga_project.name"
        ,"ga_project.url"
        ,"ga_category.description(categoryDescription)"
        ]);
    Flight::jsoncallback($rta);
});

Flight::route(GA_PROJECT_ROUTE_SINGLE, function($id){
    TNDB::init();//always.
    $rta = TNDB::$ctx->select(GA_PROJECT_TABLE, "*",["_id"=>$id]);
    Flight::callback(json_encode($rta));
});

Flight::route(GA_PROJECT_ROUTE_DELETE, function($id){
    Flight::setCrossDomainHeaders();
    TNDB::init();//always.
    TNDB::$ctx->delete(GA_PROJECT_TABLE, ["_id" => $id]);
    Flight::jsoncallback(array(
            "ok"=> !TNDB::$ctx->has(GA_PROJECT_TABLE, ["_id" => $id]),
            "dbResult"=>TNDB::$ctx->error()
            ));
});

Flight::route(GA_PROJECT_ROUTE_CREATE, function(){
    Flight::setCrossDomainHeaders();
    TNDB::init();//always.
    $data = FlightHelper::getData();//data
    TNDB::$ctx->insert(GA_PROJECT_TABLE, [
        'name' => $data["name"],
        'description' => $data["description"],
        "_category_id"=> $data["_category_id"],
        "url"=>   $data["url"],
        "slider_urls" => $data["slider_urls"]
        ]);
    Flight::jsoncallback(array(
            "ok"=>true,
            "dbResult"=>TNDB::$ctx->error(),
            ));
});

Flight::route(GA_PROJECT_ROUTE_UPDATE, function($id){
   Flight::setCrossDomainHeaders();
    TNDB::init();//always.
    $data = FlightHelper::getData();//data
    TNDB::$ctx->update(GA_PROJECT_TABLE, [
        'name' => $data["name"],
        'description' => $data["description"],
        "_category_id"=> $data["_category_id"],
        "url"=>   $data["url"],
        "slider_urls" => $data["slider_urls"]
        ],["_id"=>$id]);
    Flight::jsoncallback(array(
            "ok"=>true,
            "dbResult"=>TNDB::$ctx->error(),
            ));
});


?>
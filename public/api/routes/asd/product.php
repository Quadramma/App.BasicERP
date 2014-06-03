<?



//PRODUCT
define('GA_PRODUCT_ROUTE_ALL', "GET /product");
define('GA_PRODUCT_ROUTE_SINGLE', "GET /product/@id:[0-9]+");
define('GA_PRODUCT_ROUTE_CREATE', "POST /product");
define('GA_PRODUCT_ROUTE_UPDATE', "POST /product/@id:[0-9]+");
define('GA_PRODUCT_ROUTE_DELETE', "DELETE /product/@id");
define('GA_PRODUCT_TABLE', 'ga_product');


Flight::route("GET /product/getForCombo", function(){
    Flight::setCrossDomainHeaders();
    TNDB::init();//always.
    $rta  = TNDB::$ctx->select(GA_PRODUCT_TABLE
        , [   "[><]ga_category" => ["_category_id" => "_id"] ]
        , ["ga_product._id"
        ,"ga_product._category_id"
        ,"ga_product.name"
        ,"ga_product.code"
        ,"ga_product.url"
        ,"ga_category.description(categoryDescription)"
        ]);
    Flight::jsoncallback(array("items"=>$rta));
});

Flight::route(GA_PRODUCT_ROUTE_ALL, function(){
    Flight::setCrossDomainHeaders();
	TNDB::init();//always.
    $rta  = TNDB::$ctx->select(GA_PRODUCT_TABLE
        , [   "[><]ga_category" => ["_category_id" => "_id"] ]
        , ["ga_product._id"
        ,"ga_product._category_id"
        ,"ga_product.code"
        ,"ga_product.name"
        ,"ga_product.url"
        ,"ga_product.details1"
        ,"ga_product.details2"
        ,"ga_product.details3"
        ,"ga_category.description(categoryDescription)"
        ]);
    Flight::jsoncallback($rta);
});

Flight::route(GA_PRODUCT_ROUTE_SINGLE, function($id){
    TNDB::init();//always.
    $rta = TNDB::$ctx->select(GA_PRODUCT_TABLE, "*",["_id"=>$id]);
    Flight::callback(json_encode($rta));
});

Flight::route(GA_PRODUCT_ROUTE_DELETE, function($id){
    Flight::setCrossDomainHeaders();
    TNDB::init();//always.
    TNDB::$ctx->delete(GA_PRODUCT_TABLE, ["_id" => $id]);
    Flight::jsoncallback(array(
            "ok"=> !TNDB::$ctx->has(GA_PRODUCT_TABLE, ["_id" => $id]),
            "dbResult"=>TNDB::$ctx->error()
            ));
});

Flight::route(GA_PRODUCT_ROUTE_CREATE, function(){
    Flight::setCrossDomainHeaders();
    TNDB::init();//always.
    $data = FlightHelper::getData();//data
    TNDB::$ctx->insert(GA_PRODUCT_TABLE, [
        'code' =>           $data["code"],
        'name' =>           $data["name"],
        'description' =>    $data["description"],
        "_category_id"=>    $data["_category_id"],
        "url"=>             $data["url"],
        'details1' =>       $data["details1"],
        'details2' =>       $data["details2"],
        'details3' =>       $data["details3"],
        "slider_urls" =>    $data["slider_urls"]
        ]);
    Flight::jsoncallback(array(
            "ok"=>true,
            "dbResult"=>TNDB::$ctx->error(),
            ));
});



Flight::route(GA_PRODUCT_ROUTE_UPDATE, function($id){
   Flight::setCrossDomainHeaders();
    TNDB::init();//always.
    $data = FlightHelper::getData();//data
    TNDB::$ctx->update(GA_PRODUCT_TABLE, [
        'code' => $data["code"],
        'name' => $data["name"],
        'description' => $data["description"],
        "_category_id"=>$data["_category_id"],
        "url"=>$data["url"],
        'details1' => $data["details1"],
        'details2' => $data["details2"],
        'details3' => $data["details3"],
        "slider_urls" => $data["slider_urls"]
        ],["_id"=>$id]);
    Flight::jsoncallback(array(
            "ok"=>true,
            "dbResult"=>TNDB::$ctx->error(),
            ));
});


?>
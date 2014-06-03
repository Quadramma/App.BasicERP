<?php
//BRAND_COLLECTION_CATEGORY
define('BRAND_COLLECTION_CATEGORY_ROUTE_ALL', "GET /brand_collection_category/@id:[0-9]+");

//define('BRAND_COLLECTION_CATEGORY_ROUTE_SINGLE', "GET /brand_collection_category/@id:[0-9]+");
//define('BRAND_COLLECTION_CATEGORY_ROUTE_CREATE', "POST /brand_collection_category");
//define('BRAND_COLLECTION_CATEGORY_ROUTE_UPDATE', "POST /brand_collection_category/@id:[0-9]+");
//define('BRAND_COLLECTION_CATEGORY_ROUTE_DELETE', "DELETE /brand_collection_category/@id");

Flight::route(BRAND_COLLECTION_CATEGORY_ROUTE_ALL, function($id){
    Flight::setCrossDomainHeaders();
	TNDB::init();//always.
    $subsql = "(SELECT c._id from nms_brand b inner join nms_company c on c._id = b._company_id";
    $subsql = $subsql . " WHERE b._id = %i_brand_id LIMIT 1)";
    $cols = "cat._id";
    $cols = $cols ."," ."cat.description";
    $sql = "SELECT ".$cols." FROM nms_category cat";
    $sql = $sql . " WHERE cat._category_type_id = 5";
    $sql = $sql . "  AND cat._company_id = " . $subsql;
    $rta = DB::query($sql, array(
            "brand_id" => $id
        ));
    Flight::jsoncallback($rta);
});




?>
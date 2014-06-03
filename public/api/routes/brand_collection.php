<?php
//BRAND_COLLECTION
define('BRAND_COLLECTION_ROUTE_ALL', "GET /brand_collection/@brand:[0-9]+/@cat:[0-9]+");

//define('BRAND_COLLECTION_ROUTE_SINGLE', "GET /brand_collection_category/@id:[0-9]+");
//define('BRAND_COLLECTION_ROUTE_CREATE', "POST /brand_collection_category");
//define('BRAND_COLLECTION_ROUTE_UPDATE', "POST /brand_collection_category/@id:[0-9]+");
//define('BRAND_COLLECTION_ROUTE_DELETE', "DELETE /brand_collection_category/@id");

Flight::route(BRAND_COLLECTION_ROUTE_ALL, function($brand,$cat){
    Flight::setCrossDomainHeaders();
    TNDB::init();//always.
    //---------------------
    $cols = "coll._id";
    $cols = $cols ."," ."coll.description";
    $cols = $cols. ","."(CONCAT(cat.path,'/',img.filename)) as filename";

    $sql = "SELECT ".$cols." FROM nms_collection coll";
    $sql = $sql . " INNER JOIN nms_brand br on br._id = coll._brand_id";
    $sql = $sql . " INNER JOIN nms_image img on img._id = coll._image_id";
    $sql = $sql . " INNER JOIN nms_category cat on cat._id = coll._category_id";
    $sql = $sql . " WHERE br._id = %i_brand";
    $sql = $sql . "  AND coll._category_id = %i_cat";

    $rta = DB::query($sql,array(
        "brand" => $brand,
        "cat" => $cat
        ));
    //---------------------
    Flight::jsoncallback($rta);
});




?>
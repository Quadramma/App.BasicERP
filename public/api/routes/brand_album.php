<?php
//BRAND_ALBUM
define('BRAND_ALBUM_ROUTE_ALL', "GET /brand_album/@_brand_id:[0-9]+");

//define('BRAND_ALBUM_ROUTE_SINGLE', "GET /brand_album_category/@id:[0-9]+");
//define('BRAND_ALBUM_ROUTE_CREATE', "POST /brand_album_category");
//define('BRAND_ALBUM_ROUTE_UPDATE', "POST /brand_album_category/@id:[0-9]+");
//define('BRAND_ALBUM_ROUTE_DELETE', "DELETE /brand_album_category/@id");

Flight::route(BRAND_ALBUM_ROUTE_ALL, function($_brand_id){
    Flight::setCrossDomainHeaders();
    TNDB::init();//always.
    //---------------------

    $subsql = "(SELECT c._id from nms_brand b inner join nms_company c on c._id = b._company_id";
    $subsql = $subsql . " WHERE b._id = %i_brand_id LIMIT 1)";

    $cols = "album._id";
    $cols = $cols ."," ."album.description";
    $cols = $cols. ","."(CONCAT(cat.path,'/',img.filename)) as filename";

    $sql = "SELECT ".$cols." FROM nms_album album";
    $sql = $sql . " INNER JOIN nms_company comp on comp._id = album._company_id";
    $sql = $sql . " INNER JOIN nms_image img on img._id = album._image_id";
    $sql = $sql . " INNER JOIN nms_category cat on cat._id = img._category_id";
    $sql = $sql . " WHERE comp._id = " . $subsql;

    $rta = DB::query($sql,array(
        "brand_id" => $_brand_id
        ));
    //---------------------
    Flight::jsoncallback($rta);
});




?>
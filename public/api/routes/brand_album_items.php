<?php
//BRAND_ALBUM_ITEMS
define('BRAND_ALBUM_ITEMS_ROUTE_ALL', "GET /brand_album_item/@_album_id:[0-9]+");

//define('BRAND_ALBUM_ITEMS_ROUTE_SINGLE', "GET /brand_album_item_category/@id:[0-9]+");
//define('BRAND_ALBUM_ITEMS_ROUTE_CREATE', "POST /brand_album_item_category");
//define('BRAND_ALBUM_ITEMS_ROUTE_UPDATE', "POST /brand_album_item_category/@id:[0-9]+");
//define('BRAND_ALBUM_ITEMS_ROUTE_DELETE', "DELETE /brand_album_item_category/@id");

Flight::route(BRAND_ALBUM_ITEMS_ROUTE_ALL, function($_album_id){
    Flight::setCrossDomainHeaders();
    TNDB::init();//always.
    //---------------------

    $cols = "albumItem._id";
    $cols = $cols ."," ."albumItem.description";
    $cols = $cols. ","."(CONCAT(cat.path,'/',img.filename)) as filename";

    $sql = "SELECT ".$cols." FROM nms_album_item albumItem";
    $sql = $sql . " INNER JOIN nms_album album on album._id = albumItem._album_id";
    $sql = $sql . " INNER JOIN nms_image img on img._id = albumItem._image_id";
    $sql = $sql . " INNER JOIN nms_category cat on cat._id = img._category_id";
    $sql = $sql . " WHERE album._id = %i_album_id";

    $rta = DB::query($sql,array(
        "album_id" => $_album_id
        ));
    //---------------------
    Flight::jsoncallback($rta);
});




?>
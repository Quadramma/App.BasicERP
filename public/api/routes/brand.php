<?php
//BRAND
define('BRAND_ROUTE_ALL', "GET /brand");
define('BRAND_ROUTE_SINGLE', "GET /brand/@id:[0-9]+");
define('BRAND_ROUTE_CREATE', "POST /brand");
define('BRAND_ROUTE_UPDATE', "POST /brand/@id:[0-9]+");
define('BRAND_ROUTE_DELETE', "DELETE /brand/@id");

Flight::route(BRAND_ROUTE_ALL, function(){
    Flight::setCrossDomainHeaders();
	TNDB::init();//always.

    $cols = "b._id";
    $cols = $cols. ","."b.description";
    $cols = $cols. ","."(CONCAT(cat.path,'/',img.filename)) as filename";
    
    $sql = "SELECT ".$cols." FROM nms_brand b";
    $sql = $sql . " INNER JOIN nms_image img on img._id = b._image_id";
    $sql = $sql . " INNER JOIN nms_category cat on cat._id = img._category_id";
    $sql = $sql . " INNER JOIN nms_company comp on comp._id = b._company_id";
    //$sql = $sql . " WHERE comp._group_id = 3";
    $rta = DB::query($sql);

    Flight::jsoncallback($rta);
});

Flight::route('/la', function(){
    header("Access-Control-Allow-Origin: *");
    echo "Vimoda API OK LOL OLO LO LO !!!";
});

?>
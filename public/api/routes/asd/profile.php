<?
Flight::route('/profiles', function(){
	TNDB::init();//always.
    $collection = TNDB::$ctx->select('tn_profile', "*");
    Flight::callback(json_encode($collection));
});

Flight::route('/profile/@id:[0-9]+', function($id){
    TNDB::init();//always.
    $collection = TNDB::$ctx->select('tn_perfil', "*",["_id"=>$id]);
    Flight::callback(json_encode($collection));
});

Flight::route('/profile/description/like/@descr', function($descr){
    TNDB::init();//always.
    $collection = TNDB::$ctx->select('tn_perfil', "*",
    	[
    	"LIKE"=>[
    		"description"=>$descr
    		]
    	]);
    Flight::callback(json_encode($collection));
});
?>
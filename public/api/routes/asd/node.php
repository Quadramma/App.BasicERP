<?php

Flight::route('/nodes', function(){
	TNDB::init();//always.
    $collection = TNDB::$ctx->select('tn_node', "*");
    
    for ($i=0; $i < count($collection); $i++) { 
    	$path = 'views/'.$collection[$i]["name"]."_view.php";
    	$view = file_get_contents($path, FILE_USE_INCLUDE_PATH);
		$collection[$i]["view"] =  $view;
    }

   	Flight::callback(json_encode($collection));
});

Flight::route('/node/@id:[0-9]+', function($id){
    TNDB::init();//always.
    $collection = TNDB::$ctx->select('tn_node', "*",["_id"=>$id]);
    Flight::callback(json_encode($collection));
});


Flight::map("TN_Node_Add",function($description){
  	TNDB::init();//always.
    $collection = TNDB::$ctx->select('tn_node', "*");
    Flight::callback(json_encode($collection));
});

?>
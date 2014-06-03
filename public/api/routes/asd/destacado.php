<?php

//GROUPS

Flight::map('getDestacados', function(){
	$my_file = "destacados.json";
    $collection = array();
    if (file_exists($my_file)) {
    	$collection =  json_decode(file_get_contents($my_file));
	}else{
		$handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file);
		fclose($handle);
	}
    return $collection;
});

Flight::route('GET /destacado', function(){
    Flight::callback(json_encode(Flight::getDestacados()));
});



Flight::route('POST /destacado', function(){
	$my_file = "destacados.json";
	TNDB::init();//always.
	$_id1 			= Flight::request()->data["productoDestacado1ID"];
	$_id2 			= Flight::request()->data["productoDestacado2ID"];
	$_id3 			= Flight::request()->data["productoDestacado3ID"];
	if(!isset($_id1) || !isset($_id2) || !isset($_id3)){
		echo "INVALID POST: ISSET productoDestacado1ID";
		exit;
	}
	$collection =  array();
	if (file_exists($my_file)) {
    	$collection =  json_decode(file_get_contents($my_file),TRUE);
	}else{
		$handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file);
		fclose($handle);
	}
	if(!isset($collection)){
		$collection = array("productoDestacado1ID"=>"","productoDestacado2ID"=>"","productoDestacado3ID"=>"");
	}
	$collection["productoDestacado1ID"] = $_id1;
	$collection["productoDestacado2ID"] = $_id2;
	$collection["productoDestacado3ID"] = $_id3;
	//
	file_put_contents($my_file, json_encode($collection));
	//
	Flight::callback(json_encode($collection));
});


?>
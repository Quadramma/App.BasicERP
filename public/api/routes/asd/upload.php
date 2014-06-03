<?php



Flight::route('POST /upload/products', function(){
  Flight::setCrossDomainHeaders();
  saveFileAndWriteResponse("uploads/products/","file"); 
});
Flight::route('POST /upload/products_slides', function(){
  Flight::setCrossDomainHeaders();
  saveFileAndWriteResponse("uploads/products_slides/","file"); 
});
Flight::route('POST /upload/projects', function(){
  Flight::setCrossDomainHeaders();
  saveFileAndWriteResponse("uploads/projects/","file"); 
});
Flight::route('POST /upload/projects_slides', function(){
  Flight::setCrossDomainHeaders();
  saveFileAndWriteResponse("uploads/projects_slides/","file"); 
});


function saveFileAndWriteResponse($path,$inputName){
	$fileName = $_FILES["file"]["name"];
	$saveResponse = saveFileToPath($path,$inputName);
	$ok = true;
	if($saveResponse["error"]!=""){
		$ok = false;
	}
	Flight::jsoncallback(array(
		  "ok"=> $ok,
	  "fileName"=> $fileName,
	  "saveResponse"=> $saveResponse
	));
}

function saveFileToPath($path,$inputName){
	$url = "";
	$fullurl ="";
	$error = "";
	$allowedExts = array("gif", "jpeg", "jpg", "png");
	$temp = explode(".", $_FILES[$inputName]["name"]);
	//$temp = explode(".", $fileName);
	$extension = end($temp);

	if($_FILES[$inputName]["size"] > 1000000){
		$error =  "Archivo invalido. Admite 1mb maximo. ";
	}else{
		//
		if ((($_FILES[$inputName]["type"] == "image/gif")
		|| ($_FILES[$inputName]["type"] == "image/jpeg")
		|| ($_FILES[$inputName]["type"] == "image/jpg")
		|| ($_FILES[$inputName]["type"] == "image/pjpeg")
		|| ($_FILES[$inputName]["type"] == "image/x-png")
		|| ($_FILES[$inputName]["type"] == "image/png"))
		&& ($_FILES[$inputName]["size"] < 1000000) //1mb
		&& in_array($extension, $allowedExts)) {
		if ($_FILES[$inputName]["error"] > 0) {
		  $error = $_FILES[$inputName]["error"];
		} else {
		 // if (file_exists($path . $_FILES[$inputName]["name"])) {
		  //  $url =  $_FILES[$inputName]["name"];
		  //  $fullurl = $path . $_FILES[$inputName]["name"];
		 // } else {
		    move_uploaded_file($_FILES[$inputName]["tmp_name"],
		    $path . $_FILES[$inputName]["name"]);
		    $url =  $_FILES[$inputName]["name"];
		    $fullurl = $path . $_FILES[$inputName]["name"];
		//  }
		}
		} else {
			$error =  "Archivo invalido. Admite solo gif, jpeg, jpg, png. 1mb maximo. ";
		}
	}
	return array("url"=>$url,"error"=>$error,"fullurl"=>$fullurl);
}




?>
<?php

function GetFiles($path){
  $rta = array();
  if ($handle = opendir($path)) {
    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != "..") {
            if (strpos($entry,'.') !== false) {
                $rta [] = $entry;
            }else{
                
            }
        }
    }
    closedir($handle);
  }
  return $rta;
}
Flight::map('getJsonAsArray', function($filename){
  $my_file = $filename;
    $collection = array();
    if (file_exists($my_file)) {
      $collection =  json_decode(file_get_contents($my_file));
  }else{
    $handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file);
    fclose($handle);
  }
    return $collection;
});

Flight::route('POST /file/saveHomeText', function(){
    Flight::setCrossDomainHeaders();
    $data = FlightHelper::getData();//data
    $my_file = "home_text.json";
    //
    $collection =  array(
      "slide1"=> array(
          "title" => $data["slide1Title"],
          "text" => $data["slide1Text"],
        ),
      "slide2"=> array(
          "title" => $data["slide2Title"],
          "text" => $data["slide2Text"],
        ),
      "slide3"=> array(
          "title" => $data["slide3Title"],
          "text" => $data["slide3Text"],
        )
      );
    file_put_contents($my_file, json_encode($collection));
    //
});

Flight::route('POST /file/saveDestacados', function(){
    Flight::setCrossDomainHeaders();
    $data = FlightHelper::getData();//data
    $my_file = "destacados.json";
    //
    $collection =  array(
      "destacado1"=>$data["destacado1"],
      "destacado2"=>$data["destacado2"],
      "destacado3"=>$data["destacado3"],
      );
    file_put_contents($my_file, json_encode($collection));
    //
});

Flight::route('POST /file/saveHomeSlides', function(){
    Flight::setCrossDomainHeaders();
    $data = FlightHelper::getData();//data
    $my_file = "home_slides.json";
    //
    $collection =  array(
      "slide1"=>$data["slide1"],
      "slide2"=>$data["slide2"],
      "slide3"=>$data["slide3"],
      );
    file_put_contents($my_file, json_encode($collection));
    //
});

Flight::route('GET /file/getDestacados', function(){
  Flight::setCrossDomainHeaders();
  Flight::jsoncallback(array(
      "files"=> Flight::getJsonAsArray("destacados.json")
    ));
});
Flight::route('GET /file/getHomeSlides', function(){
  Flight::setCrossDomainHeaders();
  Flight::jsoncallback(array(
      "files"=> Flight::getJsonAsArray("home_slides.json")
    ));
});
Flight::route('GET /file/getHomeText', function(){
  Flight::setCrossDomainHeaders();
  Flight::jsoncallback(array(
      "files"=> Flight::getJsonAsArray("home_text.json")
    ));
});



Flight::route('GET /file/getAvailableHomeSlides', function(){
  Flight::setCrossDomainHeaders();
  $array = GetFiles("uploads/home_slides");
  Flight::jsoncallback(array(
      "files"=> $array
    ));
});

Flight::route('GET /file/getAvailableProductPictures', function(){
  Flight::setCrossDomainHeaders();  
  $array = GetFiles("uploads/products");
  Flight::jsoncallback(array(
      "files"=> $array
    ));
});
Flight::route('GET /file/getAvailableProductSlides', function(){
  Flight::setCrossDomainHeaders();
  $array = GetFiles("uploads/products_slides");
  Flight::jsoncallback(array(
      "files"=> $array
    ));
});
Flight::route('GET /file/getAvailableProjectPictures', function(){
  Flight::setCrossDomainHeaders();
  $array = GetFiles("uploads/projects");
  Flight::jsoncallback(array(
      "files"=> $array
    ));
});
Flight::route('GET /file/getAvailableProjectSlides', function(){
  Flight::setCrossDomainHeaders();
  $array = GetFiles("uploads/projects_slides");
  Flight::jsoncallback(array(
      "files"=> $array
    ));
});


Flight::route('POST /file', function(){
	//----------------------------
	$data = FlightHelper::getData();//data
	//PATH
	$path = "uploads/";
	//SINGLE FILE
	if($_FILES["file"]["name"] != ""){
         $fileRta    = QM_FS::upload($path,"file");
        $fileUrl = $fileRta["url"];
    }  
    //MULTIPLE FILES
    $filesCount = count($_FILES["files"]['name']);
    $filesUrls ="";
    if($filesCount > 0){
        $filesRta = QM_FS::uploadFiles($path,"files","$$"); //debug exit
        if(!$filesRta["ok"]){
        }
        $filesUrls = $filesRta["urls"];
    }
    //
	Flight::jsoncallback(array(
		"fileUrl"=> $fileUrl, 
		"fileRta"=> $fileRta, 
		"filesUrl"=> $filesUrl, 
		"filesRta"=> $filesRta 
	));
	//----------------------------
});





class QM_FS{
  public static function getFileNames($dir){
    $array = array();
    if(is_dir($dir))
    {
      if($handle = opendir($dir))
      {
        while(($file = readdir($handle)) !== false)
        {
          if($file != "." && $file != ".." && $file != "Thumbs.db"/*pesky windows, images..*/)
          {
              array_push($array,$file);
          }
        }
        closedir($handle);
      }
    }
    //return str_replace(chr(34),chr(92).chr(34),json_encode($array));
    return $array;
  }
   public static function upload($path,$inputName){
  $url = "";
  $fullurl ="";
  $error = "";
  $allowedExts = array("gif", "jpeg", "jpg", "png");
  $temp = explode(".", $_FILES[$inputName]["name"]);
  //$temp = explode(".", $fileName);
  $extension = end($temp);
  //
  if ((($_FILES[$inputName]["type"] == "image/gif")
  || ($_FILES[$inputName]["type"] == "image/jpeg")
  || ($_FILES[$inputName]["type"] == "image/jpg")
  || ($_FILES[$inputName]["type"] == "image/pjpeg")
  || ($_FILES[$inputName]["type"] == "image/x-png")
  || ($_FILES[$inputName]["type"] == "image/png"))
  && ($_FILES[$inputName]["size"] < 10000000) //10mb
  && in_array($extension, $allowedExts)) {
    if ($_FILES[$inputName]["error"] > 0) {
      //echo "Return Code: " . $_FILES[$inputName]["error"] . "<br>";
      $error = $_FILES[$inputName]["error"];
    } else {
     // echo "Upload: " . $_FILES[$inputName]["name"] . "<br>";
      //echo "Type: " . $_FILES[$inputName]["type"] . "<br>";
      //echo "Size: " . ($_FILES[$inputName]["size"] / 1024) . " kB<br>";
      //echo "Temp file: " . $_FILES[$inputName]["tmp_name"] . "<br>";
      if (file_exists($path . $_FILES[$inputName]["name"])) {
        //echo $_FILES[$inputName]["name"] . " already exists. ";
        $url =  $_FILES[$inputName]["name"];
        $fullurl = $path . $_FILES[$inputName]["name"];
      } else {
        move_uploaded_file($_FILES[$inputName]["tmp_name"],
        $path . $_FILES[$inputName]["name"]);
        //echo "Stored in: " . $path . $_FILES[$inputName]["name"];
        $url =  $_FILES[$inputName]["name"];
        $fullurl = $path . $_FILES[$inputName]["name"];
      }
    }
  } else {
    $error =  "Archivo invalido. Admite solo gif, jpeg, jpg, png. 10mb maximo. ";
  }
  return array("url"=>$url,"error"=>$error,"fullurl"=>$fullurl);
}


public static function uploadSingle($path,$fileName,$type,$size,$tmp_name,$error){
  $url = "";
  $fullurl ="";
  $error = "";
  $allowedExts = array("gif", "jpeg", "jpg", "png");
  $temp = explode(".", $fileName);
  $extension = end($temp);
  if ((($type == "image/gif")
  || ($type == "image/jpeg")
  || ($type == "image/jpg")
  || ($type == "image/pjpeg")
  || ($type == "image/x-png")
  || ($type == "image/png"))
  && ($size < 10000000) //10mb
  && in_array($extension, $allowedExts)) {
    if ($error <= 0) {
      if (file_exists($path . $fileName)) {
        $url =  $fileName;
        $fullurl = $path . $fileName;
      } else {
        move_uploaded_file($tmp_name,
        $path . $fileName);
        $url =  $fileName;
        $fullurl = $path . $fileName;
      }
    }
  } else {
    $error =  "Archivo invalido. Admite solo gif, jpeg, jpg, png. 10mb maximo. ";
  }
  return array("url"=>$url,"error"=>$error,"fullurl"=>$fullurl);
}

public static function uploadFiles($uploadPath,$inputName,$comodin){
  $errors = "";
  $trace = [];
  $ok = true;
  $urls = "";
  $count = count($_FILES[$inputName]['name']);
  for ($i = 0; $i < $count; $i++) {
      $currentUrl = "";
      $currentMessage = "";
      $fname = $_FILES[$inputName]['name'][$i];
      $uploadArr = QM_FS::uploadSingle($uploadPath
          ,$fname
          ,$_FILES[$inputName]['type'][$i]
          ,$_FILES[$inputName]['size'][$i]
          ,$_FILES[$inputName]['tmp_name'][$i]
          ,$_FILES[$inputName]['error'][$i]
          );
      if($uploadArr["error"] != ""){
          $currentMessage = $uploadArr["error"];
      }else{
          if($uploadArr["url"] == ""){
              $currentMessage = "Upload fail. Contacte administrador";
          }else{
              $imgSavePath = $uploadArr["fullurl"];
              $currentUrl = $uploadArr["url"];
              $trace[] = $currentUrl;
          }    
      }
      if($currentMessage != ""){
          $errors = $errors . " | " . $fname . ": " . $currentMessage;
          $ok = false;
      }
      if($urls == ""){
        $urls = $currentUrl;
      }else{
        $urls = $urls . $comodin . $currentUrl;
      }
  }
  if($count == 0){
    $errors = "Imagenes requeridas";
    $ok = false;
  }
  $rta = array(
          "ok"=> $ok,
          "urls"=> $urls,
          "errors"=>$errors,
          "length" => $count,
          "inputName" => $inputName,
          "trace" => $trace
      );
  return $rta;
  //echo $rta;
  //exit; //debug
}


}

?>
<?php
    if(!isset($_GET["json"])) {
        echo "No data supplied";
    } else {
        if (isJSON($_GET["json"])) {
            $ret = file_put_contents("hellbulletleaderboard.json", $_GET["json"]);
            if($ret === FALSE) {
                echo "Something went wrong writing the file";
            } else {
                echo "Success!";
            }
        } else {
            echo "Not valid JSON";
        }
    }

    function isJSON($string){
        return is_string($string) && is_object(json_decode($string)) && (json_last_error() == JSON_ERROR_NONE) ? true : false;
    }
?>
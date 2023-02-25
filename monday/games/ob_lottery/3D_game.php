<?php


/* You should enable error reporting for mysqli before attempting to make a connection */
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$mysqli = new mysqli('localhost', 'munir', 'test_db_password_munir', 'test');

/* Set the desired charset after establishing a connection */
$mysqli->set_charset('utf8mb4');

printf("Success... %s\n", $mysqli->host_info);

if($_GET['royal'] == null){


    print_r(json_encode(['response'=> 'Please place a bet.']));

    return;

}

 $queryFlag = $_GET['royal'];

$random_number = strval(rand());

$random_number_length = strlen($random_number);

if($random_number_length < 10){
    $random_number = $random_number + strval(rand());
}




if($queryFlag == '5'){
    
    $random_number = substr($random_number,0,5);

}elseif($queryFlag == '3' || $queryFlag == 'f3'){

    $random_number = substr($random_number,0,3);

}elseif($queryFlag == "d"){

    $splitted_number = str_split($random_number);
    $random_number = ["$splitted_number[0]$splitted_number[1],$splitted_number[2]$splitted_number[3],$splitted_number[4],$splitted_number[5],$splitted_number[6]$splitted_number[7],$splitted_number[8]$splitted_number[9]"];
}


print_r(json_encode(['response'=>$random_number]));

?>
<?php
    header("Access-Control-Allow-Origin:*");
    include('../config.php');
    $username = $_POST['username'];
    $password = $_POST['password'];

    //判断数据库中是否已存在注册信息

    
    $sql = "insert into user (username,password) values ('$username','$password')";

    $res = mysql_query($sql);

    if($res){
        echo json_encode(array(
            'res_code' => 1,
            'res_message' => '注册成功'
        ));
    }else{
        echo json_encode(array(
            'res_code' => 0,
            'res_message' => '注册失败'
        ));
    }

?>
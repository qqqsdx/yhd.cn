<?php
    // 注册的业务逻辑

    // 1. 连接数据库
    include('./conn.php');

    // 2. 接收数据
    $username = $_POST['username'];
    $password = $_POST['password'];
    $phone = $_POST['phone'];
    // $username = '受打击撒大';
    // $password = 'a123456';
    // $phone = '18705868189';



    // 3. 查询用户名数据库中是否存在
    $sql = "select * from dl where username='$username' or iPhone='$phone'";
    // 执行sql语句
    $result = $mysqli->query($sql);
    if($result->num_rows>0){ // 判断结果中数据大于0行
        // 说明查询到了这个用户名
        echo 0;
        $mysqli->close();
        die;
    }
    


    // 将用户传递过来的数据 写入数据库
    $insertUser = "insert into dl(username,userpass,iPhone)values('$username','$password','$phone')";
    // echo $insertUser;

    $res = $mysqli->query($insertUser);
    $mysqli->close();
    if($res){
        echo 1;
    }
    
?>
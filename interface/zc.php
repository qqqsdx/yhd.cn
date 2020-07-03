<?php
    // 注册的业务逻辑

    // 1. 连接数据库
    include('./conn.php');

    // 2. 接收数据
    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];
    $phone = $_REQUEST['phone'];



    // 3. 查询用户名数据库中是否存在
    $sql = "select * from dl where username='$username'";

    // 执行sql语句
    $result = $mysqli->query($sql);
    print($sql);
    if($result->num_rows>0){ // 判断结果中数据大于0行
        // 说明查询到了这个用户名
        echo '<script>alert("用户名已存在");</script>';
        echo '<script>location.href="../html/registry.html";</script>';
        $mysqli->close();
        die;
    }

    // 将用户传递过来的数据 写入数据库
    $insertUser = "insert into dl(username,userpass,iPhone)values('$username','$password','$phone')";
    // echo $insertUser;

    $res = $mysqli->query($insertUser);

    $mysqli->close();
    
    if($res){
        echo '<script>alert("注册成功");</script>';
        echo '<script>location.href="../html/index.html";</script>';
    }
    
?>
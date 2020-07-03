<?php
    include('./conn.php');
    // 一、接收前端的数据
    $name = $_POST['username'];
    $pass = $_POST['userpass'];
    // $name = 18888888888;
    // $pass = 123456;
    
    $sql = "select * from dl where iPhone='{$name}' or username='{$name}' and userpass='{$pass}'";
    $res = $mysqli->query($sql);
    if($res->num_rows>0){
        // echo '<script>alert("登录成功");</script>';
        // echo '<script>location.href="../html/index.html";</script>';
        echo 1;
    }else{
        // echo '<script>alert("用户名或密码不正确.");</script>';
        // echo '<script>location.href="../html/login.html";</script>';
        echo 0;
    }
    $mysqli->close();
?>
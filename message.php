<?php
    date_default_timezone_set('Asia/Taipei');
    $errors         = array();      // array to hold validation errors
    $data           = array();

    if(!empty($_POST['name']) &&  !empty($_POST['comment'])){
//        echo "連線成功<br>";

        $conn = mysqli_connect("mysql.hostinger.co.uk","u127616580_groe","25571174","u127616580_thril");
        if(mysqli_connect_errno($conn)){
    //        die("連不上去耶...");
            $data['success'] = false;
            $data['message'] = '資料庫連線失敗';
        }else{
            mysqli_set_charset($conn,"utf8");
            $now = date("Y-m-d H:i:s");
            $sql = "INSERT thrill_message (`作品`,`姓名`, `留言`, `時間`) VALUES ('{$_POST['story']}','{$_POST['name']}','{$_POST['comment']}', '{$now}')";
            mysqli_query($conn,$sql);
            if(mysqli_affected_rows($conn)>0){
      //          echo"新增成功";
                $data['success'] = true;
                $data['message'] = '留言成功!';
            }
            else{
                $data['success'] = false;
                $data['message'] = '留言失敗？';
            }
        }
    }else{
//        缺少name或comment
        $data['success'] = false;
        $data['message'] = '資料缺漏';
    }
    $data['errors']  = $errors;
    echo json_encode($data);
?>

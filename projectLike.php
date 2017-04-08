<?php
header('Content-Type: text/html; charset=utf-8');

$link=@mysql_connect('localhost','root','') or mysql_connect('localhost','root','admin');
mysql_query("set names 'utf8'");
mysql_query('CREATE database zns_wish');
mysql_select_db('project_like');



var_dump($link);


//return json_encode(['code'=>0,'msg'=>'']);
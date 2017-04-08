const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
	host : 'localhost',
	port:'3306',
	user:'root',
	password:'',
	database:'blog'
})

let app = express();
app.listen(8787);

app.use(express.static('public'));,
app.get('/artical/list',(req,res) => {})
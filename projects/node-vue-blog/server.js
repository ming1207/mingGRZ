const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'blog'
})

const app = express();
app.listen(8787);
app.use(express.static('public'));

const pageSize = 10;

app.get('/article/list',(req,res) => {

	if( !req.query.page ){
		res.send({
			errCode:10000,
			msg:'参数错误'
		})
		res.end();
	}

	db.query(`SELECT * FROM article_data WHERE id<${
		(req.query.page+1)*pageSize
	} AND id>=${
		req.query.page*pageSize
	}`,(err,data) => {
		if( err ){
			console.log(err);
			res.send({
				errCode:10001,
				msg:'Database Error'
			})
		} else if( data && data.length ){
			res.send({
				errCode:0,
				msg:'',
				data
			})
		}

		res.end();
	})
})

app.get('/user/login',(req,res) => {
	const {
		username,
		password
	} = req.query;

	db.query(`SELECT * FROM user_data WHERE username="${username}"`,(err,data) => {
		if( err ){
			console.log(err);
			res.send({
				errCode:10001,
				msg:'Database Error'
			})
		} else if( data && data.length ){
			if( data[0].password == password ){
				res.send({
					errCode:0,
					msg:''
				})
			} else {
				res.send({
					errCode:101,
					msg:'密码错误'
				})
			}
		} else {
			res.send({
				errCode:102,
				msg:'用户不存在'
			})
		}

		res.end();
	})
})

app.get('/user/getCaptcha',(req,res) => {
	const captcha = rndCaptcha();
	const captchaId = rndCaptchaId();
	console.log(captcha);
		db.query(`INSERT INTO captcha VALUES("${
		captchaId}","${captcha}")`,(err,data) => {
		if( err ){
			console.log(err);
			res.send({
				errCode:10001,
				msg:'Database Error'
			})
		} else {
			res.send({
				errCode:0,
				msg:'',
				data:{
					captchaId:captchaId
				}
			})
			console.log('captcha',captcha)
			res.end();
		}
	})
})


function rndCaptcha(){
	return getRnd(4,true)
}

function rndCaptchaId(){
	return getRnd(8)
}

function getRnd(length,isNumber){
	let number = [1,2,3,4,5,6,7,8,9,0];
	let arr = [1,2,3,4,5,6,7,8,9,0,'a','d','f','g','h','j','k','l','e','q','w','i','o','p','q'];

	return (
		(isNumber ? number : arr ).sort(
			() => Math.random()-0.5
		).join('').substring(0,length)	
	)
}

app.get('/user/register',(req,res) => {
	const {
		username,
		password,
		captcha,
		 captchaId
	} = req.query;

	db.query(`SELECT * FROM user_data WHERE username="${username}"`,(err,data) => {
		if( err ){
			console.log(err);
			res.send({
				errCode:10001,
				msg:'Database Error'
			})
			res.end();
		} else if( data && data.length ){
			res.send({
				errCode:104,
				msg:'用户已存在'
			})
			res.end();
		} else {

			// 验证验证码
			db.query(`SELECT * FROM captcha WHERE id="${captcha}"`,(err,data) => {
				if( err ){
					console.log(err);
					res.send({
						errCode:100012,
						msg:'Database Error'
					})
				} else if( data && data.length ) {
					// db.query(`DELETE FROM captcha WHERE id="${captchaId}"`,err => {
					// 	if( err ){
					// 		console.log(err);
					// 	}
					// })

					if( captchaId == data[0].captcha ){
						// 执行注册逻辑
						db.query(`INSERT INTO user_data VALUES(1,"${
							username
						}","${
							password
						}")`,(err,data) => {
							if( err ){
								console.log(err);
								res.send({
									errCode:100013,
									msg:'Database Error'
								})
							} else {
								res.send({
									errCode:0,
									msg:''
								})
							}

							res.end();
						})

					} else {
						res.send({
							errCode:103,
							msg:'验证码有误'
						})
						res.end();
					}
				} else {
					res.send({
						errCode:105,
						msg:'验证码ID有误'
					})
					res.end();
				}
			})
		}
	})
})

app.get('/article/detail',(req,res) => {
	const { id	} = req.query;
	db.query(`SELECT * FROM article_data WHERE id="${id}"`,(err,data) => {
		if( err ){
			console.log(err);
			res.send({
				errCode:10001,
				msg:'Database Error'
			})
		} else if( data && data.length ){
			// if( !data[0].comments ) data[0].comments=[];
			data[0].comments = JSON.parse(data[0].comments).comments;

			res.send({
			 	errCode:0,
			 	msg:'',
			 	data
			 })
			res.end();
		} else {
			res.send({
			 	errCode:1,
			 	msg:'文章不存在'
			})
			res.end();
		}
	})
})


app.get('/article/comment',(req,res) => {
	const {
		username,
		content,
		id
	} = req.query;

	db.query(`SELECT comments FROM article_data WHERE id=${id}`,(err,data) => {
		if( err ){
			console.log(err);
			res.send({
				errCode:10001,
				msg:'Database Error'
			})
			res.end();
		} else if( data && data.length ){
			let comments = JSON.parse(data[0].comments).comments || [];

			comments.push({
				username,
				content
			})

			let commentStr = JSON.stringify({
				comments:comments
			})

			commentStr = commentStr.replace(/\"/img,'\\"');

			db.query(`UPDATE article_data SET comments="${commentStr}" WHERE id=${id}`,(err,data) => {
				if( err ){

					console.log(err);
					res.send({
						errCode:10001,
						msg:'Database Error'
					})
					res.end();

				} else {

					res.send({
						errCode:0,
						msg:''
					})
					res.end();

				}
			})
		}
	})
})
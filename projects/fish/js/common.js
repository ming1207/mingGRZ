function loadStatics(resource,callback){
	let count = 0;

	resource.forEach(static => {
		let oImage = new Image();
		oImage.src = `statics/img/${static}.png`;

		oImage.onload = function(){
			count++;

			statics[static] = oImage;

			if( count == resource.length ){
				callback && callback();
			}
		}
	})
}

// 弧度转角度
function r2d(r){
	return r/Math.PI*180
}

// 角度转弧度
function d2r(d){
	return d/180*Math.PI
}

// 随机值
function rnd(n,m){
	return parseInt(Math.random()*(m-n)+n);
}
// 随机正负
function rndSign(){
	return Math.random() > 0.5 ? -1 : 1;
}
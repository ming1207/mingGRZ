function _(selector){
	var result = document.querySelectorAll(selector);

	if( result.length == 1 ){
		return result[0]
	}

	return result;
}

function rnd(n,m,exception){
	var result = parseInt(Math.random()*(m-n)+n);

	if( result == exception ){
		return rnd(n,m,exception);
	}

	return result;
}
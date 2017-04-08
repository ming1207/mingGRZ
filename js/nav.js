/*	var oUl=document.getElementById('list');
	var aLi=oUl.children;
	var oBox=aLi[aLi.length-1];
	//加事件
	for (var i = 0; i < aLi.length-1; i++) {
		aLi[i].onmouseover=function(){
			console.log(oBox);
			console.log(this.offsetLeft);
			clearInterval(timer_nav);
			elastic(oBox,this.offsetLeft);  
    };
	};
	

	
	var left=0;
	var iSpeed=1;//定义一个速度
	var timer_nav=null;
	function elastic(obj,iTarget){
		timer_nav=setInterval(function(){
			iSpeed+=(iTarget-left)/20;
			iSpeed*=0.9;
			
			left+=iSpeed;
			obj.style.left=left+'px';
			if(Math.round(iSpeed)==0 && Math.round(left)==iTarget){
				clearInterval(timer_nav);
			}
		},30);
	}	*/
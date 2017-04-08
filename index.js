var currentIndex = 0;

contentHeight();

//兼容chrom and 火狐
if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
    addEvent(document, "DOMMouseScroll", mouseScroll);
} else {
    addEvent(document, "mousewheel", mouseScroll);
}


//选项卡
$('.R_nav ul li').on('click', function() {

    currentIndex = $(this).index();//获取点击的页面索引值

    movePage();

});




$(window).resize(function() { //aa????????????
    contentHeight();
});

/**
    $(document).height()  //是获取整个页面的高度
$(window).height()  //是获取当前 
也就是你浏览器所能看到的页面的那部分的高度  这个大小在你缩放浏览器窗口大小时 会改变 与document是不一样的  根据英文应该也能理解吧
    **/

function contentHeight() {

    var screenH = $(window).height();


    $(".content,.container").css("height", screenH);


}
/**
    给page设置margintop  达到页面切换的目的
*/
function setMarginTop() {

    var height = $(".content").height();


    var moveY = height * currentIndex;


    $(".allPage").css("marginTop", -moveY);

}


/** 
    根据给定的索引 切换页面 并处理相关的逻辑  如按钮背景色 回到顶部 cavan画图等
*/
function movePage() {

    setMarginTop();

    //显示回到顶部 并绑定事件
    if (currentIndex > 0) {

        $('.return111').css('display', 'block');

        $('.return111').bind('click', function() {

            currentIndex = 0;

            movePage();

        })

    } else {

        $('.return111').css('display', 'none');

    }

    //是否显示 【底部下一页】
    if (currentIndex > 3) {

        $('.footer').css('display', 'none')

    } else {

        $('.footer').css('display', 'block')

    }

    //技能画图
   

    setActive();


}

function setActive() {
    $('.R_nav ul li').removeClass('active');
    $('.R_nav ul li').eq(currentIndex).addClass('active');

     if(currentIndex ==0){
        $('.page1 p').addClass('animated fadeInUpBig');
    }else{
         $('.page1 p').removeClass('animated fadeInBig');
    }

   

    if(currentIndex ==2){
        myskill('red', 7, 1, 'html');

        myskill('green', 6, 2, 'css');

        myskill('yellow', 4.5, 3, 'js');

        myskill('blue', 4.5, 4, 'node');
        $('.page3 p').addClass('animated pulse');


    }else{
        $('.page3 p').removeClass('animated pulse');
    }
}
/**
    技能画图
*/
function myskill(color, size, index, text) {

    var oC = document.querySelectorAll('canvas');
    if (index == 1) {
        oC = oC[0];
    } else if (index == 2) {
        oC = oC[1];
    } else if (index == 3) {
        oC = oC[2];
    } else if (index == 4) {
        oC = oC[3];
    }
    var ctx = oC.getContext('2d');
    var angle = 0;

   let timer=setInterval(() => {

        ctx.clearRect(0, 0, oC.width, oC.height); //aa  ctx.clearRect(0,0,200,200);??
        ctx.beginPath(); //aa新开一个路径   多次描绘，会出现锯齿的情况?????????

        ctx.arc(100, 100, 70, 0, angle); //aa可画弧  圆心 半径 起始的角度 和结束的角度（弧度值）
        ctx.stroke();
        ctx.strokeStyle = color;
        ctx.lineWidth = 10;

        ctx.lineCap = 'round';
        if (angle < size) {
            angle += 0.08;

        }else{
            clearInterval(timer);
        }

    }, 22)

}

//鼠标滚轮事件封装
function addEvent(obj, sEv, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(sEv, fn, false);
    } else {
        obj.attachEvent('on' + sEv, fn);
    }
}


var i = 0;

/**
 * 负责计算鼠标滚动的时候的页面索引值和上下滚
 * @param  {[type]}
 * @return {[type]}
 */
function mouseScroll(e) {
    i++;
    setTimeout(function() {

        if (i > 0) {

            if (e.wheelDelta) {
                if (e.wheelDelta > 0) {

                    if (currentIndex > 0) {
                        currentIndex -= 1;
                        movePage();
                    }
                    

                }
                if (e.wheelDelta < 0) {

                    if (currentIndex < 4) {
                        currentIndex += 1;
                        movePage();
                    }

                }
            } else if (e.detail) {
                if (e.detail < 0) {
                    if (currentIndex < 4) {
                        currentIndex += 1;
                        movePage();
                    }
                }
                if (e.detail > 0) {
                    if (currentIndex > 0) {
                        currentIndex -= 1;
                        movePage();
                    }
                }
            }

            i = 0;

        }

    }, 200)

}

// function dong(){

//     $('.page1').on('mouseover',function(){
//     $('.page1 p').addClass('animated pulse')

// })
// $('.page1').on('mouseout',function(){
//     $('.page1 p').removeClass('animated pulse')

// })


// }
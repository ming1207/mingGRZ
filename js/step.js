var currentIndex = 0;
contentHeight();
//兼容chrom and 火狐
if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
    addEvent(document, "DOMMouseScroll", mouseScroll);
} else {
    addEvent(document, "mousewheel", mouseScroll);
}

//选项卡
$('.R_nav ul li,.index-circle li').on('click', function() {
    currentIndex = $(this).index(); //获取点击的页面索引值
    movePage();
});

/*$(window).resize(function() { //aa????????????
    contentHeight();
});*/

function contentHeight() {
    var screenH = $(window).height();
    $(".page_content,.container").css("height", screenH);
}


/**
 根据给定的索引 切换页面 并处理相关的逻辑  如按钮背景色 回到顶部 cavan画图等
 */
function movePage() {
    setMarginTop();
    setActive();
}

/**
 给page设置margintop  达到页面切换的目的
 */
function setMarginTop() {
    var height = $(".page_content").height();
    var moveY = height * currentIndex;
    $(".allPage").css("marginTop", -moveY);
}

function setActive() {

    $('.R_nav ul li').removeClass('active');
    $('.R_nav ul li').eq(currentIndex).addClass('active');

    $('.index-circle li').removeClass('index-circle-active');
    $('.index-circle li').eq(currentIndex).addClass('index-circle-active');

    //oBox_nav.style.display='block';

    if (currentIndex == 0) {
        $('.page1 p').addClass('animated pulse');


        //aa svg
        aPath.forEach(function(oPath) {
            const fullLength = oPath.getTotalLength();
            oPath.style.strokeDasharray = fullLength;
            oPath.style.strokeDashoffset = fullLength;
            oPath.style.transition = `0ms`;

        })


        aPath.forEach((oPath) => {
            oPath.style.strokeDashoffset = 0;
            oPath.style.transition = `${time}ms`;
        })

        setTimeout(() => {
            setFill(aPath);
        }, time)


    } else {
        $('.page1 p').removeClass('animated pulse');
    }


    if (currentIndex == 2) {
        myskill('red', 5.5, 1);

        myskill('blue', 4.3, 2);

        myskill('green', 4.3, 3);

        myskill('orange', 3.14, 4);

        myskill('black', 4, 5);

        $('.page3 p').addClass('animated pulse');

    } else {
        $('.page3 p').removeClass('animated pulse');
    }


    if (currentIndex == 3) {
        $('.page4 h2').addClass('animated pulse');
        oInfo.style.display = "block";
    } else {
        $('.page4 h2').removeClass('animated pulse');
        oInfo.style.display = "none"
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

                    if (currentIndex < 3) {
                        currentIndex += 1;
                        movePage();
                    }

                }
            } else if (e.detail) {
                if (e.detail < 0) {
                    if (currentIndex > 0) {
                        currentIndex -= 1;
                        movePage();
                    }
                }
                if (e.detail > 0) {
                    if (currentIndex < 3) {
                        currentIndex += 1;
                        movePage();
                    }

                }
            }

            i = 0;

        }

    }, 100)

}


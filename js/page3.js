/**
 技能画图
 */
function myskill(color, size, index, text) {
    var oC = document.querySelectorAll('canvas');
    oC = oC[index-1];
    var ctx = oC.getContext('2d');
    var angle = 0;
    let timer=setInterval(() => {

            ctx.clearRect(0, 0, oC.width, oC.height); //aa  ctx.clearRect(0,0,200,200);??
            ctx.beginPath(); //aa新开一个路径   多次描绘，会出现锯齿的情况?????????
            ctx.arc(100, 100, 70, -Math.PI/2, angle-Math.PI/2); //aa可画弧  圆心 半径 起始的角度 和结束的角度（弧度值）
            ctx.stroke();
            ctx.strokeStyle = color;
            ctx.lineWidth = 7;
            //ctx.lineCap = 'round';
            if (angle < size) {
                angle += 0.08;
            }else{
                clearInterval(timer);
            }
        document.getElementsByClassName('skill'+index)[0].style.background = 'url("' + ctx.canvas.toDataURL() + '") no-repeat center center';

}, 22)

}
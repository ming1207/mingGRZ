
//aa page4
const oC = document.querySelector('#information');
const oInfo = document.querySelector('#info');

const ctx = oC.getContext('2d');

const amount = 100;
const size = 2;   //aa size就是半径的意思吧
const distance = 100;

/*const color = `rgb(${rnd(0,255)},${rnd(0,255)},${rnd(0,255)})`;

ctx.fillStyle ='white';   //aa小圆点的颜色，*/


let dotArray = [];    //aa点数组

const {
    clientWidth,
    clientHeight
} = document.documentElement;

for( let i = 0; i < amount;i++ ){
    let dotInfo = {                          //aa 点信息（坐标，半径，速度）
        x:rnd(size,clientWidth-size),
        y:rnd(size,clientHeight-size),
        speedY:0.4*rndSign()*rnd(2,5),
        speedX:0.4*rndSign()*rnd(2,5),
        r:rnd(2,4)     //aa圆的半径
    }

    dotArray.push(dotInfo);   //aa把每个点放进数组的意思吗????????????
}

setInterval(() => {
    ctx.clearRect(0,0,oC.width,oC.height);  //aa?????????????

dotArray.forEach((dot,index) => {
    const {
        x,y,speedX,speedY,r
    } = dot;     //aa
const color = `rgb(${rnd(0,255)},${rnd(0,255)},${rnd(0,255)})`;

ctx.fillStyle =color;   //aa小圆点的颜色，

// ctx.fillRect(x,y,size,size);
ctx.beginPath();    //aa重新开一个路径
ctx.arc(x,y,r,0,2*Math.PI);
ctx.fill();

dot.x += speedX;
dot.y += speedY;

if(         //aa超出边界，反方向移动
dot.x < size ||
dot.x > clientWidth - size
){
    dot.speedX *= -1
}

if(
    dot.y < size ||
    dot.y > clientHeight - size
){
    dot.speedY *= -1
}
for( 
                    let i = index+1;   //aa为什么加1??貌似不加1也是可以的啊？？？？
                    i<dotArray.length;
                    i++
                ){
                    const current = dotArray[i];

                    let deltaDistance = Math.sqrt(
                        Math.pow(dot.x - current.x,2)+
                        Math.pow(dot.y - current.y,2)
                    )

                    if( deltaDistance < distance ){
                        ctx.beginPath();
                        ctx.strokeStyle=`rgba(245,64,113,${1-deltaDistance/distance})`;

                        ctx.moveTo(dot.x,dot.y);
                        ctx.lineTo(current.x,current.y)

                        ctx.stroke();
                    }
                }
})
},30)

function rnd(n,m){
    return parseInt(Math.random()*(m-n)+n);
}

function rndSign(){     //aaa?哪里会回到是不是》0.5？????????????????????
    return ( Math.random() > 0.5 ) ? 1 : -1;
}

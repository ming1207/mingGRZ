/**
 * Created by Administrator on 2017/2/15 0015.
 */
window.onload=function(){
    var oBox = document.getElementById('box');
    console.log(oBox);
    var aBtn = oBox.getElementsByTagName('li');
    var aDiv = oBox.getElementsByTagName('div');
    for (var i = 0; i < aBtn.length; i++) {
        aBtn[i].index = i;
        aBtn[i].onclick = function() {
            for (var i = 0; i < aBtn.length; i++) {
                aBtn[i].className = '';
                aDiv[i].style.display = 'none';
            }
            this.className = 'active';
            aDiv[this.index].style.display = 'block';

        };
    }

};
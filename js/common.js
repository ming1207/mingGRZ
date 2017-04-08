//鼠标滚轮事件封装
function addEvent(obj, sEv, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(sEv, fn, false);
    } else {
        obj.attachEvent('on' + sEv, fn);
    }
}

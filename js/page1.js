const aPath = document.querySelectorAll('path,circle,rect,ellipse');
    const time = 3000;

    aPath.forEach(function(oPath) {
        const fullLength = oPath.getTotalLength();
        oPath.style.strokeDasharray = fullLength;
        oPath.style.strokeDashoffset = fullLength;
    })


        aPath.forEach((oPath) => {
            oPath.style.strokeDashoffset = 0;
            oPath.style.transition = `${time}ms`;
        })

        setTimeout(() => {
            setFill(aPath);
        }, time)
    

    function setFill(array) {
        array.forEach(item => {
            item.style.fill = item.getAttribute('fill');
        })
    }
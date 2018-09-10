$("body").append("<canvas style='position:fixed;bottom:0;left:0;z-index:999;' id='piojs' width='280' height='250'></canvas>");
$("body").append("<script src='./piojs/live2d.js'>");

loadlive2d("piojs", "./piojs/models/pio/default.json");

//使canvas可以移动
$(document).ready(function(){
    var pioCanvas=$("#piojs")[0];
    pioCanvas.onmousedown=function(e){
        var offsetX=e.offsetX; //鼠标于元素内X轴
        var windowWidth=$(window).width(); //屏幕宽度

        document.onmousemove=function(e){
            var clientX=e.clientX; //鼠标位于屏幕X轴

            if(Number(clientX-offsetX)<0){ //防出左界
                pioCanvas.style.left=0;
            }
            else if(Number(clientX-offsetX)+pioCanvas.offsetWidth>windowWidth){ //防出右界
                pioCanvas.style.left=windowWidth-pioCanvas.offsetWidth+"px";
            }
            else{
                 pioCanvas.style.left=clientX-offsetX+"px";
            }
        };
        document.onmouseup=function(e){
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
});
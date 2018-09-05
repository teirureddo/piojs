$("body").append("<canvas style='position:fixed;bottom:0;left:0;z-index:999;' id='piojs' width='280' height='250'></canvas>");
$("body").append("<script src='./piojs/live2d.js'>")

loadlive2d("piojs", "./piojs/models/pio/default.json");

//使canvas可以移动
$(document).ready(function(){
    var pioCanvas=$('#piojs')[0];
    pioCanvas.onmousedown=function(e){
        var offsetX=e.offsetX;   
        var windowWidth=$(window).width();
        document.onmousemove=function(e){
            var clientX=e.clientX;
            pioCanvas.style.left=clientX-offsetX+"px";
            if(pioCanvas.offsetLeft<0){
                pioCanvas.style.left=0;
            }
            else if(pioCanvas.offsetLeft+pioCanvas.offsetWidth>windowWidth){
                pioCanvas.style.left=windowWidth-pioCanvas.offsetWidth+"px";
            }
        };
        document.onmouseup=function(e){
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
});

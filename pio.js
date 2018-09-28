$("body").append("<canvas style='position:fixed;bottom:0;left:0;z-index:999;' id='piojs' width='280' height='250'></canvas>");
$("body").append("<script src='./piojs/live2d.js'>");

$.getJSON("./piojs/conf.json",function(data){
    $("#piojs").width = data.width;
    $("#piojs").height = data.height;
    loadlive2d("piojs", data.model);
});

//使canvas可以移动
$(document).ready(function(){
    var pioCanvas=$("#piojs")[0];

    //初始化Pio位置记录
    if (!localStorage.getItem("pioLeft")){
        localStorage.setItem("pioLeft", "0px");
    }
    pioCanvas.style.left=localStorage.getItem('pioLeft');

    pioCanvas.onmousedown=function(e){
        var offsetX=e.offsetX; //鼠标于元素内X轴
        var windowWidth=$(window).width(); //屏幕宽度

        document.onmousemove=function(e){
            var clientX=e.clientX; //鼠标位于屏幕X轴

            if(Number(clientX-offsetX)<0){ //防出左界
                pioCanvas.style.left="0px";
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
            localStorage.setItem("pioLeft", pioCanvas.style.left); //记住Pio位置
        };
    };
});
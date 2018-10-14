$("body").append("<script src='./piojs/live2d.js'>");
$("body").append("<canvas style='position:fixed;bottom:0;left:0;z-index:999;' id='piojs' width='280' height='250'></canvas>");

$(document).ready(function(){
    var pioCanvas=$("#piojs")[0];

    if (!localStorage.getItem("pioConf")){
        $.getJSON("./piojs/info.json",function(data){
          var dataRandID = (Math.ceil(Math.random() * (data.length)) - 1);
          console.log(data[dataRandID].model);
          localStorage.setItem("pioConf", JSON.stringify(data[dataRandID]));
          $("#piojs").width = data[dataRandID].width;
          $("#piojs").height = data[dataRandID].height;
          loadlive2d("piojs", data[dataRandID].model);
        });
    }
    else {
        var pioConf;
        pioConf = JSON.parse(localStorage.getItem("pioConf"));
        $("#piojs").width = pioConf.width;
        $("#piojs").height = pioConf.height;
        loadlive2d("piojs", pioConf.model);
    }

    //初始化Pio位置记录
    if (!localStorage.getItem("pioLeft")){
        localStorage.setItem("pioLeft", "0px");
    }
    pioCanvas.style.left=localStorage.getItem("pioLeft");

    //使canvas可以移动
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

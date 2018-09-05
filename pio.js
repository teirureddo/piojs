$("body").append("<canvas style='position:fixed;bottom:0;left:0;z-index:999;' id='piojs' width='280' height='250' class='piojs'></canvas>");
$("body").append("<script src='./piojs/live2d.js'>")

loadlive2d("piojs", "./piojs/models/pio/default.json");

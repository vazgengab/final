var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function () {
    console.log("port is runninng")

});

//stex kapum en mer classery
var Grass = require("./module/grass.js");
var GrassEater = require("./module/grassEater.js");
var gishatich = require("./module/gishatich.js");
var amenaker = require("./module/amenaker.js");
var water = require("./module/water.js");



//haytarum en zanvacnery
grassArr = [];
grasseaterArr = [];
gishatichArr = [];
amenakerArr = [];
waterArr = [];


Weather = "Summer";

Weatherinit = 1;
Grassinit = 0;
GrassEaterinit = 0;
gishatichinit = 0;
amenakerinit = 0;
waterinit = 0;



//stexcum en matrix generacnox function
var w = 50;
var h = 60;

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.floor(Math.random() * 75);
            if (r < 20) r = 0;
            else if (r < 30) r = 1;
            else if (r < 55) r = 2;
            else if (r < 75) r = 3;
            else if (r < 85) r = 4;
            else if (r < 100) r = 5;
            matrix[y][x] = r;
        }
    }
    return matrix;
}


//stexcum en zangvacic patahakan andam tvox function
Random = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

//kanchum en genMatrix functiony ev talis en matrix popoxakanin
matrix = genMatrix(w, h);

//stex pptvum en matrix-i mejov u stexcum en objectnery
for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
            grassArr.push(new Grass(x, y, 1));
            Grassinit++;
        }
        else if (matrix[y][x] == 2) {
            grasseaterArr.push(new GrassEater(x, y, 2));
            Grassinit++;
        }
        else if (matrix[y][x] == 3) {
            gishatichArr.push(new gishatich(x, y, 3));
            gishatichinit++;
        }
        else if (matrix[y][x] == 4) {
            waterArr.push(new water(x, y, 4));
            waterinit++;
        }
        else if (matrix[y][x] == 5) {
            amenakerArr.push(new amenaker(x, y, 5));
            amenakerinit++;
        }
    }
}

//stexcum en function vor kkanchi objecteri methodnery ev kuxark matrixi masin datan script.js
function drawserever() {

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grasseaterArr) {
        grasseaterArr[i].move();
        grasseaterArr[i].mul();
        grasseaterArr[i].eat();
        grasseaterArr[i].die();
    }
    for (var i in gishatichArr) {
        gishatichArr[i].move();
        gishatichArr[i].mul();
        gishatichArr[i].eat();
        gishatichArr[i].die();
    }
    for (var i in amenakerArr) {
        amenakerArr[i].move();
        amenakerArr[i].mul();
        amenakerArr[i].eat();
        amenakerArr[i].die();
    }
    for (var i in waterArr) {
        waterArr[i].mul();
    }

    //matrixy uxarkum en clientin
    io.sockets.emit("matrix", matrix);
}

function draw_wheater() {

    Weatherinit++;
    if (Weatherinit == 5) {
        Weatherinit = 1;
    }
    if (Weatherinit == 4) {
        Weatherinit = "Autumn";
    }
    if (Weatherinit == 3) {
        Weatherinit = "Winter";
    }
    if (Weatherinit == 2) {
        Weatherinit = "Spring";
    }
    if (Weatherinit == 1) {
        Weatherinit = "Summer";
    }

    io.sockets.emit("exanak", Weather);
}



//connectiona stexcum scriptic ekac infoi himan vra script.js i het mousePressed i jamanak
io.on('connection', function (socket) {
    socket.on("Sxmvec", function (arr) {
        var x = arr[0];
        var y = arr[1];

        var directions = [
            [x - 1, y - 1],
            [x, y - 1],
            [x + 1, y - 1],
            [x - 1, y],
            [x + 1, y],
            [x - 1, y + 1],
            [x, y + 1],
            [x + 1, y + 1]
        ];

        if (matrix[y][x] == 1) {
            for (var i in grassArr) {
                if (y == grassArr[i].y && x == grassArr[i].x) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (matrix[y][x] == 2) {
            for (var i in grasseaterArr) {
                if (y == grasseaterArr[i].y && x == grasseaterArr[i].x) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (matrix[y][x] == 3) {
            for (var i in gishatichArr) {
                if (y == gishatichArr[i].y && x == gishatichArr[i].x) {
                    gishatichArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (matrix[y][x] == 4) {
            for (var i in waterArr) {
                if (y == waterArr[i].y && x == waterArr[i].x) {
                    waterArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (matrix[y][x] == 5) {
            for (var i in amenakerArr) {
                if (y == amenakerArr[i].y && x == amenakerArr[i].x) {
                    amenakerArr.splice(i, 1);
                    break;
                }
            }
        }

        matrix[y][x] = 0;

        for (var i in directions) {
            var koxqix = directions[i][0];
            var koxqiy = directions[i][1];
            if (koxqix >= 0 && koxqix < matrix[0].length && koxqiy >= 0 && koxqiy < matrix.length) {
                if (matrix[koxqiy][koxqix] == 1) {
                    for (var i in grassArr) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (koxqix >= 0 && koxqix < matrix[0].length && koxqiy >= 0 && koxqiy < matrix.length) {
                if (matrix[koxqiy][koxqix] == 1) {
                    for (var i in grasseaterArr) {
                        grasseaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (koxqix >= 0 && koxqix < matrix[0].length && koxqiy >= 0 && koxqiy < matrix.length) {
                if (matrix[koxqiy][koxqix] == 1) {
                    for (var i in gishatichArr) {
                        gishatichArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (koxqix >= 0 && koxqix < matrix[0].length && koxqiy >= 0 && koxqiy < matrix.length) {
                if (matrix[koxqiy][koxqix] == 1) {
                    for (var i in waterArr) {
                        waterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (koxqix >= 0 && koxqix < matrix[0].length && koxqiy >= 0 && koxqiy < matrix.length) {
                if (matrix[koxqiy][koxqix] == 1) {
                    for (var i in amenakerArr) {
                        amenakerArr.splice(i, 1);
                        break;
                    }
                }
            }
            matrix[koxqiy][koxqix] = 0;
        }
    });
    io.sockets.emit("matrix", matrix);


    socket.on("ashxarhiverj", function () {
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 6;
            }
        }

        grassArr.length = 0;
        grasseaterArr.length = 0;
        gishatichArr.length = 0;
        waterArr.length = 0;
        amenakerArr.length = 0;
        io.sockets.emit("matrix", matrix);
    })
});

var obj = {"info": []};
function main(){
    var file = "Statistics.json";
    obj.info.push({"Cnvac xoteri qanak": Grassinit, "Cnvac xotakerneri qanak": GrassEaterinit, "Cnvac gishatichneri qanak": gishatichinit, "Cnvac waterneri qanak": waterinit,"Cnvac amenakerneri qanak": amenakerinit, });
    fs.writeFileSync(file, JSON.stringify(obj,null,3));
}

setInterval(drawserever, 2000);
setInterval(draw_wheater, 6000);
setInterval(main, 3000);








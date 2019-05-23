//knchum enq socket.io ev haytarum en side canvasi hamar
var side = 20;
var socket = io();

var weatherclient = "Summer";
socket.on("exanak", function (w) {
    weatherclient = w;
});

//setup
function setup() {
    createCanvas(20 * side, 20 * side);
    background('blue');
}

function drawWeather(w) {
    var p = document.getElementById('seasons');
    var weather = w;
    console.log(weather);

    if (weather == "Summer") {
        p.innerText = "Summer";
    }
    else if (weather == "Winter") {
        p.innerText = "Winter";
    }
    else if (weather == "Autumn") {
        p.innerText = "Autumn";
    }
    else if (weather == "Spring") {
        p.innerText = "Spring";
    }
}

//nuyn draw functiony uxaki serveric ekac matrixi hashvin 
function drawMatrix(matrix) {
    background('grey');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("grey");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 1) {
                if (weatherclient == "Summer") {
                    fill("green");
                }
                else if (weatherclient != "Summer") {
                    fill("#A79F15");
                }
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                if (weatherclient == "Winter") {
                    fill("green");
                }
                else if (weatherclient != "Winter") {
                    fill("Yellow");
                }
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("red");
            }
            rect(x * side, y * side, side, side);
        }
    }
}

socket.on("matrix", drawMatrix);
socket.on("exanak", drawWeather);

function mousePressed() {

    var x = Math.floor(mouseX / side);
    var y = Math.floor(mouseY / side);
    arr = [x, y];

    console.log(arr);
    socket.emit("Sxmvec", arr)
}


function FireButton() {
    socket.emit("ashxarhiverj");
}

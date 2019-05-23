var LivingCreature = require("./LivingCreature.js");
module.exports = class amenaker extends LivingCreature{
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.directions = [];
    }


    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x, this.y + 2],
            [this.x, this.y - 3],
            [this.x - 3, this.y],
            [this.x + 3, this.y],
            [this.x, this.y + 3]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {

        var newcell = Random(this.chooseCell(0))
        if (newcell) {
            this.energy--;
            var newX = newcell[0];
            var newY = newcell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 5
            this.x = newX;
            this.y = newY;
        }
    }

    eat() {
        var newcell1 = Random(this.chooseCell(1))
        var newcell2 = Random(this.chooseCell(2))
        arr.push(newcell1)
        arr.push(newcell2)
        var newCell = Random(arr)
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 5;



            for (var i in grasseaterArr) {
                if (newX == grasseaterArr[i].x && newY == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            this.x = newX;
            this.y = newY;
            this.energy += 2;
        }
    }
    mul() {
        this.multiply++;
        var newCell = Random(this.chooseCell(0));

        if (this.energy >= 10 && newCell) {
            var newamenaker = new amenaker(newCell[0], newCell[1], this.index);
            amenakerArr.push(newamenaker);
            matrix[newCell[1]][newCell[0]] = 5;
            this.energy = 8;
        }
    }
    die() {
        if (this.energy <= 0) {


            matrix[this.y][this.x] = 0;

            for (var i in amenakerArr) {
                if (this.x == amenakerArr[i].x && this.y == amenakerArr[i].y) {
                    amenakerArr.splice(i, 1);
                }
            }
        }
    }
}











































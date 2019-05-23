var LivingCreature = require("./LivingCreature.js");
module.exports = class Water extends LivingCreature {

    mul() {
        this.multiply++;
        var newCell = Random(this.chooseCell(0));
        //  console.log(newCell, this.multiply > 6);
        if (this.multiply >= 6 && newCell) {
            var newWater = new Water(newCell[0], newCell[1], this.index);
            waterArr.push(newWater);
            matrix[newCell[1]][newCell[0]] = 4;
            this.multiply = 0;
        }
    }
}












































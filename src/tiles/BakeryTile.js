"use strict";

class BakeryTile extends Tile {
    constructor(row, column) {
        super("baeckerei.gif", row, column);
	    this.build_costs = {humansidle: 10, water: 100, wheat:50};

        // Dass Gebäude etwas benötigen, habe ich erstmal auskommentiert. Es ist noch
        // zu verbuggt (negatives Mehl) und wird grafisch nicht deutlich.
        this.production_needs = {/*water: -1, flour: -4, */bread: 1};

        this.tooltip_name = "BAKERY";
        this.counter = 40;
        this.workingspeed = 35;
    }

    clone() {
        return new BakeryTile(this.row, this.column);
    }
};

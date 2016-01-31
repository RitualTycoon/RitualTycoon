"use strict";

class BakeryTile extends Tile {
    constructor(row, column) {
        super("baeckerei.gif", row, column);
		this.build_costs = {humansidle: 10, water: 100, wheat:50, bear:10};
        this.tooltip_name = "BAKERY";
        this.counter = 40;
    }

    clone() {
        return new BakeryTile(this.row, this.column);
    }

    step() {
        this.counter = this.counter - 1;
        if (this.counter > 0) {
            return {};
        }
        this.counter = 40;
        if(resources['humansidle']>5){
            return {
                "breads": 10,"flour":-20,
            };
        }
    }
};

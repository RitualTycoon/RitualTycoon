"use strict";

class ButcherTile extends Tile {
    constructor(row, column) {
        super("fleischer.gif", row, column);
		this.build_costs = {humansidle: 50, water: 500, wheat:150, bear:100, bread:70, goats:10};
        this.tooltip_name = "BUTCHER";
        this.counter = 50;
    }

    clone() {
        return new ButcherTile(this.row, this.column);
    }

    step() {
        this.counter = this.counter - 1;
        if (this.counter > 0) {
            return {};
        }
        this.counter = 50;
        if(resources['goats']>0){
            return {
                "meat": 2,"goats":-1,
            };
        }
    }
};

"use strict";

class GoatFarmTile extends Tile {
    constructor(row, column) {
        super("ziegenhof.gif", row, column);
		this.tooltip_name = "GOAT FARM";
        this.build_costs = {humansidle: 20, water: 200, wheat:100, bear:50, bread:20};
        this.counter = 50;
    }

    clone() {
        return new GoatFarmTile(this.row, this.column);
    }

    step() {
        this.counter = this.counter - 1;
        if (this.counter > 0) {
            return {};
        }
        this.counter = 50;
        return {
            "goats": 1,
        };
    }
};

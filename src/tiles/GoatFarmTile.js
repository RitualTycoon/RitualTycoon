"use strict";

class GoatFarmTile extends Tile {
    constructor(row, column) {
        super("ziegenhof.gif", row, column);
		this.tooltip_name = "GOAT FARM";
        this.build_costs = {humansidle: 20, water: 200, wheat:100, bear:50, bread:20};
        this.counter = 80;
        this.workingspeed = 30;
    }

    clone() {
        return new GoatFarmTile(this.row, this.column);
    }

    step()
    {
        return
        {
            "water": -7,
            "wheat": -10,
            "goats": 1
        };
    }
};

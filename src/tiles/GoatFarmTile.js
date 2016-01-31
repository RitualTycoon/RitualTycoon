"use strict";

class GoatFarmTile extends Tile {
    constructor(row, column) {
        super("ziegenhof.gif", row, column);
		this.tooltip_name = "GOAT FARM";
        this.adjacent_needs = [ new FieldTile(), ];
        this.build_costs = { humansidle: 8, water: 200, wheat: 100, beer: 50, bread: 20, };
        this.production = { goats: 1, };
        this.counter = 80;
        this.workingspeed = 30;
    }

    clone() {
        return new GoatFarmTile(this.row, this.column);
    }

    getUpgrades() {
        return [ new GrassTile(), ]
    }
};

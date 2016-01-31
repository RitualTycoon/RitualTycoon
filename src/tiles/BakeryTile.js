"use strict";

class BakeryTile extends Tile {
    constructor(row, column) {
        super("baeckerei.gif", row, column);
	    this.build_costs = { humansidle: 2, water: 100, wheat: 50, };
        this.production = { bread: 1 };
        this.adjacent_needs = [ new WindmillTile() ];
        this.tooltip_name = "BAKERY";
        this.counter = 40;
        this.workingspeed = 35;
    }

    clone() {
        return new BakeryTile(this.row, this.column);
    }

    getUpgrades() {
        return [ new GrassTile(), ];
    }
};

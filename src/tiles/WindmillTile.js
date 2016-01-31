"use strict";

class WindmillTile extends Tile {
    constructor(row, column) {
        super("muele.gif", row, column);
		this.build_costs = {humansidle: 5, water: 50, wheat:20};
        this.production = { flour: 2 };
        this.adjacent_needs = [ new FieldTile() ];
        this.tooltip_name = "wINDMILL";
        this.workingspeed = 35;
    }

    clone() {
        return new WindmillTile(this.row, this.column);
    }

    getUpgrades() {
        return [new GrassTile(),]
    }
};

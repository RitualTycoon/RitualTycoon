"use strict";

class WindmillTile extends Tile {
    constructor(row, column) {
        super("muele.gif", row, column);
		this.build_costs = {humansidle: 2, water: 30, wheat:15};
        this.production = {/*wheat: -2, */flour: 5};
        this.adjacent_needs = [ new FieldTile() ];
        this.tooltip_name = "wINDMILL";
        this.counter = 30;
        this.workingspeed = 40;
    }

    clone() {
        return new WindmillTile(this.row, this.column);
    }

    getUpgrades() {
        return [new GrassTile(),]
    }
};

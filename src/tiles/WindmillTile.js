"use strict";

class WindmillTile extends Tile {
    constructor(row, column) {
        super("muele.gif", row, column);
		this.build_costs = {humansidle: 4, water: 30, wheat:15};
        this.production_needs = {wheat: -2, flour: 5};
        this.tooltip_name = "wINDMILL";
        this.counter = 30;
        this.workingspeed = 40;
    }

    clone() {
        return new WindmillTile(this.row, this.column);
    }
};

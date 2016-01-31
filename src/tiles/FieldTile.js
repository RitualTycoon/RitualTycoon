"use strict";

class FieldTile extends Tile {
    constructor(row, column) {
        super("weizenfarm.png", row, column);
		this.build_costs = { humansidle: 2, water: 20 };
        this.production = { wheat: 1, };
        this.adjacent_needs = [ new WellTile() ];
		this.tooltip_name = "FIELD";
        this.counter = 30;
        this.workingspeed = 20;
    }

    clone() {
        return new FieldTile(this.row, this.column);
    }

    getUpgrades() {
        return [new GrassTile(),]
    }
};

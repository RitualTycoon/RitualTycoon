"use strict";

class FieldTile extends Tile {
    constructor(row, column) {
        super("weizenfarm.png", row, column);
		this.build_costs = {humansidle: 2, water: 15};
        this.production = {wheat: 5,};
        this.adjacent_needs = [ new WellTile() ];
		this.tooltip_name = "FIELD";
        this.counter = 30;
        this.workingspeed = 10;
    }

    clone() {
        return new FieldTile(this.row, this.column);
    }

    getUpgrades() {
        return [new GrassTile(),]
    }
};

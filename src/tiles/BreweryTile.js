"use strict";

class BreweryTile extends Tile {
    constructor(row, column) {
        super("brauerei.gif", row, column);
		this.build_costs = {humansidle: 6, water: 100, wheat:30};
        this.production_needs = {water: -2, wheat: -2, beer: 1};
        this.tooltip_name = "BREWERY";
        this.counter = 40;
        this.workingspeed = 40;
    }

    clone() {
        return new BreweryTile(this.row, this.column);
    }
};

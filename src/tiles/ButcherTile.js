"use strict";

class ButcherTile extends Tile {
    constructor(row, column) {
        super("fleischer.gif", row, column);
		this.build_costs = {humansidle: 50, water: 500, wheat:150, beer:100, breads:70, goats:10};
        this.production_needs = {water: -10, goats: -1, meat: 1};
        this.tooltip_name = "BUTCHER";
        this.counter = 80;
        this.workingspeed = 20;
    }

    clone() {
        return new ButcherTile(this.row, this.column);
    }
};

"use strict";

class InnTile extends Tile {
    constructor(row, column) {
        super("gasthaus.gif", row, column);
		this.build_costs = {humansidle: 100, water: 700, wheat:300, beer:200, breads:150, goats:50, meat:20};
        this.production_needs = {beer: -1, breads: -1, meat: -1, stew: 1};
        this.tooltip_name = "INN";
        this.counter = 0;
        this.workingspeed = 30;
    }

    clone() {
        return new InnTile(this.row, this.column);
    }
};

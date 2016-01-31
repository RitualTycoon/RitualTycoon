"use strict";

class BreweryTile extends Tile {
    constructor(row, column) {
        super("brauerei.gif", row, column);
		this.build_costs = {humansidle: 6, water: 100, wheat:30};

        // Dass Gebäude etwas benötigen, habe ich erstmal auskommentiert. Es ist noch
        // zu verbuggt (negatives Mehl) und wird grafisch nicht deutlich.
        this.production = {/*water: -2, wheat: -2, */beer: 1};
        this.adjacent_needs = [ new WellTile(),new FieldTile() ];
        this.tooltip_name = "BREWERY  \n needs to be next to Field,Well";
        this.counter = 40;
        this.workingspeed = 40;
    }

    clone() {
        return new BreweryTile(this.row, this.column);
    }

    getUpgrades() {
        return [new GrassTile(),]
    }
};

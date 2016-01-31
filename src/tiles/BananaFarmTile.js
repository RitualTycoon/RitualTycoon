"use strict";

class BananaFarmTile extends Tile {
    constructor(row, column) {
        super("bananafarm.gif", row, column);
		this.build_costs = {humansidle: 250, water: 1500, wheat:600, beer:400, bread:300, goats:200, meat:100, stew:50};
        this.production = {bananas: 1};
        this.tooltip_name = "BANANA PLANTATION";
        this.counter = 120;
        this.workingspeed = 30;
    }

    clone() {
        return new BananaFarmTile(this.row, this.column);
    }

    getUpgrades() {
        return [new GrassTile(),]
    }
};

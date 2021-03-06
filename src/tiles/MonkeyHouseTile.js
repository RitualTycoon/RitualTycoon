"use strict";

class MonkeyHouseTile extends Tile {
    constructor(row, column) {
        super("monkeyhouse.gif", row, column);
		this.build_costs = {
            humansidle: 10,
            water: 2000,
            wheat: 1200,
            beer: 800,
            bread: 600,
            goats: 400,
            meat: 200,
            stew: 100,
            bananas: 50
        };
        this.production = { monkeys: 1 };
        this.adjacent_needs = [ new BananaFarmTile() ];
        this.tooltip_name = "MONKEY HOUSE";
        this.counter = 120;
        this.workingspeed = 50;
    }

    clone() {
        return new MonkeyHouseTile(this.row, this.column);
    }

    getUpgrades() {
        return [new GrassTile(),]
    }
};

"use strict";

class MonkeyHouseTile extends Tile {
    constructor(row, column) {
        super("monkeyhouse.gif", row, column);
		this.build_costs = {humansidle: 550, water: 2000, wheat:1200, bear:800, bread:600, goats:400, meat:200, stew:100, bananas:50};
        this.tooltip_name = "MONKEY HOUSE";
        this.counter = 120;
        this.workingspeed = 50;
    }

    clone() {
        return new MonkeyHouseTile(this.row, this.column);
    }

    step()
    {
        return{ bananas:-100, monkeys: 1};
    }
};

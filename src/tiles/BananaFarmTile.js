"use strict";

class InnTile extends Tile {
    constructor(row, column) {
        super("gasthaus.gif", row, column);
		this.build_costs = {humansidle: 250, water: 1500, wheat:600, bear:400, bread:300, goats:200, meat:100, stew:50};
        this.tooltip_name = "INN";
        this.counter = 40;
    }

    clone() {
        return new InnTile(this.row, this.column);
    }

    step() {
        this.counter = this.counter - 1;
        if (this.counter > 0) {
            return {};
        }
        this.counter = 40;
        if(resources['wheat']>10&&resources['water']>20){
            return {
                "beer": 5,"wheat":-10,"water":-20,
            };
        }
    }
};

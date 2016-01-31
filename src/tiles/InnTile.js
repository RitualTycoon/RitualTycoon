"use strict";

class InnTile extends Tile {
    constructor(row, column) {
        super("gasthaus.gif", row, column);
		this.build_costs = {humansidle: 100, water: 700, wheat:300, bear:200, bread:150, goats:50, meat:20};
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

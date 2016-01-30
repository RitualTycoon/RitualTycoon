"use strict";

class DairyTile extends Tile {
    constructor(row, column) {
        super("molkerei.gif", row, column);
		this.build_costs = {water: 5};
        this.tooltip_name = "DAIRY";
        this.counter = 40;
    }

    clone() {
        return new DairyTile(this.row, this.column);
    }

    step() {
        this.counter = this.counter - 1;
        if (this.counter > 0) {
            return {};
        }
        this.counter = 40;
        if(resources['goats']>0){
            return {
                "milk": 2,
            };
        }
    }
};

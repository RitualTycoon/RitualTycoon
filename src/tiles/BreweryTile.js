"use strict";

class BreweryTile extends Tile {
    constructor(row, column) {
        super("brauerei.gif", row, column);
		this.build_costs = {water: 5};
        this.tooltip_name = "BREWERY";
        this.counter = 40;
    }

    clone() {
        return new BreweryTile(this.row, this.column);
    }

    step() {
        this.counter = this.counter - 1;
        if (this.counter > 0) {
            return {};
        }
        this.counter = 40;
        if(resources['meat']>5&&resources['bread']>5&&resources['beer']>1){
            return {
                "stew": 1,"meat":-5,"bread":-5,"beer":-1,
            };
        }
    }
};

"use strict";

class WellTile extends Tile {
    constructor(row, column) {
        super("brunnen.gif", row, column);
        this.tooltip_name = "WELL";
        this.build_costs = {humansidle: 1};
        this.counter = 40;
    }

    clone() {
        return new WellTile(this.row, this.column);
    }

    step() {
        this.counter = this.counter - 1;
        if (this.counter > 0) {
            return {};
        }
        this.counter = 40;
        return {
            "water": 5,
        };
    }
};

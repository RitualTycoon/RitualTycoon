"use strict";

class WellTile extends Tile {
    constructor(row, column) {
        super("brunnen.gif", row, column);
        this.tooltip_name = "WELL";
        this.build_costs = {humansidle: 1};
        this.counter = 1;
        this.workingspeed = 1;
    }

    clone() {
        return new WellTile(this.row, this.column);
    }

    step()
    {
        return
        {
            "water": 1,
        };
    }
};

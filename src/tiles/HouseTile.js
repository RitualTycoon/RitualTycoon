"use strict";

class HouseTile extends Tile {
    constructor(row, column) {
        super("wohnhaeuser.gif", row, column);
		this.build_costs = {livingspace: -10};
		this.tooltip_name = "HOUSE";
        this.counter = 5;
        this.workingspeed = 40;
    }

    clone() {
        return new HouseTile(this.row, this.column);
    }

    step() {
        if (resources['livingspace'] > (resources['humansidle'] + resources['humansbusy']))
        {
            return { humansidle: 1, };
        }
        else
        {
            return { };
        }
    }
};

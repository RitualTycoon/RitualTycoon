"use strict";

class HouseTile extends Tile {
    constructor(row, column) {
        super("wohnhaeuser.gif", row, column);
		this.build_costs = {water: 10};
		this.tooltip_name = "HOUSE";
        this.counter = 5;
        this.workingspeed = 40;
    }

    clone() {
        resources['livingspace'] += 10;
        return new HouseTile(this.row, this.column);
    }

    step() {
        let receipe = [];
        if (resources['stew'] > 0) {
            receipe['stew'] = -1;
            receipe['humansidle'] = 10;
            receipe['livingspace'] = -10;
        } else if (resources['meat'] > 0) {
            receipe['meat'] = -1;
            receipe['humansidle'] = 3;
            receipe['livingspace'] = -3;
        } else if (resources['breads'] > 0) {
            receipe['breads'] = -1;
            receipe['humansidle'] = 1;
            receipe['livingspace'] =-1;
        }

        if (resources['livingspace'] >= receipe['humansidle']) {
            return receipe;
        } else {
            return { };
        }
    }
};

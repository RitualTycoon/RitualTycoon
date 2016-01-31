"use strict";

class HouseTile extends Tile {
    constructor(row, column) {
        super("wohnhaeuser.gif", row, column);
		this.build_costs = {water: 10};
		this.tooltip_name = "HOUSE";
        this.counter = 5;
        this.workingspeed = 30;
        this.house_number = 0;
    }

    clone() {
        resources['livingspace'] += 10;
        this.house_number += 1;
        for (let key in this.build_costs)
            this.build_costs['key'] *= 2;
        if (this.house_number > 2) this.build_costs['wheat'] = 2;
        if (this.house_number > 4) this.build_costs['flour'] = 2;
        if (this.house_number > 6) this.build_costs['beer'] = 2;
        if (this.house_number > 8) this.build_costs['breads'] = 2;
        if (this.house_number > 10) this.build_costs['goats'] = 2;
        if (this.house_number > 12) this.build_costs['meat'] = 2;
        if (this.house_number > 14) this.build_costs['stew'] = 2;
        if (this.house_number > 14) this.build_costs['bananas'] = 2;
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
            this.counter = this.workingspeed;
            return receipe;
        } else {
            return { };
        }
    }
};

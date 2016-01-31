"use strict";

class HouseTile extends Tile {
    constructor(row, column) {
        super("wohnhaeuser.gif", row, column);
		this.build_costs = {water: 10};
        this.production = { humansidle: 1 };
        this.adjacent_needs = [ new WellTile() ];
		this.tooltip_name = "HOUSE \n needs to be next to Well";
        this.counter = 5;
        this.workingspeed = 30;
        this.house_number = 0;
    }

    clone() {
        // Erst auskommentieren, wenn grafisch darstellbar.
        // this.house_number += 1;
        // for (let key in this.build_costs)
        //     this.build_costs['key'] *= 2;
        // if (this.house_number > 2) this.build_costs['wheat'] = 2;
        // if (this.house_number > 4) this.build_costs['flour'] = 2;
        // if (this.house_number > 6) this.build_costs['beer'] = 2;
        // if (this.house_number > 8) this.build_costs['bread'] = 2;
        // if (this.house_number > 10) this.build_costs['goats'] = 2;
        // if (this.house_number > 12) this.build_costs['meat'] = 2;
        // if (this.house_number > 14) this.build_costs['stew'] = 2;
        // if (this.house_number > 14) this.build_costs['bananas'] = 2;
        return new HouseTile(this.row, this.column);
    }

    getUpgrades() {
        return [new GrassTile(),]
    }
};

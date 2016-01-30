"use strict";

class GoatFarmTile extends Tile {
    constructor(row, column) {
        super("ziegenhof.gif", row, column);
		this.build_costs = {carrots: 10};
    }
    clone() {
        return new GoatFarmTile(this.row, this.column);
    }
};

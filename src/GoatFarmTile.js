"use strict";

class GoatFarmTile extends Tile {
    constructor(row, column) {
        super("ziegenhof.gif", row, column);
        this.counter = 100;
    }

    clone() {
        return new GoatFarmTile(this.row, this.column);
    }

    step() {
        this.counter = this.counter - 1;
        if (this.counter > 0) {
            return {};
        }
        this.counter = 100;
        return {
            "goats": 1,
        };
    }
};

"use strict";

class HouseTile extends Tile {
    constructor(row, column) {
        super("wohnhaeuser.png", row, column);
        this.counter = 10;
    }

    clone() {
        return new HouseTile(this.row, this.column);
    }

    step() {
        this.counter = this.counter - 1;
        if (this.counter > 0) {
            return {};
        }
        this.counter = 10;
        return {
            "humansidle": 1,
        };
    }
};

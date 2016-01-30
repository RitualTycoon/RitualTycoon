"use strict";

class FieldTile extends Tile {
    constructor(row, column) {
        super("weizenfarm.png", row, column);
		this.build_costs = {humansidle: 50};
        this.counter = 10;
    }

    clone() {
        return new FieldTile(this.row, this.column);
    }

    step() {
        this.counter = this.counter - 1;
        if (this.counter > 0) {
            return {};
        }
        this.counter = 10;
        return {
            "wheat": 1,
        };
    }
};

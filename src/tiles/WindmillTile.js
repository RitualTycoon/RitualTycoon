"use strict";

class WindmillTile extends Tile {
    constructor(row, column) {
        super("muele.gif", row, column);
		this.build_costs = {water: 5};
        this.counter = 40;
    }

    clone() {
        return new WindmillTile(this.row, this.column);
    }

    step() {
        this.counter = this.counter - 1;
        if (this.counter > 0) {
            return {};
        }
        this.counter = 40;
        if(resources['wheat']>5){
            return {
                "flour": 10,"wheat":-5,
            };
        }
    }
};

"use strict";

class HouseTile extends Tile {
    constructor(row, column) {
        super("wohnhaeuser.png", row, column);
    }

    clone() {
        return new HouseTile(this.row, this.column);
    }
};

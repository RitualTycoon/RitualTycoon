"use strict";

class GoatFarmTile extends Tile {
    constructor(row, column) {
        super("ziegenhof.gif", row, column);
    }
    clone() {
        return new GoatFarmTile(this.row, this.column);
    }
};

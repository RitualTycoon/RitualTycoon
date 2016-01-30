"use strict";

class WaterTile extends Tile {
    constructor(row, column, coast) {
        super("/../water/water" + coast + ".gif", row, column);
        this.link = null;
    }
};

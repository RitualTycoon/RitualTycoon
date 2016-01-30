"use strict";

class WaterTile extends Tile {
    constructor(row, column, coast) {
        super("water" + coast + ".png", row, column);
        this.link = null;
    }
};

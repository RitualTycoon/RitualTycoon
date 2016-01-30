"use strict";

class WaterTile extends Tile {
    constructor(row, column, coast = "00000000") {
        super("water" + coast + ".png", row, column);
        this.clickable = false;
    }
};

"use strict";

class WaterTile extends Tile {
    constructor(row, column) {
        super("water1.png", row, column);
        this.clickable = false;
    }
};

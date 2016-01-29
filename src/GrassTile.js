"use strict";

class GrassTile extends Tile {
    constructor(row, column) {
        super("farm.png", row, column);
        this.clickable = true;
    }
};

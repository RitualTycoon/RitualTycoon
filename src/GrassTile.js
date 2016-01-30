"use strict";

class GrassTile extends Tile {
    constructor(row, column) {
        super("ziegenhof.gif", row, column);
        this.clickable = true;
    }
};

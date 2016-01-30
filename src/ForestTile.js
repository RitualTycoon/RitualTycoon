"use strict";

class ForestTile extends Tile {
    constructor(row, column) {
        super("wald.png", row, column);
    }
    clone() {
        return new ForestTile(this.row, this.column);
    }
};

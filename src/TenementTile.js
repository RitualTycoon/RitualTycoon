"use strict";

class TenementTile extends Tile {
    constructor(row, column) {
        super("wohnhaueser.png", row, column);
        this.clickable = true;
    }
};

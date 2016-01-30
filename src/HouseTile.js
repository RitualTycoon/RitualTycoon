"use strict";

class HouseTile extends Tile {
    constructor(row, column) {
        super("wohnhaeuser.png", row, column);
        this.clickable = true;
    }
};

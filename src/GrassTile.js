"use strict";

class GrassTile extends Tile {
    constructor(row, column) {
        super("grasland.png", row, column);
    }

    getUpgrades() {
        return [new HouseTile()];
    }
};

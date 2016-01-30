"use strict";

class GrassTile extends Tile {
    constructor(row, column) {
        super("grasland.png", row, column);
    }

    getUpgrades() {
        return [new HouseTile(), new GoatFarmTile(), new FieldTile()];
    }
    clone() {
        return new GrassTile(this.row, this.column);
    }
};

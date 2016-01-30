"use strict";

class GrassTile extends Tile {
    constructor(row, column) {
        super("grasland.png", row, column);
    }

    getUpgrades() {
        return [new HouseTile(), new GoatFarmTile(), new FieldTile(), new ButcherTile()];
    }
    clone() {
        return new GrassTile(this.row, this.column);
    }
};

"use strict";

class GrassTile extends Tile {
    constructor(row, column) {
        super("grasland.png", row, column);
    }

    getUpgrades() {
        return [new HouseTile(), new GoatFarmTile(), new FieldTile(), new ButcherTile(), new DairyTile(), new WindmillTile()];
    }
    clone() {
        return new GrassTile(this.row, this.column);
    }
};

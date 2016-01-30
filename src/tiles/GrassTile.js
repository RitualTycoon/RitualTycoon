"use strict";

class GrassTile extends Tile {
    constructor(row, column) {
        super("grasland.png", row, column);
		this.build_costs = {water: 50};
		this.tooltip_name = "GRASS";
    }

    getUpgrades() {
        return [new HouseTile(), new GoatFarmTile(), new FieldTile(), new ButcherTile(), new DairyTile()];
    }
    clone() {
        return new GrassTile(this.row, this.column);
    }
};

"use strict";

class GrassTile extends Tile {
    constructor(row, column) {
        super("grasland.png", row, column);
		this.build_costs = {water: 50};
		this.tooltip_name = "GRASS";
    }

    getUpgrades() {
        return [new HouseTile(), new WellTile(),
        new FieldTile(), new WindmillTile(), new BreweryTile(),
        new BakeryTile(), new GoatFarmTile(), new ButcherTile(),
        new InnTile(), new BananaFarmTile(), new MonkeyHouseTile(),]
    }
    clone() {
        return new GrassTile(this.row, this.column);
    }
};

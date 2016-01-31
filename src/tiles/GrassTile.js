"use strict";

class GrassTile extends Tile {
    constructor(row, column) {
        super("grasland.png", row, column);
		this.build_costs = {water: 50};
		this.tooltip_name = "GRASS";
        this.extra_space = 0;
        this.buildtime = 1;
    }

    getUpgrades() {
        return [new HouseTile(), new WellTile(),
        new FieldTile(), new WindmillTile(), new BreweryTile(),
        new BakeryTile(), new GoatFarmTile(), new ButcherTile(),
        new InnTile(), new BananaFarmTile(), new MonkeyHouseTile(),]
    }
    
    clone() {
        // FIXME: Damit das funktioniert, muss erst der Tooltip-Code angepasst werden.
        // this.extra_space += 1;
        // for (let key in this.build_costs)
        //     this.build_costs['key'] *= 2;
        // if (this.extra_space > 3) this.build_costs['wheat'] = 2;
        // if (this.extra_space > 6) this.build_costs['flour'] = 3;
        // if (this.extra_space > 9) this.build_costs['beer'] = 4;
        // if (this.extra_space > 12) this.build_costs['bread'] = 5;
        // if (this.extra_space > 15) this.build_costs['goats'] = 6;
        // if (this.extra_space > 18) this.build_costs['meat'] = 7;
        // if (this.extra_space > 21) this.build_costs['stew'] = 8;
        // if (this.extra_space > 24) this.build_costs['bananas'] = 9;
        return new GrassTile(this.row, this.column);
    }
};

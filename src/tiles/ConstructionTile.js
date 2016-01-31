"use strict";

class ConstructionTile extends Tile {
    constructor(tile) {
        super("build.gif", tile.row, tile.column);
//         this.tooltip_name = "UNDER CONSTRUCTION...";
        this.building = tile;
        this.progress = 2;
    }

    step() {
        this.progress -= 1;
        if (this.progress <= 0) {
            replaceTile(this.building);
        }
        return {};
    }
};

"use strict";

class ConstructionTile extends Tile {
    constructor(tile) {
        super("build.gif", tile.row, tile.column);
        this.building = tile;
        this.progress = tile.buildtime;
    }

    step() {
        this.progress -= 1;
        if (this.progress <= 0) {
            replaceTile(this.building);
        }
        return {};
    }
};

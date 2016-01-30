"use strict";

class FieldTile extends Tile {
    constructor(row, column) {
        super("karotten-feld.png", row, column);
    }
    clone() {
        return new FieldTile(this.row, this.column);
    }
};

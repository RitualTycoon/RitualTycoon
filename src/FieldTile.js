"use strict";

class FieldTile extends Tile {
    constructor(row, column) {
        super("field.png", row, column);
        this.clickable = true;
    }
};

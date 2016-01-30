"use strict";

class Board {
    constructor(width,height) {
        this.board = new Array();
        for (var i = 0; i < width; i++) {
            var row = new Array();
            for (var j = 0; j < height; j++) {
                if (i + j < 5) {
                    row.push(new WaterTile(i, j));
                } else {
                    row.push(new GrassTile(i, j));
                }
            }
            this.board.push(row);
        }
    }

    getTile(row,column){
        let selectedRow = board.board[row];
        if (selectedRow) {
            let selectedColum = selectedRow[column];
            if (selectedColum) {
                return selectedColum;
            }
        }
        return null;
    }
}

"use strict";

class Board {
    constructor(width,height) {
        this.board = new Array();
        for (var i = 0; i < width+1; i++) {
            var row = new Array();
            for (var j = 0; j < height+1; j++) {
                if(Math.floor(Math.sqrt((i-width/2)*(i-width/2)+(j-height/2)*(j-height/2))) > (width/2)-2){
                    row.push(new WaterTile(i, j));
                } else {
                    row.push(new ForestTile(i, j));
                }
            }
            this.board.push(row);
        }
        for (var i = 0; i < width+1; i++) {
             for (var j = 0; j < height+1; j++) {
                 if(this.getTile(i,j) instanceof WaterTile){
                     for(let tile of this.getAdjacentTiles(i,j)){

                     }
                 }
             }
         }
    }

    getTile(row,column){
        let selectedRow = this.board[row];
        if (selectedRow) {
            let selectedColum = selectedRow[column];
            if (selectedColum) {
                return selectedColum;
            }
        }
        return null;
    }
    getAdjacentTiles(row,column){
        var List = new Array();
        for (var i = row-1;i<=row+1;i++){
            for(var j = column-1;j<=column+1;j++){
                if(i!=row&&j!=column){
                    List.push(this.getTile(i,j));
                }
            }
        }
        return List
    }
}

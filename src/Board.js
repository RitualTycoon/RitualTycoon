"use strict";

class Board {
    constructor(width,height) {
        this.board = [];
        for (let i = 0; i < width+1; i++) {
            let row = [];
            for (let j = 0; j < height+1; j++) {
                if(Math.floor(Math.sqrt((i-width/2)*(i-width/2)+(j-height/2)*(j-height/2))) > (width/2)-2){
                    row.push(new WaterTile(i, j, "00000000"));
                } else {
                    row.push(new GrassTile(i, j));
                }
            }
            this.board.push(row);
        }
        for (let i = 0; i < width+1; i++) {
             for (let j = 0; j < height+1; j++) {
                 let adjacent = "";
                 if(this.getTile(i,j) instanceof WaterTile){
                     for(let tile of this.getAdjacentTiles(i,j)){
                         if(tile instanceof WaterTile){
                             adjacent += "0";
                         }
                         else{
                             adjacent += "1";
                         }
                     }
                     this.board[i][j]= new WaterTile(i, j, adjacent);
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
        return new WaterTile(row, column, "00000000");
    }
    getAdjacentTiles(row,column){
        let list = [];
        for (let i = row-1;i<=row+1;i++){
            for(let j = column-1;j<=column+1;j++){
                if(i!=row || j!=column){
                    list.push(this.getTile(i,j));
                }
            }
        }
        return list
    }
}

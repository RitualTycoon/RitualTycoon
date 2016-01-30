"use strict";

var board = new Board(16,16);
var buildings = [
    new WaterTile(),
    new GrassTile(),
    new FieldTile()
];
var selected = [-1, -1];

function selectTile(row, column) {
    let tile = board.getTile(selected[0], selected[1]);
    if (tile){
        tile.select();
    }
    if (row == selected[0] && column == selected[1]) {
        selected = [-1, -1];
    } else {
        selected = [row, column];
        board.board[row][column].select();
    }
}

window.onload = function() {
    var grid = document.getElementById("grid");
    var table = document.createElement("table");
    for (var row in board.board) {
        var tr = document.createElement("tr");
        for (var column in board.board[row]) {
            var td = document.createElement("td");
            var tile = board.board[row][column];
            td.appendChild(tile.getImg());
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    grid.appendChild(table);
};

"use strict";

var board = new Array();
var buildings = [
    new WaterTile(),
    new GrassTile(),
    new FieldTile()
];
var selected = [-1, -1];

function selectTile(row, column) {
    let selectedRow = board[selected[0]];
    if (selectedRow) {
        let selectedColum = selectedRow[selected[1]];
        if (selectedColum) {
            selectedColum.select();
        }
    }
    if (row == selected[0] && column == selected[1]) {
        selected = [-1, -1];
    } else {
        selected = [row, column];
        board[row][column].select();
    }
}

window.onload = function() {
    for (var i = 0; i < 16; i++) {
        var row = new Array();
        for (var j = 0; j < 16; j++) {
            if (i + j < 5) {
                row.push(new WaterTile(i, j));
            } else {
                row.push(new GrassTile(i, j));
            }
        }
        board.push(row);
    }
    var grid = document.getElementById("grid");
    var table = document.createElement("table");
    for (var row in board) {
        var tr = document.createElement("tr");
        for (var column in board[row]) {
            var td = document.createElement("td");
            var tile = board[row][column];
            td.appendChild(tile.getImg());
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    grid.appendChild(table);
};

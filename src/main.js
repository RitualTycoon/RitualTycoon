var board = new Array();

window.onload = function() {
    for (var i = 0; i < 16; i++) {
        var row = new Array();
        for (var j = 0; j < 16; j++) {
            row.push(new WaterTile());
        }
        board.push(row);
    }
    var grid = document.getElementById("grid");
    table = document.createElement("table");
    for (var row in board) {
        var tr = document.createElement("tr");
        for (var column in board[row]) {
            td = document.createElement("td");
            img = document.createElement("img");
            img.setAttribute("src", "assets/" + board[row][column].getImg());
            td.appendChild(img);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    grid.appendChild(table);
};

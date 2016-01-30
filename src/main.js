"use strict";

let board = new Board(19,19);

let resources = {
    humansidle:  10,
    humansbusy:  0,
    water:    0,
    wheat:  0,
    meat:     0,
    bananas:  0,
    crops:    0,
    breads:   0,
    monkeys: 0,
    milk: 0,
    goats: 0,
};

let selected = [-1, -1];

let dragging = false;
let startDragging = false;
let startX;
let startY;
let cancelDragging = false;

document.getElementById("grid").addEventListener("mousemove", function(e) {
    if (startDragging &&
        Math.pow(startX - e.clientX, 2) + Math.pow(startY - e.clientY, 2) > 512) {
        startDragging = false;
        dragging = true;
    }
    if (cancelDragging) {
        startDragging = false;
        cancelDragging = false;
        dragging = false;
    }
    e.target.setAttribute("style", dragging ? "cursor: move" : "");
});

document.getElementById("grid").addEventListener("mouseup", function(e) {
    cancelDragging = true;
});

document.getElementById("grid").addEventListener("mousedown", function(e) {
    startDragging = true;
    startX = e.clientX;
    startY = e.clientY;
});

function selectTile(row, column) {
    if (dragging) {
        return;
    }
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

<<<<<<< HEAD
=======
function build(index) {
    let clickedTile = buildMenu.tiles[index];
    if (clickedTile.disabled) {
        return;
    }
    let newTile = clickedTile.clone();
    newTile.row = selected[0];
    newTile.column = selected[1];
    board.setTile(newTile);
    selected = [-1, -1];
    selectTile(newTile.row, newTile.column);
}

>>>>>>> 85fe123e8d36d11bfc422e7b53659506b17a323b
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

setInterval(function() {
    for (let row of board.board) {
        for (let tile of row) {
            let newResources = tile.step();
            for (let newResource in newResources) {
                resources[newResource] += newResources[newResource];
            }
        }
    }
    for (let resource in resources) {
        document.getElementById(resource).textContent = resources[resource];
    }
}, 1000);

document.addEventListener("keydown", function(e) {
    if (e.keyCode == 13) { // Enter
        toggleFullScreen();
    }
}, false);

function toggleFullScreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

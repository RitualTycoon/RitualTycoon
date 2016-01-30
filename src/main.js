"use strict";

let board = new Board(19,19);

let recources = {};

let selected = [-1, -1];

let dragging = false;
let startDragging = false;
let startX;
let startY;
let cancelDragging = false;

let buildMenu = new BuildMenu();

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
    if (!(tile instanceof WaterTile)) {
        tile.select();
    }
    if (row == selected[0] && column == selected[1]) {
        selected = [-1, -1];
    } else {
        selected = [row, column];
        let tile = board.getTile(row, column);
        tile.select();
        buildMenu.setUpgrades(tile.getUpgrades());
        //console.log(board.getTile(row, column).canUpgradeTo());
    }
}

window.onload = function() {
    let grid = document.getElementById("grid");
    let table = document.createElement("table");
    for (let row of board.board) {
        let tr = document.createElement("tr");
        for (let tile of row) {
            let td = document.createElement("td");
            td.appendChild(tile.getDOM());
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    grid.appendChild(table);
};

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

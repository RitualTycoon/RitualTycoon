"use strict";

let board = new Board(19,19);

let resources = {
    humansidle:  10,
    humansbusy:  0,
    water:    100,
    wheat:  0,
    flour:    0,
    beer: 0,
    breads:   0,
    goats: 0,
    meat:     0,
    stew: 0,
    bananas:  0,
    monkeys: 0,
    //milk: 0,
};

function foodToHuman(food, amount)
{
    if (food == "water")   return Math.ceil(amount / 200);
    if (food == "wheat")   return Math.ceil(amount / 100);
    if (food == "flour")   return Math.ceil(amount /  70);
    if (food == "beer")    return Math.ceil(amount /  50);
    if (food == "breads")  return Math.ceil(amount /  30);
    if (food == "goats")   return Math.ceil(amount /  10);
    if (food == "meat")    return Math.ceil(amount /   5);
    if (food == "stew")    return Math.ceil(amount /   1);
    if (food == "bananas") return Math.ceil(amount /   1);
    if (food == "monkeys") return Math.ceil(amount /   1);
}

let selected = [-1, -1];

let dragging = false;
let startDragging = false;
let startX;
let startY;
let cancelDragging = false;

let buildMenu = new BuildMenu();
let missionsMenu = new MissionsMenu();

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

function build(index) {
    let clickedTile = buildMenu.tiles[index];
    if (clickedTile.disabled) {
        return;
    }
    let newTile = clickedTile.clone();
    newTile.row = selected[0];
    newTile.column = selected[1];
    board.setTile(newTile);
	//Baukosten abziehen
	for (let key in newTile.build_costs)
	{
		resources[key] -=  newTile.build_costs[key]
	}
	//Select wieder zurück setzen
    selected = [-1, -1];
    selectTile(newTile.row, newTile.column);
}

window.onload = function() {
    let grid = document.getElementById("grid");
    let table = document.createElement("table");
    for (let row of board.board) {
        let tr = document.createElement("tr");
        for (let tile of row) {
            let td = document.createElement("td");
            td.appendChild(tile.getDOM());
            tile.parentDom = td;
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
            tile.counter -= 1;
            if (tile.counter < 0) tile.counter = tile.workingspeed;
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

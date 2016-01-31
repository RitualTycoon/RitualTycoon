"use strict";

let board = new Board(19,19);

let resources = {
    humansidle: 10,
    humansbusy: 0,
    water: 15,
    wheat: 0,
    flour: 0,
    beer: 0,
    bread: 20,
    goats: 0,
    meat: 0,
    stew: 0,
    bananas: 0,
    monkeys: 0,
    //milk: 0,
};

let foodValue = {
    water: 1,
    wheat: 2,
    flour: 3,
    beer: 4,
    bread: 6,
    goats: 20,
    meat: 40,
    stew: 200,
    bananas: 200,
    monkeys: 200,
};

function foodToHuman(food, amount)
{
    return Math.ceil(amount / foodValue[food]);
}

let selected = [-1, -1];

let dragging = false;
let startDragging = false;
let startX;
let startY;
let cancelDragging = false;
let lost = false;

let buildMenu = new BuildMenu();
let quests = new Quests();

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
    tile = board.getTile(row, column);
    if (row == selected[0] && column == selected[1]) {
        selected = [-1, -1];
        if(tile.getUpgrades().length == 0) tile.suspended = !tile.suspended
    } else {
        selected = [row, column];
        tile.select();
        let upgrades = tile.getUpgrades();
        buildMenu.setUpgrades(tile);
        if(upgrades.length == 0) tile.suspended = !tile.suspended;
        //console.log(board.getTile(row, column).canUpgradeTo());
    }
}

function build(index) {
    let clickedTile = buildMenu.tiles[index];
    if (clickedTile.disabled || clickedTile.checkBuildCost()) {
        return;
    }
    let newTile = clickedTile.clone();
    newTile.row = selected[0];
    newTile.column = selected[1];
    board.setTile(new ConstructionTile(newTile));
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
            let newResources = tile.suspended ?  tile.step() : {};
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
    quests.tick(1000);
    buildMenu.updateTooltips();
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

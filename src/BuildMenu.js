"use strict";

class BuildMenu {
    constructor() {
        this.element = document.getElementById("buildmenu");
        let grid = [
            [new HouseTile(), new ForestTile(), new GoatFarmTile(),],
            [new GrassTile(), new GrassTile(), new GrassTile(),],
            [new GrassTile(), new GrassTile(), new GrassTile(),],
        ];
        this.tiles = []
        this.domElements = [];
        let table = document.createElement("table");
        for (let row of grid) {
            let tr = document.createElement("tr");
            for (let tile of row) {
                let td = document.createElement("td");
                tile.disabled = true;
                let dom = tile.getDOM();
                this.tiles.push(tile);
                this.domElements.push(dom);
                td.appendChild(dom);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        this.element.appendChild(table);
    }

    setUpgrades(available) {
        for (let availableTile of available) {
            for (let tile of this.tiles) {
                tile.disabled = (availableTile.constructor !== tile.constructor);
            }
        }
    }
};

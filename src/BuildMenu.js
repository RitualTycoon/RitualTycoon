"use strict";

class BuildMenu {
    constructor() {
        this.element = document.getElementById("buildmenu");
        let grid = [
            [new GrassTile(), new HouseTile(), new GoatFarmTile(),],
            [new FieldTile(), new ButcherTile(), new DairyTile(),],
            [new GrassTile(), new GrassTile(), new GrassTile(),],
        ];
        this.tiles = []
        this.domElements = [];
        let table = document.createElement("table");
        for (let row of grid) {
            let tr = document.createElement("tr");
            for (let tile of row) {
                let td = document.createElement("td");
				//Tooltip inhalt
				let span = document.createElement("div");
				span.innerHTML += tile.tooltip_name;
				for (let key in tile.build_costs)
				{
					span.innerHTML += "<br/>" + tile.build_costs[key] + "x " + key;
				}
				span.className = "tooltip";
                tile.disabled = true;
                let dom = tile.getDOM();
                this.tiles.push(tile);
                this.domElements.push(dom);
                td.appendChild(dom);
				dom.appendChild(span);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        this.element.appendChild(table);
        for (let i in this.tiles) {
            this.tiles[i].link.setAttribute("onclick",
                "javascript:build(" + i + ");"
            );
            this.tiles[i].link.setAttribute("class",
                "totooltip"
            );
        }
    }

    setUpgrades(available) {
        for (let tile of this.tiles) {
            tile.disabled = true;
        }
        for (let availableTile of available) {
            for (let tile of this.tiles) {
                if (availableTile.constructor === tile.constructor) {
                    tile.disabled = tile.checkBuildCost();
                }
            }
        }
    }
};

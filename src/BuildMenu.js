"use strict";

class BuildMenu {
    constructor() {
        this.element = document.getElementById("buildmenu");
        this.grid = [
            [new HouseTile(), new HouseTile(), new HouseTile(),],
            [new HouseTile(), new HouseTile(), new HouseTile(),],
            [new HouseTile(), new HouseTile(), new HouseTile(),],
        ];
        let table = document.createElement("table");
        for (let row of this.grid) {
            let tr = document.createElement("tr");
            for (let tile of row) {
                let td = document.createElement("td");
                td.appendChild(tile.getDOM());
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        this.element.appendChild(table);
    }

    setUpgrades(available) {
        for (let tile of available) {
            this.element.appendChild(tile.imgElement);
        }
    }
};

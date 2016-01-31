"use strict";

class BuildMenu {
    constructor() {
        this.element = document.getElementById("buildmenu");
        let grid = [
            [new GrassTile(), new HouseTile(), new WellTile(),],
            [new FieldTile(), new WindmillTile(), new BakeryTile(),],
            [new BreweryTile(), new GoatFarmTile(), new ButcherTile(),],
            [ new InnTile(), new BananaFarmTile(), new MonkeyHouseTile(),],
        ];
        this.tiles = []
        this.domElements = [];
        let table = document.createElement("table");
        for (let row of grid) {
            let tr = document.createElement("tr");
            for (let tile of row) {
                let td = document.createElement("td");
                //Tooltip inhalt
                let div = document.createElement("div");
                div.innerText += tile.tooltip_name;
                for (let key in tile.build_costs)
                {
                    div.innerText += "\n" + tile.build_costs[key] + "x " + key;
                }
                div.className = "tooltip";
                tile.disabled = true;
                let dom = tile.getDOM();
                this.tiles.push(tile);
                this.domElements.push(dom);
                td.appendChild(dom);
                dom.appendChild(div);
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

    isNeighborProductionAvalible(tile)
    {
        let needs = [];
        for (let key in tile.production_needs)
        {
            if (tile.production_needs[key] < 0)
            {
                needs.push(key);
            }
        }
        let neighbors = [];
        neighbors.push( board.getTile(tile.row -1, tile.column -1) );
        neighbors.push( board.getTile(tile.row -1, tile.column ) );
        neighbors.push( board.getTile(tile.row -1, tile.column +1) );
        neighbors.push( board.getTile(tile.row , tile.column -1) );
        neighbors.push( board.getTile(tile.row , tile.column +1) );
        neighbors.push( board.getTile(tile.row +1, tile.column -1) );
        neighbors.push( board.getTile(tile.row +1, tile.column ) );
        neighbors.push( board.getTile(tile.row +1, tile.column +1) );

        for (let need in needs)
        {
            for (let neighbor in neighbors)
            {
                if (neighbors[neighbor].production_needs.indexOf(need) != -1)
                {
                    let ax = neighbors[neighbor].production_needs.indexOf(need);
                    neighbors[neighbor].production_needs.splice(ax, 1);
                }
            }
        }
        if (needs.length == 0)
        {
            return true;
        }
        else{
            return false;
        }
    }

    setUpgrades(clicked_tile) {
        let available = clicked_tile.getUpgrades()
        console.log(clicked_tile.row);
        for (let tile of this.tiles) {
            tile.disabled = true;
        }
        for (let availableTile of available) {
            for (let tile of this.tiles) {
                if (availableTile.constructor === tile.constructor) {
                    tile.disabled = tile.checkBuildCost() || (!this.isNeighborProductionAvalible(clicked_tile));
                    //console.log(tile.tooltip_name + tile.checkBuildCost() + !this.isNeighborProductionAvalible(clicked_tile) + " "+ (tile.checkBuildCost() || (!this.isNeighborProductionAvalible(tile))))
                }
            }
        }
    }
};

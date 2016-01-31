"use strict";

class BuildMenu {
    constructor() {
        this.element = document.getElementById("buildmenu");
        let grid = [
            [new GrassTile(), new HouseTile(), new WellTile(),],
            [new FieldTile(), new WindmillTile(), new BakeryTile(),],
            [new BreweryTile(), new GoatFarmTile(), new ButcherTile(),],
            [new InnTile(), new BananaFarmTile(), new MonkeyHouseTile(),],
        ];
        this.tiles = []
        this.domElements = [];
        this.tooltips = [];
        let table = document.createElement("table");
        for (let row of grid) {
            let tr = document.createElement("tr");
            for (let tile of row) {
                let td = document.createElement("td");
                //Tooltip inhalt
                let tooltip = document.createElement("div");
                tile.disabled = true;
                let dom = tile.getDOM();
                this.tiles.push(tile);
                this.domElements.push(dom);
                td.appendChild(dom);
                dom.appendChild(tooltip);
                this.tooltips.push({
                    dom: tooltip,
                    tile: tile,
                });
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

    updateTooltips(selected_tile) {
        for (let tooltip of this.tooltips) {
            let html = tooltip.tile.tooltip_name;
            if (tooltip.tile.adjacent_needs.length > 0) {
                let red = !this.isNeighborProductionAvalible(selected_tile, tooltip.tile.adjacent_needs);
                if (red) {
                    html += '<span style="color: #e21030">';
                }
                html += "<br/>needs to be next to ";
                let first = true;
                for (let need of tooltip.tile.adjacent_needs) {
                    if (!first) {
                        html += ", ";
                    }
                    first = false;
                    html += need.tooltip_name;
                }
                if (red) {
                    html += "</span>";
                }
                html += "<br/>";
            }
            for (let key in tooltip.tile.build_costs)
            {
                let build_costs = parseInt(tooltip.tile.build_costs[key]);
                if (resources[key] < build_costs) {
                    html += '<br/><span style="color: #e21030">' + key + " " + build_costs + '</span>';
                } else {
                    html += "<br/>" + key + " " + build_costs;
                }
            }
            tooltip.dom.innerHTML = html;
            tooltip.dom.className = "tooltip";
        }
    }

    isNeighborProductionAvalible(tile, needs) {
        let neighbors = [];
        neighbors.push( board.getTile(tile.row -1, tile.column -1) );
        neighbors.push( board.getTile(tile.row -1, tile.column ) );
        neighbors.push( board.getTile(tile.row -1, tile.column +1) );
        neighbors.push( board.getTile(tile.row , tile.column -1) );
        neighbors.push( board.getTile(tile.row , tile.column +1) );
        neighbors.push( board.getTile(tile.row +1, tile.column -1) );
        neighbors.push( board.getTile(tile.row +1, tile.column ) );
        neighbors.push( board.getTile(tile.row +1, tile.column +1) );

        for (let need of needs) {
            let fullfilled = false;
            for (let neighbor of neighbors) {
                if (neighbor.constructor === need.constructor) {
                    fullfilled = true;
                }
            }
            if (!fullfilled) {
                return false;
            }
        }
        return true;
    }

    setUpgrades(clicked_tile) {
        let available = clicked_tile.getUpgrades()
        // console.log(clicked_tile.row);
        for (let tile of this.tiles) {
            tile.disabled = true;
        }
        for (let availableTile of available) {
            for (let tile of this.tiles) {
                if (availableTile.constructor === tile.constructor) {
                    tile.disabled = tile.checkBuildCost() || !this.isNeighborProductionAvalible(clicked_tile, availableTile.adjacent_needs);
                    //console.log(tile.tooltip_name + tile.checkBuildCost() + !this.isNeighborProductionAvalible(clicked_tile) + " "+ (tile.checkBuildCost() || (!this.isNeighborProductionAvalible(tile))))
                }
            }
        }
    }
};

"use strict";

class Tile {
    constructor(image, row, column) {
        this.img = image;
        this.row = row;
        this.column = column;
        this.imgElement = document.createElement("img");
        this.imgElement.setAttribute("src", "assets/" + this.img);
        this.isSelected = false;
        this._disabled = false;
        this.link = document.createElement("a");
        this.parentDom = null;
		this.build_costs = [];
		this.tooltip_name = "TODO!!!";
        this.counter = 0;
        this.workingspeed = 40;
        this.production_needs = [];
    }

    get disabled() {
        return this._disabled;
    }

    set disabled(d) {
        this._disabled = d;
        this.imgElement.setAttribute("style", d ? "opacity: 0.7" : "");
    }

    getDOM() {
        if (this.link) {
            this.link.setAttribute("onclick",
                "javascript:selectTile(" + this.row + ", " + this.column + ");"
            );
            this.link.appendChild(this.imgElement);
            return this.link;
        }
        return this.imgElement;
    }

    select() {
        if (this.isSelected) {
            this.imgElement.setAttribute("class", "");
        } else {
            this.imgElement.setAttribute("class", "selected");
        }
        this.isSelected = !this.isSelected;
    }

    getUpgrades() {
        return ["none"];
    }

    // Gebäude Baukosten
	checkBuildCost()
	{
        for (let key in this.build_costs) {
            if (resources[key] < this.build_costs[key]) {
                return true;
            }
        }
        return false;
	}

    checkProductionCost()
    {
        for (let key in this.production_needs) {
            if (this.production_needs[key] > 0) continue;
            if (resources[key] < this.production_needs[key]) {
                return false;
            }
        }
        return true;
    }

    step() {
        this.counter -= 1;
        // Wenn produziert wird
        if (this.counter <= 0) {
            // resete counter
            this.counter = this.workingspeed;
            if (this.checkProductionCost()) {
                return this.production_needs;
            }
        }
        return {};
    }
}

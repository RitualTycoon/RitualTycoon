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
        this._suspended = false;
    }

    set suspended(s) {
        this._suspended = s;
        if(s) this.imgElement.classList.remove("suspended");
        else this.imgElement.classList.add("suspended");
    }

    get suspended(){
        return this._suspended;
    }

    get disabled() {
        return this._disabled;
    }

    set disabled(d) {
        this._disabled = d;
        this.imgElement.setAttribute("style", d ?
        "filter: grayscale(100%); -webkit-filter: grayscale(100%)" : "");
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
            this.imgElement.classList.remove("selected");
        } else {
            this.imgElement.classList.add("selected");
        }
        this.isSelected = !this.isSelected;
    }

    getUpgrades() {
        return [];
    }

    // Gebäude Baukosten
	checkBuildCost()
	{
        for (let key in this.build_costs) {
            if (resources[key] < this.build_costs[key]) {
                return true; //disabeld = true
            }
        }
        return false;
	}

    checkProductionCost()
    {
        for (let key in this.production_needs) {

            if (this.production_needs[key] > 0) continue;
            //Nach der Produktion darf der Bestand nicht negativ sein.
            if ((resources[key] - this.production_needs[key]) < 0) {
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

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
        this.imgElement.setAttribute("style", d ? "opacity: 0.7" : "");
    }

    step() {
        return {};
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
	checkBuildCost()
	{
		for (let key in this.build_costs)
		{
            let a = this.build_costs[key] < 0;
            let b = resources[key] > this.build_costs[key];
            let res = a || b;
			//if (this.build_costs[key] < 0 && resources[key] < this.build_costs[key])
            if (res)
            {
				return false;
			}
		}
		return true;
	}
}

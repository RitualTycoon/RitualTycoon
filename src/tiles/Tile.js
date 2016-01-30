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
            this.imgElement.setAttribute("class", "");
        } else {
            this.imgElement.setAttribute("class", "selected");
        }
        this.isSelected = !this.isSelected;
    }

    getUpgrades() {
        return ["none"];
    }
	checkBuildCost()
	{
		for (let key in this.build_costs)
		{
			if (resources[key] < this.build_costs[key])
			{
				return true;
			}
		}
		return false;
	}
}

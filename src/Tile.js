"use strict";

class Tile {
    constructor(image, row, column) {
        this.img = image;
        this.row = row;
        this.column = column;
        this.imgElement = null;
        this.isSelected = false;
    }

    getImg() {
        this.imgElement = document.createElement("img");
        this.imgElement.setAttribute("src", "assets/" + this.img);
        if (this.clickable) {
            var link = document.createElement("a");
            link.setAttribute("onclick",
                "javascript:selectTile(" + this.row + ", " + this.column + ");"
            );
            link.appendChild(this.imgElement);
            return link;
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
}

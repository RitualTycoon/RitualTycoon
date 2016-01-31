"use strict";
class Quests {
    constructor() {
        this._difficulty = 5;
        this._quest = {water: 5};
        this._questValue = 5;
        this._element = document.getElementById("missions");
        this.newQuest();
    }

    getDom() {
        let div = document.createElement("div");
        let table = document.createElement("table");
        div.id = "quests";

        //Add Eventhandler
        let that = this;
        table.addEventListener("click", function () {
            for (var key in that._quest) {
                if (resources[key] < that._quest[key]){
                    return;
                }
            }
            for (var key in that._quest) {
                resources[key] = resources[key] - that._quest[key];
            }
            that.increaseDifficulty(5);
            that.newQuest();
        });

        for (let text in this._quest) {
            if (this._quest[text] > 0) {
                //Table
                let tr = document.createElement("tr");
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                table.appendChild(tr);
                tr.appendChild(td1);
                tr.appendChild(td2);

                //Opferbutton und Menschenopferbutton
                let inner_div = document.createElement("div");
                inner_div.id = "button";
                inner_div.innerText = this._quest[text] + "x " + text;
                if(this._quest[text] > resources[text])
                    tr.setAttribute('style', 'opacity: 0.3;');
                let img = document.createElement("img");
                img.id = "security_humans";

                img.addEventListener("click", function () {
                    //TODO: Menschen opfern
                    //if (resources['humansidle'] < foodValue[text] )
                    //    return;
                    //resources[text] -= foodValue[text];
                    //let i2=img.parentNode;
                    //i2.remove();
                });

                //Buttons in die Tabelle einhengen
                td1.appendChild(inner_div);
                td2.appendChild(img);
            }
        }

        return table;
    }

    increaseDifficulty(i) {
        this._difficulty += i;
    }

    newQuest() {
        var randomProperty = function (obj) {
            var keys = Object.keys(obj);
            return keys[keys.length * Math.random() << 0];
        };

        while (this._questValue < this._difficulty) {
            let demand = randomProperty(foodValue);
            let demandValue = foodValue[demand];
            if ((this._questValue + demandValue) > this._difficulty) break;
            this._questValue += demandValue;
            this._quest[demand] = this._quest[demand] ? 1 + this._quest[demand] : 1;
        }
    }

    tick(dt){
        //UI updaten
        while (this._element.firstChild) {
            this._element.removeChild(this._element.firstChild);
        }
        this._element.appendChild(this.getDom());
    }
}

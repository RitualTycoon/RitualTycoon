"use strict";
class Quests {
    constructor() {
        this._difficulty = 5;
        this._quest = {water: this._difficulty};
        this._questValue = this._difficulty;
        this._timerMax = 60;
        this._timer = this._timerMax;
        this._element = document.getElementById("missions");
        this.newQuest();
    }

    getDom() {
        let table = document.createElement("table");

        //Add Eventhandler
        let that = this;

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

                td1.addEventListener("click", function () {
                    that.ritual();
                });

                img.addEventListener("click", function () {
                    //TODO: Menschen opfern
                    //if (resources['humansidle'] < foodValue[text] )
                    //    return;
                    //that._quest[text] -= 1;
                    //that._questValue -= 1;
                    //resources['humansidle'] -= 1;
                });

                //Buttons in die Tabelle einhengen
                td1.appendChild(inner_div);
                td2.appendChild(img);
            }
        }

        let progressBar = document.createElement('progress');
        progressBar.setAttribute('max', this._timerMax);
        progressBar.setAttribute('value', this._timerMax - this._timer);
        let tr = document.createElement("tr");
        table.appendChild(tr);
        tr.appendChild(progressBar);

        return table;
    }

    increaseDifficulty(i) {
        this._difficulty += i;
    }

    ritual(){
        for (var key in this._quest) {
            if (resources[key] < this._quest[key]){
                return false;
            }
        }
        for (var key in this._quest) {
            resources[key] = resources[key] - this._quest[key];
        }
        this.increaseDifficulty(5);
        this.newQuest();
        return true;
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
        this._timer = this._timerMax;
        this.updateUI();
    }

    updateUI()
    {
        while (this._element.firstChild) {
            this._element.removeChild(this._element.firstChild);
        }
        this._element.appendChild(this.getDom());
    }

    tick(dt){
        this._timer -=1;
        this.updateUI();
        if(this._timer <= 0 && !this.ritual()) {
            alert('Du hast verloren!');
        }
    }
}

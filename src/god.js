"use strict";
class Quests {
    constructor() {
        this._difficulty = 10;
        this._quest = { water: this._difficulty };
        this._questValue = this._difficulty;
        this._timerMax = 5;
        this._timer = this._timerMax;
        this._element = document.getElementById("missions");
        this._sacrificed = {};
        this.newQuest();
    }

    getDom() {
        let table = document.createElement("table");

        // Add Eventhandler
        let that = this;

        let tr1 = document.createElement("tr");
        let td1 = document.createElement("td");
        table.appendChild(tr1);
        tr1.appendChild(td1);
        td1.addEventListener("click", function () {
            that.ritual();
        });
        for (let text in this._quest) {
            if (this._quest[text] > 0) {
                // Opferbutton
                let inner_div = document.createElement("div");
                console.log("asdf");
                inner_div.id = "button";
                inner_div.innerText += this._quest[text] + "x " + text;
                if (this._quest[text] > resources[text]) {
                    inner_div.setAttribute('style', 'color: #e21030;');
                }
                td1.appendChild(inner_div);
            }
        }

        let progressBar = document.createElement('progress');
        progressBar.setAttribute('max', this._timerMax);
        progressBar.setAttribute('value', this._timerMax - this._timer);
        let tr2 = document.createElement("tr");
        table.appendChild(tr2);
        tr2.appendChild(progressBar);

        return table;
    }

    increaseDifficulty(i) {
        this._difficulty += i;
    }

    ritual(sacrificeHumans){
        if(sacrificeHumans == undefined) sacrificeHumans = false;
        for (var key in this._quest) {
            if (resources[key] < this._quest[key]){
                if(sacrificeHumans){
                    let humanValue = Math.ceil((foodValue[key]/100) * this._quest[key]);
                    if(resources['humansidle'] >= humanValue){
                        console.log('Sacrificing '+humanValue+' humans')
                        resources['humansidle'] = resources['humansidle'] - humanValue;
                        this._sacrificed['humans'] = this._sacrificed['humans'] ? this._sacrificed['humans'] + humanValue : humanValue;
                        this.increaseDifficulty(this._difficulty*0.01*this._quest[key]);
                        continue;
                    }
                }
                return false;
            }
            resources[key] = resources[key] - this._quest[key];
            this._sacrificed[key] = this._sacrificed[key] ? this._sacrificed[key] + this._quest[key] : this._quest[key];
        }
        this.increaseDifficulty(5+this._difficulty*0.05);
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
            // console.log('god demands: '+demand + ' value: '+demandValue)
            //if ((this._questValue + demandValue) > this._difficulty) break;
            if(demandValue*10 > this._questValue) continue;
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
        if(this._timer <= 0 && !this.ritual(true) && !lost) {
            let score = 0;
            for (var key in this._sacrificed) {
                if(key == 'humans') continue;
                score += foodValue(key)*this._sacrificed[key];
            }
            alert('You Loose!\nFinal Score: '+score+'\nSacrifices:\n' +JSON.stringify(this._sacrificed));
            lost = true;
        }
    }
}

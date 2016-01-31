"use strict";

function getQuest()
{
	let quest = {
		humansidle:  0,
    humansbusy:  0,
    water:    0,
    wheat:  0,
    meat:     0,
    bananas:  0,
    flour:    0,
    breads:   0,
    monkeys: 0,
    milk: 0,
    goats: 0,
    beer: 0,
    stew: 0,
};

	//Die ein drittel der Karotten
	if (resources['water'] > 50)
	{
		quest['water'] += Math.round(resources['water'] / 3.0);
	}

	//Kosten steigen mit der Befölkerungszahl
	let humans = resources['humansidle'] + resources['humansbusy'];
	switch (true) {
		case (humans < 10):
			quest['water'] += 5;
		case (humans < 20):
			quest['water'] += 10;
			quest['meat'] += 5;
		case (humans < 30):
		case (humans < 100):
			quest['humansidle'] += 1;
	}
	let div = document.createElement("div");
	let table = document.createElement("table");
	div.id = "quests";
	for (let text in quest)
	{
		if (quest[text] > 0)
		{
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
			inner_div.innerText = quest[text] + "x " + text;
			let img = document.createElement("img");
			img.id = "security_humans";

			//Add Eventhandler
			inner_div.addEventListener("click", function()
												{
													if (resources[text] < quest[text] )
														return;
													resources[text] -= quest[text];
													let i2=inner_div.closest('tr');
													i2.remove();
												});
			img.addEventListener("click", function()
												{
													if (resources['humansidle'] < quest[text] )
														return;
													resources[text] -= quest[text];
													let i2=img.closest('tr');
													i2.remove();
												});

			//Buttons in die Tabelle einhengen
			td1.appendChild(inner_div);
			td2.appendChild(img);
	}
	}

	return table;
}


class MissionsMenu
{
		constructor()
		{
				this.element = document.getElementById("missions");
				this.element.appendChild(getQuest());
		}
}

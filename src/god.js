"use strict";

function getQuest()
{
	let quest = {
			humans: 0,
			water: 0,
			carrots: 0,
			fish: 0,
			bananas:0,
			crops:0,
			breads:0,
			tomatoes:0,
			};

	//Die ein drittel der Karotten
	if (resources['carrots'] > 50)
	{
		quest['carrots'] += resources['carrots'] / 3.0;
	}

	//Kosten steigen mit der Befölkerungszahl
	let humans = resources['humansidle'] + resources['humansbusy'];
	switch (true) {
		case (humans < 10):
			quest['carrots'] += 5;
		case (humans < 20):
			quest['carrots'] += 10;
			quest['fish'] += 5;
		case (humans < 30):
		case (humans < 100):
			quest['humans'] += 1;
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

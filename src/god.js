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
	let quest_text = "";
	for (let text in quest)
	{
		if (quest[text] > 0)
		quest_text += "\n" + quest[text] + "x " + text;
	}

	return quest_text;
}


class MissionsMenu
{
		constructor()
		{
				this.element = document.getElementById("missions");
				let div = document.createElement("div");
				div.innerText += getQuest();
				this.element.appendChild(div);
		}
}

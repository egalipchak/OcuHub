function oneTimeSetup(){
	localStorage.setItem("menu", JSON.stringify(menu));
	localStorage.setItem("index", JSON.stringify(index));
}

oneTimeSetup();
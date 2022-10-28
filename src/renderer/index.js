/* Import ipcRenderer */
const { ipcRenderer } = require ("electron");

/* Import the External Modules */
const anime = require ("animejs");

document.getElementById ("windowCloseButton").addEventListener ("click", () => ipcRenderer.send("close-window"));

let position = { lat: 0, lon: 0 };

window.onload = async () => {
	let geo = await fetch ("http://api.openweathermap.org/geo/1.0/direct?q=Tokyo,Japan&appid=3c48f42513dfd9f90a79ea4d2129d335");
	let geoJ = await geo.json();

	let responce = await fetch ("https://api.openweathermap.org/data/3.0/onecall?lat=35.690&lon=139.692&appid=MYAPPID");
	let jsonData = await responce.json();


	position["lat"] = geoJ[0]["lat"];
	position["lon"] = geoJ[0]["lon"];
	document.getElementById ("locationText").innerText = geoJ[0]["name"];


	if (jsonData["current"]["weather"][0]["main"] == 800)
		document.getElementById ("currentWeather").src = "../resources/icons/weather/Sunny";

	document.getElementById ("currentTemperature").innerText = Math.round (jsonData["current"]["temp"] - 273.15);
	document.getElementById ("minTemperature").innerText = Math.round (jsonData["daily"][0]["temp"]["min"] - 273.15);
	document.getElementById ("maxTemperature").innerText = Math.round (jsonData["daily"][0]["temp"]["max"] - 273.15);

	document.getElementById ("currentHumidity").children[1].innerText = jsonData["current"]["humidity"] + "%";
	document.getElementById ("currentPressure").children[1].innerText = jsonData["current"]["pressure"] + "hPa";
	document.getElementById ("currentWindSpeed").children[1].innerText = jsonData["current"]["wind_speed"] + "m/s";
	document.getElementById ("currentClouds").children[1].innerText = jsonData["current"]["clouds"] + "%";
}

let windowPosition = { x: 0, y: 0 };

ipcRenderer.on ("start-window-animation", () => {
	anime ({
		targets: windowPosition,
		x: [1910, 1510],
		y: [40, 40],
		duration: 600,
		round: 1,
		easing: "easeOutCubic",
		update: () => ipcRenderer.send ("move-window", windowPosition)
	});
});

function floorIndex (value, _index) {
	return Math.floor (value * Math.pow(10, _index)) / Math.pow(10, _index);
}

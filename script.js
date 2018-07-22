const malaysia = document.getElementById('malaysia');
const bbc = document.getElementById('bbc');
const tube = document.getElementById('tube');
const rf = document.getElementById('rf');
const whit = document.getElementById('whit');
const current_weather = document.getElementById('current-weather');
const icon_currently = document.getElementById('icon-currently');
const current_temp = document.getElementById('current-temp');
const minutely_summary = document.getElementById('minutely-summary');
const hourly_summary = document.getElementById('hourly-summary');
const today_summary = document.getElementById('today-summary');
const coming_week = ['one-day-after', 'two-day-after', 'three-day-after', 
					'four-day-after', 'five-day-after', 'six-day-after', 'seven-day-after'];
const silverdale = document.getElementById('silverdale');

window.onload = function() {
	getMalaysia(); getBBC(); getTube(); getrf(); getwhit(); getweather(); getBus(); getSilverdale();
}


// Get top news from Malaysia
function getMalaysia() {
	let = 1;
	console.log('getMalaysia running');
	let url = 'https://newsapi.org/v2/top-headlines?country=my&apiKey=0b32f80b79b04fc796d5fd8bba132fcf';
	fetch(url, { method: 'get' })
		.then(resp => resp.json())
		.then(data => {
			for (let i = 0; i < data.articles.length; i++) {
				const text = document.createElement('P');
				text.innerHTML = data.articles[i].title + '\n';
				if (malaysia.childNodes[i]) {
					malaysia.childNodes[i].innerHTML = data.articles[i].title + '\n';
				} else {
					malaysia.appendChild(text);
				};
			};
			setTimeout(getMalaysia, 90000);
		})
		.catch(function(err) {
			console.error(err);
		});
}

// Get top news from BBC
function getBBC() {
	let = 1;
	console.log('getBBC running');
	let url = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=0b32f80b79b04fc796d5fd8bba132fcf';
	fetch(url, { method: 'get' })
		.then(resp => resp.json())
		.then(data => {
			for (let i = 0; i < data.articles.length; i++) {
				const text = document.createElement('P');
				text.innerHTML = data.articles[i].title + '\n';
				if (bbc.childNodes[i]) {
					bbc.childNodes[i].innerHTML = data.articles[i].title + '\n';
				} else {
					bbc.appendChild(text);
				};
			};
			setTimeout(getBBC, 90000);
		})
		.catch(function(err) {
			console.error(err);
		});
}

// Get Tube line statuses
function getTube() {
	let = 1;
	console.log('getTube running');
	let url = 'https://api.tfl.gov.uk/line/mode/tube/status?app_id=0004335c&app_key=4bd90a297d190a588facaa6db5e1be16';
	fetch(url, { method: 'get' })
		.then(resp => resp.json())
		.then(data => {
			for (let i = 0; i < data.length; i++) {
				const text = document.createElement('P');
				text.innerHTML = data[i].name + ' - ' + data[i].lineStatuses[0].statusSeverityDescription + '\n';
				if (tube.childNodes[i]) {
					tube.childNodes[i].innerHTML = data[i].name + ' - ' + data[i].lineStatuses[0].statusSeverityDescription + '\n';
				} else {
					tube.appendChild(text);
				};
			};
			setTimeout(getTube, 300000);
		})
		.catch(function(err) {
			console.error(err);
		})
}

// Get bus status
function getBus() {
	if (bus24.hasChildNodes()) {
		for (let i = 0; i < bus24.childNodes.length; i++) {
			bus24.removeChild(bus24.childNodes[i]);
		}
	} 
	if (bus134.hasChildNodes()) {
		for (let i = 0; i < bus134.childNodes.length; i++) {
			bus134.removeChild(bus134.childNodes[i]);
		}
	}
	console.log('getBus running');
	let url = 'https://api.tfl.gov.uk/line/mode/bus/status?app_id=0004335c&app_key=4bd90a297d190a588facaa6db5e1be16';
	fetch(url, { method: 'get' })
		.then(resp => resp.json())
		.then(data => {
			for (let i = 0; i < data.length; i++) {
				const text = document.createElement('P');
				if (data[i].name == '24') {
					text.innerHTML = data[i].name + ' - ' + data[i].lineStatuses[0].statusSeverityDescription + '\n';
					bus24.appendChild(text);
				} else if (data[i].name =='134') {
					text.innerHTML = data[i].name + ' - ' + data[i].lineStatuses[0].statusSeverityDescription + '\n';
					bus134.appendChild(text);
				}
			};
			setTimeout(getBus, 300000);
		})
		.catch(function(err) {
			console.error(err);
		})
}

// Get bus arrivals at Silverdale
function getSilverdale() {
	if (silverdale.hasChildNodes()) {
		console.log(silverdale.childNodes.length);
		silverdale.innerHTML = '';
	}
	console.log('getSilverdale running');
	let url = 'https://api.tfl.gov.uk/StopPoint/490012158N/Arrivals?mode=bus&line=24&app_id=0004335c&app_key=4bd90a297d190a588facaa6db5e1be16';
	fetch(url, { method: 'get' })
		.then(resp => resp.json())
		.then(data => {
			for (let i = 0; i < data.length; i++) {
				if (data[i].lineId == '24' || data[i].lineId == '134') {
					console.log(data[i].timeToStation);
					const text = document.createElement('P');
					text.innerHTML = data[i].lineId + ' - ' + (Math.round(data[i].timeToStation / 60)) + 'mins';
					silverdale.appendChild(text);
					console.log('appended');
				}	
			};
			setTimeout(getSilverdale, 300000);
		})
		.catch(function(err) {
			console.error(err);
		})
}

// Get travel time to Royal Free
function getrf() {
	if (rf.hasChildNodes()) {
		for (let i = 0; i < rf.childNodes.length; i++) {
			rf.removeChild(rf.childNodes[i]);
		}
	}
	console.log('getrf running');
	let url = 'http://127.0.0.1:5000/https://developer.citymapper.com/api/1/traveltime/?key=5b7ca14b71ac0dfc3637016e3ee68696&startcoord=51.5298489,-0.1422724&endcoord=51.5531636,-0.1670544';
	fetch(url, { method: 'get' })
		.then(resp => resp.json())
		.then(data => {
			const text = document.createElement('P');
			text.innerHTML = data.travel_time_minutes + ' mins to Royal Free';
			if (rf.hasChildNodes()) {
				rf.childNodes.innerHTML = data.travel_time_minutes + ' mins to Royal Free';
			} else {
				rf.appendChild(text);
			};
			setTimeout(getrf, 1800000);
		})
		.catch(function(err) {
			console.error(err);
		});
}

// Get travel time to Whittington
function getwhit() {
	console.log('getwhit running');
	let url = 'http://127.0.0.1:5000/https://developer.citymapper.com/api/1/traveltime/?key=5b7ca14b71ac0dfc3637016e3ee68696&startcoord=51.5298489,-0.1422724&endcoord=51.5670348,-0.140959';
	fetch(url, { method: 'get' })
		.then(resp => resp.json())
		.then(data => {
			const text = document.createElement('P');
			text.innerHTML = data.travel_time_minutes + ' mins to Whittington';
			if (whit.hasChildNodes()) {
				whit.childNodes.innerHTML = data.travel_time_minutes + ' mins to Whittington';
			} else {
				whit.appendChild(text);
			};
			setTimeout(getwhit, 1800000);
		})
		.catch(function(err) {
			console.error(err);
		});
}

// Get weather
function getweather() {
	console.log('getwheather running');
	let url = 'http://127.0.0.1:5000/https://api.darksky.net/forecast/06c00a6058152923d68690a12637a9d4/51.5298489,-0.1422724?units=si';
	fetch(url, { method: 'get' })
		.then(resp => resp.json())
		.then(data => {
			var iconRequest = data.currently.icon;
			console.log(iconRequest);
			var icons = new Skycons({'color': '#000000'});
			var iconList = [
				"clear-day",
				"clear-night",
				"partly-cloudy-day",
				"partly-cloudy-night",
				"cloudy",
				"rain",
				"sleet",
				"snow",
				"wind",
				"fog"
			];
			for (let i = 0; i < iconList.length; i++) {
				if (iconRequest == iconList[i]) {
					icons.set(icon_currently, iconList[i]);
				}
			}
			icons.play();
			current_weather.innerHTML = data.currently.summary + ' now.';
			current_temp.innerHTML = data.currently.temperature;
			minutely_summary.innerHTML = data.minutely.summary;
			hourly_summary.innerHTML = data.hourly.summary;
			today_summary.innerHTML = data.daily.summary;
			// Populate days of the coming week
			for (let i = 0; i < 7; i++) {
				var time = new Date(data.daily.data[i+1].time*1000).toString().split(' ');
				var day = time.slice(0,4);
				day = day[0] + ' ' + day[1] + ' ' + day[2];
				document.getElementById(coming_week[i]).children[0].innerHTML = day;
				document.getElementById(coming_week[i]).children[1].children[1].innerHTML = data.daily.data[i+1].temperatureHigh;
				document.getElementById(coming_week[i]).children[2].children[1].innerHTML = data.daily.data[i+1].temperatureLow;
			}


			setTimeout(getweather, 90000);
		})
		.catch(function(err) {
			console.error(err);
		});
}


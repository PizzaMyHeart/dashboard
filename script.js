div_items = {
'news_malaysia' : ['https://newsapi.org/v2/top-headlines?country=my&apiKey=0b32f80b79b04fc796d5fd8bba132fcf', ],
'news_bbc' : ['https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=0b32f80b79b04fc796d5fd8bba132fcf', ],
'tfl_tube' : ['https://api.tfl.gov.uk/line/mode/tube/status', ],
'citymapper_rf' : ['https://developer.citymapper.com/api/1/traveltime/?key=c44ed548dd5125fb26aa338a801d56f3&startcoord=51.5298489,-0.1422724&endcoord=51.5531636,-0.1670544', ],
'citymapper_whit' : ['https://developer.citymapper.com/api/1/traveltime/?key=c44ed548dd5125fb26aa338a801d56f3&startcoord=51.5298489,-0.1422724&endcoord=51.5670348,-0.140959', ]
}


const malaysia = document.getElementById('malaysia');
const bbc = document.getElementById('bbc');
const tfl = document.getElementById('tfl');
const rf = document.getElementById('rf');
const whit = document.getElementById('whit');
const current_weather = document.getElementById('current-weather');

window.onload = function() {
	getMalaysia(); getBBC(); getTfL(); getrf(); getwhit(); getweather();
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
function getTfL() {
	let = 1;
	console.log('getTfL running');
	let url = 'https://api.tfl.gov.uk/line/mode/tube/status';
	fetch(url, { method: 'get' })
		.then(resp => resp.json())
		.then(data => {
			for (let i = 0; i < data.length; i++) {
				const text = document.createElement('P');
				text.innerHTML = data[i].name + ' - ' + data[i].lineStatuses[0].statusSeverityDescription + '\n';
				if (tfl.childNodes[i]) {
					tfl.childNodes[i].innerHTML = data[i].name + ' - ' + data[i].lineStatuses[0].statusSeverityDescription + '\n';
				} else {
					tfl.appendChild(text);
				};
			};
			setTimeout(getTfL, 300000);
		})
		.catch(function(err) {
			console.error(err);
		})
}

// Get travel time to Royal Free
function getrf() {
	let = 1;
	console.log('getrf running');
	let url = 'https://cors-anywhere.herokuapp.com/https://developer.citymapper.com/api/1/traveltime/?key=c44ed548dd5125fb26aa338a801d56f3&startcoord=51.5298489,-0.1422724&endcoord=51.5531636,-0.1670544';
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
	let = 1;
	console.log('getwhit running');
	let url = 'https://cors-anywhere.herokuapp.com/https://developer.citymapper.com/api/1/traveltime/?key=c44ed548dd5125fb26aa338a801d56f3&startcoord=51.5298489,-0.1422724&endcoord=51.5670348,-0.140959';
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
			setTimeout(getrf, 1800000);
		})
		.catch(function(err) {
			console.error(err);
		});
}

// Get weather
function getweather() {
	let = 1;
	console.log('getwheather running');
	let url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/06c00a6058152923d68690a12637a9d4/51.5298489,-0.1422724?units=si';
	fetch(url, { method: 'get' })
		.then(resp => resp.json())
		.then(data => {
			const text = document.createElement('P');
			text.innerHTML = data.currently.summary;
			if (current_weather.hasChildNodes()) {
				current_weather.childNodes.innerHTML = data.currently.summary;
			} else {
				current_weather.appendChild(text);
			};
			setTimeout(getweather, 90000);
		})
		.catch(function(err) {
			console.error(err);
		});
}

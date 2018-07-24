const tube = document.getElementById('tube');
const rf = document.getElementById('rf');
const whit = document.getElementById('whit');
const current_weather = document.getElementById('current-weather');
const icon_currently = document.getElementById('icon-currently');
const icon_today = document.getElementById('icon-today');
const current_temp = document.getElementById('current-temp');
const minutely_summary = document.getElementById('minutely-summary');
const today_summary = document.getElementById('today-summary');
const week_forecast = document.getElementById('week-forecast');
const coming_week = ['one-day-after', 'two-day-after', 'three-day-after', 
					'four-day-after', 'five-day-after', 'six-day-after', 'seven-day-after'];
const silverdale = document.getElementById('silverdale');
const news_container = document.getElementById('news-container');
const current_date = document.getElementById('current-date');
const current_time = document.getElementById('current-time');
const northern = document.getElementById('northern');

window.onload = function() {
	getNews(); getTube(); getrf(); getwhit(); getweather(); getBus(); getSilverdale();
	getTime();
}

// Get top headlines 
function getNews() {
	console.log('getMalaysia running');
	if (news_container.hasChildNodes()) {
		news_container.innerHTML = '';
	}
	let url = 'https://newsapi.org/v2/top-headlines?sources=bbc-news,associated-press,reuters,al-jazeera-english,the-economist&apiKey=0b32f80b79b04fc796d5fd8bba132fcf';
	fetch(url, { method: 'get' })
		.then(resp => resp.json())
		.then(data => {
			for (let i = 0; i < data.articles.length; i++) {
				let news = document.createElement('div');
				news.innerHTML = data.articles[i].title;
				news.classList.add('ticker__item');
				news_container.appendChild(news);
			};
			setTimeout(getNews, 90000);
		})
		.catch(function(err) {
			console.error(err);
		});
}



// Get Tube line statuses
function getTube() {
	console.log('getTube running');
	let url = 'https://api.tfl.gov.uk/line/mode/tube/status?app_id=0004335c&app_key=4bd90a297d190a588facaa6db5e1be16';
	fetch(url, { method: 'get' })
		.then(resp => resp.json())
		.then(data => {
			for (let i = 0; i < data.length; i++) {
				const text = document.createElement('div');
				text.innerHTML = data[i].name + ' - ' + data[i].lineStatuses[0].statusSeverityDescription;
				if (tube.childNodes[i]) {
					tube.childNodes[i].innerHTML = data[i].name + ' - ' + data[i].lineStatuses[0].statusSeverityDescription;
					tube.childNodes[i].classList.add('slide');
				} else {
					tube.appendChild(text);
					tube.childNodes[i].classList.add('slide');
				};
				if (data[i].name == 'Northern') {
					northern.innerHTML = data[i].name + ' - ' + data[i].lineStatuses[0].statusSeverityDescription;
				}
			};
			var current = 0,
    			slides = document.getElementsByClassName('slide');
			setInterval(function() {
	  			for (let i = 0; i < slides.length; i++) {
	    			slides[i].style.opacity = 0;
	  			}
	  			current = (current != slides.length - 1) ? current + 1 : 0;
	  			slides[current].style.opacity = 1;
			}, 3000);
			setTimeout(getTube, 300000);
		})
		.catch(function(err) {
			console.error(err);
		})
}

// Get bus status
function getBus() {
	bus24.classList.add('hidden');
	bus134.classList.add('hidden');
	console.log('getBus running');
	let url = 'https://api.tfl.gov.uk/line/mode/bus/status?app_id=0004335c&app_key=4bd90a297d190a588facaa6db5e1be16';
	fetch(url, { method: 'get' })
		.then(resp => resp.json())
		.then(data => {
			for (let i = 0; i < data.length; i++) {
				if (data[i].name == '24') {
					var text = data[i].name + ' - ' + data[i].lineStatuses[0].statusSeverityDescription;
					bus24.innerHTML = text;
					bus24.classList.remove('hidden');
				} else if (data[i].name =='134') {
					var text = data[i].name + ' - ' + data[i].lineStatuses[0].statusSeverityDescription;
					bus134.innerHTML = text;
					bus134.classList.remove('hidden');
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
					const text = document.createElement('P');
					text.innerHTML = data[i].lineId + ' - ' + (Math.round(data[i].timeToStation / 60)) + ' mins';
					silverdale.appendChild(text);
				}	
			};
			setTimeout(getSilverdale, 1000);
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
			var iconToday = data.hourly.icon;
			var icons = new Skycons({'color': 'black'});
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
				if (iconToday == iconList[i]) {
					icons.set(icon_today, iconList[i]);
				}
			}
			
			current_weather.innerHTML = data.currently.summary + ' now.';
			current_temp.innerHTML = data.currently.temperature.toFixed(1) + '&#8451;';
			minutely_summary.innerHTML = data.minutely.summary;
			today_summary.innerHTML = data.hourly.summary;
			week_forecast.innerHTML = 'This week\'s forecast: ' + data.daily.summary;
			// Populate days of the coming week
			for (let i = 0; i < 7; i++) {
				var time = new Date(data.daily.data[i+1].time*1000).toString().split(' ');
				var day = time.slice(0,4);
				day = day[0] + ' ' + day[1] + ' ' + day[2];
				document.getElementById(coming_week[i]).children[0].innerHTML = day;
				document.getElementById(coming_week[i]).children[2].children[1].innerHTML = data.daily.data[i+1].temperatureHigh.toFixed(1) + '&#8451;';
				document.getElementById(coming_week[i]).children[3].children[1].innerHTML = data.daily.data[i+1].temperatureLow.toFixed(1) + '&#8451;';
				var icon_day = document.getElementById(coming_week[i]).children[1];
				var iconDay = data.daily.data[i+1].icon;
				for (let i = 0; i < iconList.length; i++) {
					if (iconDay == iconList[i]) {
						icons.set(icon_day, iconList[i]);
					}
				}
			}

			icons.play();
			setTimeout(getweather, 90000);
		})
		.catch(function(err) {
			console.error(err);
		});
}


// Show current time
function getTime(){
	var time = new Date().toString().split(' ');
	time = time.slice(0,5);
	current_date.innerHTML = time[0] + ' ' + time[1] + ' ' + time[2] + ' ' + time[3];
	current_time.innerHTML = time[4];
	setTimeout(getTime, 1000);
}

/*
// Get top news from Malaysia
function getMalaysia() {
	console.log('getMalaysia running');
	if (malaysia.hasChildNodes()) {
		malaysia.innerHTML = '';
	}
	let url = 'https://newsapi.org/v2/top-headlines?country=my&apiKey=0b32f80b79b04fc796d5fd8bba132fcf';
	fetch(url, { method: 'get' })
		.then(resp => resp.json())
		.then(data => {
			for (let i = 0; i < data.articles.length; i++) {
				let news = document.createElement('div');
				console.log(news.innerHTML);
				news.innerHTML = data.articles[i].title;
				news.classList.add('ticker__item');
				malaysia.appendChild(news);
			};
			setTimeout(getMalaysia, 90000);
		})
		.catch(function(err) {
			console.error(err);
		});
}
*/

/*
// Get top news from BBC
function getBBC() {
	if (bbc.hasChildNodes()) {
		bbc.innerHTML = '';
	}
	console.log('getBBC running');
	let url = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=0b32f80b79b04fc796d5fd8bba132fcf';
	fetch(url, { method: 'get' })
		.then(resp => resp.json())
		.then(data => {
			for (let i = 0; i < data.articles.length; i++) {
				let news = document.createElement('div');
				console.log(news.innerHTML);
				news.innerHTML = data.articles[i].title;
				news.classList.add('ticker__item');
				bbc.appendChild(news);
			};
			setTimeout(getBBC, 90000);
		})
		.catch(function(err) {
			console.error(err);
		});
}
*/
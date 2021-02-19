const api = {
	key: "462b13ecd543e89d411129a72ee1dcc6",
	base: "https://api.openweathermap.org/data/2.5/"
}

window.addEventListener('load', getLocation);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function getPosition(pos) {
	const lon = pos.coords.longitude;
	const lat = pos.coords.latitude;
	getResults(lat, lon);
}

function getResults(lat, lon) {
	fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`)
		.then(response => {
			return response.json();
		}).then(displayResults);
}

function displayResults(response) {
  const city = document.querySelector('.city');
  city.innerText = `${response.name}, ${response.sys.country}`;

  let now = new Date();
  const date = document.querySelector('.date');
  date.innerText = dateBuilder(now);

  const temp = document.querySelector('.temp');
  temp.innerHTML = `${Math.round(response.main.temp)}<span>°c</span>`;

  const weatherEl = document.querySelector('.weather');
  weatherEl.innerText = response.weather[0].main;

  const hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(response.main.temp_min)}°c / ${Math.round(response.main.temp_max)}°c`;
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}
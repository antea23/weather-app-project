function currentDate() {
  let todayDate = document.querySelector("#date");
  todayDate.innerHTML = `${day}, ${hour}:${minute}`;
}
let now = new Date();

let date = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let timeNow = new Date();
let hour = String(timeNow.getHours()).padStart(2, "0");
let minute = String(timeNow.getMinutes()).padStart(2, "0");

currentDate();

function citySearchEngine(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-engine");
  let cityEntry = document.querySelector("#city");
  cityEntry.innerHTML = searchInput.value;
}
let form = document.querySelector("#city-search");
form.addEventListener("submit", citySearchEngine);

function showTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "ad9ef8cd68c2ae9e1d3a180dd13de0c9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-engine").value;
  searchCity(city);
}

function searchLocation(position) {
  let units = "metric";
  let apiKey = "ad9ef8cd68c2ae9e1d3a180dd13de0c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let formCity = document.querySelector("form");
formCity.addEventListener("submit", handleSubmit);

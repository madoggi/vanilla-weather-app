function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

let todayDate = document.querySelector("#date");
todayDate.innerHTML = formatDate(new Date());

function weather(response) {
  let temperatureEl = document.querySelector(".temperature");
  let cityEl = document.querySelector("#city");
  let descriptionEl = document.querySelector("#description");
  let humidityEl = document.querySelector("#humidity");
  let windEl = document.querySelector("#wind");
  let iconEl = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  temperatureEl.innerHTML = Math.round(celsiusTemp);
  cityEl.innerHTML = response.data.name;
  descriptionEl.innerHTML = response.data.weather[0].description;
  humidityEl.innerHTML = response.data.main.humidity;
  windEl.innerHTML = Math.round(response.data.wind.speed);
  iconEl.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconEl.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast() {
  let forecastEl = document.querySelector("#forecast");
  let days = ["Mon", "Tue", "Wed", "Thu"];

  let forecastHTML = `<span class="forecast-days">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
     <div class="col-2">
       <div class = "weather-forecast-date">${day}</div>
          <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
          />
            <div class="weather-forecast-temp">
          <span class="weather-forecast-temp-max"> 18° </span>
          <span class="weather-forecast-temp-min"> 12° </span>
           </div>
      </div>
     </div>
      `;
  });

  forecastHTML = forecastHTML + `</span>`;
  forecastEl.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function searchC(city) {
  let apiKey = "d464138be506c07bf313e0df76e1acc5";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(weather);
}

function submitH(event) {
  event.preventDefault();
  let cityE = document.querySelector("#city-input").value;
  searchC(cityE);
}

let form = document.querySelector("#serach-form");
form.addEventListener("submit", submitH);

let celsiusTemp = null;

function fahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempF = document.querySelector(".temperature");
  fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempF.innerHTML = Math.round(fahrenheitTemp);
}

function celsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempC = document.querySelector(".temperature");
  tempC.innerHTML = Math.round(celsiusTemp);
}

let fahrenheitLink = document.querySelector("#unit-f");
fahrenheitLink.addEventListener("click", fahrenheit);

let celsiusLink = document.querySelector("#unit-c");
celsiusLink.addEventListener("click", celsius);

searchC("Kyiv");
displayForecast();

// Setting initial current value
const userInput = document.querySelector("#default-search");
const submitButton = document.querySelector("#submit-button");
// Api Key - do not push

let userInputValue = (userInput.value = "new york").toUpperCase();
// Api
let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${userInputValue}&appid=${apiKey}&units=imperial`;
let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${userInputValue}&appid=${apiKey}&units=imperial`;
// Getting Weather Api
const weatherApi = async () => {
  // Fetching Api Data
  try {
    // Current Weather
    const responseWeather = await fetch(urlWeather);
    if (!responseWeather.ok) {
      alert("try again or enter a different location")
      throw new Error("Failed to fetch current weather data");
    }
    const dataWeather = await responseWeather.json();
    console.log(dataWeather);
    weatherDisplayInfo(dataWeather);
    weatherIcons(dataWeather);
    // Forecast Weather
    const responseForecast = await fetch(urlForecast);
    if (!responseForecast.ok) {
      throw new Error("Failed to fetch forecast weather data");
    }
    const dataForecast = await responseForecast.json();
    console.log(dataForecast);
  } catch (error) {
    console.log("Error Please Fix It: ", error);
  }
};

const currentWeather = document.querySelector("#current-weather");
const currentWeatherContainer = document.querySelector(
  "#current-weather-container"
);
let currentFahrenheitDegree = document.querySelector(
  "#current-fahrenheit-degree"
);
let currentWeatherLocation = document.querySelector(
  "#current-weather-location"
);
let currentFahrenheit = document.querySelector("#current-fahrenheit");
let currentDescription = document.querySelector("#current-description");
let timeDisplay = document.querySelector("#time-display");

// Dom display information
const weatherDisplayInfo = (data) => {
  // Adding current weather data
  let currentDate = new Date(
    data.dt * 1000 + data.timezone * 1000
  ).toDateString();
  currentFahrenheitDegree.innerText = `${Math.round(data.main.temp)}`;
  currentWeatherLocation.innerText = `${data.name}`;
  currentFahrenheit.innerText = "°F";
  currentDescription.innerText = `${data.weather[0].main} | ${data.weather[0].description}`;
  timeDisplay.innerText = currentDate;
};

// Icons for the dom
const weatherIcons = (data) => {
  // current icon
  const currentIcon = document.querySelector("#current-icon");

  // this switch statement handles and updates the icons ui
  switch (data.weather[0].main) {
    case "Mist":
      currentIcon.className = "bi bi-cloud-fog text-white text-5xl m-4";
      break;
      case "Fog":
      currentIcon.className = "bi bi-cloud-fog text-white text-5xl m-4";
      break;
    case "Snow":
      currentIcon.className = "bi bi-cloud-snow text-white text-5xl m-4";
    case "Rain":
      if (data.weather[0].description === "light rain") {
        console.log("working");
        currentIcon.className = "bi bi-cloud-drizzle text-white text-5xl m-4";
      } else if (
        data.weather[0].description === "heavy intensity rain" ||
        "very heavy rain" ||
        "extreme rain"
      ) {
        currentIcon.className =
          "bi bi-cloud-rain-heavy text-white text-5xl m-4";
      } else {
        currentIcon.className = "bi bi-cloud-rain text-white text-5xl m-4";
      }
      break;
    case "Drizzle":
      currentIcon.className = "bi bi-cloud-drizzle text-white text-5xl m-4";
      break;
    case "Thunderstorm":
      currentIcon.className =
        "bi bi-cloud-lightning-rain text-white text-5xl m-4";
      break;
    case "Clouds":
      currentIcon.className = "bi bi-cloud text-white text-5xl m-4";
      break;
    case "Clear":
      currentIcon.className = "bi bi-sun text-white text-5xl m-4";
      break;
    case "Tornado":
      currentIcon.className = "bi bi-hurricane text-white text-5xl m-4";
      break;
    default:
      currentIcon.className = "bi bi-cloud text-white text-5xl m-4";
      console.log("could not find a icon sorry ;(")
  }
};

const handleUserInput = () => {
  userInputValue = userInput.value.toUpperCase();
  urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${userInputValue}&appid=${apiKey}&units=imperial`;
  weatherApi();
};

submitButton.addEventListener("click", handleUserInput);
userInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    handleUserInput();
  }
});

// Call the weatherApi function
weatherApi();

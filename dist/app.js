// Setting initial current value
const userInput = document.querySelector("#default-search");
const submitButton = document.querySelector("#submit-button");
// Api Key - do not push

let userInputValue = (userInput.value = "new york");
// Api
let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${userInputValue}&appid=${apiKey}&units=imperial`;
let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${userInputValue}&appid=${apiKey}&units=imperial`;
// Getting Weather Api
const weatherApi = async () => {
  const fetchingWeatherData = async () => {
    // Fetching Api Data
    try {
      // Current Weather
      const responseWeather = await fetch(urlWeather);
      if (!responseWeather.ok) {
        throw new Error("Failed to fetch current weather data");
      }
      const dataWeather = await responseWeather.json();
      console.log(dataWeather);
      weatherDisplayInfo(dataWeather);
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

  await fetchingWeatherData();
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
const weatherDisplayInfo = async (data) => {
  // Icons for the dom
  const weatherIcons = () => {
    // sunny icon
    const sunnyIcon = document.createElement("i");
    sunnyIcon.classList.add("bi", "bi-sun");

    // cloudy icon
    const cloudyIcon = document.createElement("i");
    cloudyIcon.classList.add("bi", "bi-cloud");

    // cloudy rain
    const rainIcon = document.createElement("i");
    rainIcon.classList.add("bi", "bi-cloud-rain");

    // rain storm icon
    const rainStormIcon = document.createElement("i");
    rainStormIcon.classList.add("bi", "bi-cloud-lightning-rain");

    // cloudy snow
    const snowIcon = document.createElement("i");
    snowIcon.classList.add("bi", "bi-cloud-snow");

    return { sunnyIcon, cloudyIcon, rainIcon, rainStormIcon, snowIcon };
  };
  // Adding current weather data
  const getItems = (data) => {
    let currentDate = new Date(
      data.dt * 1000 + data.timezone * 1000
    ).toDateString();
    currentFahrenheitDegree.innerText = `${Math.round(data.main.temp)}`;
    currentWeatherLocation.innerText = `${data.name}`;
    currentFahrenheit.innerText = "°F";
    currentDescription.innerText = `${data.weather[0].main} | ${data.weather[0].description}`;
    timeDisplay.innerText = currentDate;
  };
  return getItems(data);
};

const handleUserInput = async () => {
  userInputValue = userInput.value = "saudi arabia";
  urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${userInputValue}&appid=${apiKey}&units=imperial`;
  try {
    const responseWeather = await fetch(urlWeather);
    if (!responseWeather.ok) {
      throw new Error("Failed to fetch current weather data");
    }
    const dataWeather = await responseWeather.json();
    console.log(dataWeather);
    // Update the weather display with the new data
    weatherDisplayInfo(dataWeather).getItems;
  } catch (error) {
    console.log("Error Please Fix It: ", error);
  }
};

submitButton.addEventListener("click", handleUserInput);

// Call the weatherApi function
weatherApi();

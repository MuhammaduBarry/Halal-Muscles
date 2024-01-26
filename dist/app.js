// Setting initial current value
const userInput = document.querySelector("#default-search");
const submitButton = document.querySelector("#submit-button");
// Api Key - do not push

let userInputValue = (userInput.value = "new york").toUpperCase();
// Api url's
let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${userInputValue}&appid=${apiKey}&units=imperial`;
let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${userInputValue}&appid=${apiKey}&units=imperial`;
// Getting Weather Api
const weatherApi = async () => {
  try {
    // Fetching Api Data
    const responseWeather = await fetch(urlWeather);
    if (!responseWeather.ok) {
      alert("try again or enter a different location");
      throw new Error("Failed to fetch current weather data");
    }
    const dataWeather = await responseWeather.json();
    console.log(dataWeather);
    CurrentWeatherDisplayInfo(dataWeather);
    weatherIcons(dataWeather.weather[0].main);
    // Forecast Weather
    const responseForecast = await fetch(urlForecast);
    if (!responseForecast.ok) {
      throw new Error("Failed to fetch forecast weather data");
    }
    const dataForecast = await responseForecast.json();
    console.log(dataForecast);
    forecastDisplayInfo(dataForecast)
  } catch (error) {
    console.log("Error Please Fix It:", error);
  }
};

// Dom display information
const CurrentWeatherDisplayInfo = (data) => {
  let currentFahrenheitDegree = document.querySelector(
    "#current-fahrenheit-degree"
  );
  let currentWeatherLocation = document.querySelector(
    "#current-weather-location"
  );
  let currentFahrenheit = document.querySelector("#current-fahrenheit");
  let currentDescription = document.querySelector("#current-description");
  let timeDisplay = document.querySelector("#time-display");
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

// Dom Forecast display information
const forecastDisplayInfo = (data) => {
  // forecast date tags
  let secondTime = document.querySelector("#second-Time");
  let thirdTime = document.querySelector("#third-Time");
  let fourthTime = document.querySelector("#fourth-Time");
  let fifthTime = document.querySelector("#fifth-Time");
  let sixthTime = document.querySelector("#sixth-Time");

  // forecast fahrenheit tags
  let secondTimeFahrenheit = document.querySelector("#second-Time-fahrenheit");
  let thirdTimeFahrenheit = document.querySelector("#third-Time-fahrenheit");
  let fourthTimeFahrenheit = document.querySelector("#fourth-Time-fahrenheit");
  let fifthTimeFahrenheit = document.querySelector("#fifth-Time-fahrenheit");
  let sixthTimeFahrenheit = document.querySelector("#sixth-Time-fahrenheit");

  // forecast description tags
  let secondDescription = document.querySelector("#second-description")
  let thirdDescription = document.querySelector("#third-description")
  let fourthDescription = document.querySelector("#fourth-description")
  let fifthDescription = document.querySelector("#fifth-description")
  let sixthDescription = document.querySelector("#sixth-description")

  // Adding forecast data
  // second
  secondTime.innerText = data.list[1].dt_txt;
  secondTimeFahrenheit.innerText = `${data.list[3].main.temp} °F`
  secondDescription.innerText = data.list[3].weather[0].description
  // third
  thirdTime.innerText = data.list[9].dt_txt
  thirdTimeFahrenheit.innerText = `${data.list[9].main.temp} °F`
  thirdDescription.innerText = data.list[9].weather[0].description
  // fourth
  fourthTime.innerText = data.list[17].dt_txt
  fourthTimeFahrenheit.innerText = `${data.list[17].main.temp} °F`
  fourthDescription.innerText = data.list[17].weather[0].description
  // fifth
  fifthTime.innerText = data.list[25].dt_txt
  fifthTimeFahrenheit.innerText = `${data.list[25].main.temp} °F`
  fifthDescription.innerText = data.list[25].weather[0].description
  // sixth
  sixthTime.innerText = data.list[33].dt_txt
  sixthTimeFahrenheit.innerText = `${data.list[33].main.temp} °F`
  sixthDescription.innerText = data.list[33].weather[0].description
};
// Icons for the dom
const weatherIcons = (data) => {
  // current icon
  const currentIcon = document.querySelector(".i-icons");

  // this switch statement handles and updates the icons ui
  switch (data) {
    case "Mist":
      currentIcon.className = "i-icons bi bi-cloud-fog text-white text-5xl m-4";
      break;
    case "Fog":
      currentIcon.className = "i-icons bi bi-cloud-fog text-white text-5xl m-4";
      break;
    case "Snow":
      currentIcon.className =
        "i-icons bi bi-cloud-snow text-white text-5xl m-4";
    case "Rain":
      if (data.weather[0].description === "light rain") {
        console.log("working");
        currentIcon.className =
          "i-icons bi bi-cloud-drizzle text-white text-5xl m-4";
      } else if (
        data.weather[0].description === "heavy intensity rain" ||
        "very heavy rain" ||
        "extreme rain"
      ) {
        currentIcon.className =
          "i-icons bi bi-cloud-rain-heavy text-white text-5xl m-4";
      } else {
        currentIcon.className =
          "i-icons bi bi-cloud-rain text-white text-5xl m-4";
      }
      break;
    case "Drizzle":
      currentIcon.className =
        "i-icons bi bi-cloud-drizzle text-white text-5xl m-4";
      break;
    case "Thunderstorm":
      currentIcon.className =
        "i-icons bi bi-cloud-lightning-rain text-white text-5xl m-4";
      break;
    case "Clouds":
      currentIcon.className = "i-icons bi bi-cloud text-white text-5xl m-4";
      break;
    case "Clear":
      currentIcon.className = "i-icons bi bi-sun text-white text-5xl m-4";
      break;
    case "Tornado":
      currentIcon.className = "i-icons bi bi-hurricane text-white text-5xl m-4";
      break;
    default:
      currentIcon.className = "i-icons bi bi-cloud text-white text-5xl m-4";
      console.log("could not find a icon sorry ;(");
  }
};

const handleUserInput = () => {
  userInputValue = userInput.value.toUpperCase();
  urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${userInputValue}&appid=${apiKey}&units=imperial`;
  urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${userInputValue}&appid=${apiKey}&units=imperial`;
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

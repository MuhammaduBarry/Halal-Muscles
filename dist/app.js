// Getting Weather Api
const weatherApi = async () => {
  // Setting initial current value
  const userInput = document.querySelector("#default-search");
  let userInputValue = (userInput.value = "saudi arabia");
  const submitButton = document.querySelector("#submit-button");
  let userInputValueEncoded = encodeURIComponent(userInputValue);

  const fetchingWeatherData = async () => {
    // Api Key - do not push
  
    // Api
    let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${userInputValueEncoded}&appid=${apiKey}&units=imperial`;
    let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${userInputValueEncoded}&appid=${apiKey}&units=imperial`;

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

  fetchingWeatherData();

  // submit button not working tackling this tomorrow
  submitButton.addEventListener("click", async () => {
    const reset = await weatherDisplayInfo(dataWeather);
    console.log(reset.currentWeatherContainer);
    reset.currentWeatherContainer.innerText = " ";
    userInputValue = userInput.value;
    userInputValueEncoded = encodeURIComponent(userInputValue);

    await fetchingWeatherData();
  });
};

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

  // Receiving the icons
  const icons = weatherIcons();

  // Current weather container
  const currentWeatherContainer = document.querySelector(
    ".Current-Weather-Container"
  );
  // Current weather display
  const currentWeather = document.querySelector(".current-Weather");
  const currentWeatherLocation = document.createElement("h3");
  const currentFahrenheitDegree = document.createElement("h1");
  const currentFahrenheit = document.createElement("p");
  const currentDescription = document.createElement("p");
  const timeDisplay = document.createElement("p");
  // Displays The date
  let currentDate = new Date(
    data.dt * 1000 + data.timezone * 1000
  ).toDateString();
  // Tailwind css styles
  currentFahrenheitDegree.classList.add(
    "text-7xl",
    "text-white",
    "text-center",
    "font-mono"
  );
  currentFahrenheit.classList.add("text-white", "items-start", "font-mono");
  icons.cloudyIcon.classList.add("text-white", "text-5xl", "m-4");
  currentWeather.classList.add(
    "flex",
    "flex-row-reverse",
    "items-center",
    "justify-center"
  );
  currentWeatherLocation.classList.add(
    "text-gray-400",
    "text-xl",
    "flex",
    "items-center",
    "justify-center",
    "font-mono",
    "mt-2"
  );
  timeDisplay.classList.add(
    "text-gray-400",
    "font-mono",
    "text-center",
    "mb-2",
    "text-lg"
  );
  currentDescription.classList.add(
    "text-gray-400",
    "text-center",
    "font-mono",
    "mt-2"
  );
  // Adding current weather data
  currentFahrenheitDegree.innerText = `${Math.round(data.main.temp)}`;
  currentWeatherLocation.innerText = `${data.name}`;
  currentFahrenheit.innerText = "°F";
  currentDescription.innerText = `${data.weather[0].main} | ${data.weather[0].description}`;
  timeDisplay.innerText = currentDate;
  // Appending current weather data
  currentWeatherContainer.appendChild(timeDisplay);
  currentWeather.appendChild(currentFahrenheit);
  currentWeather.appendChild(currentFahrenheitDegree);
  currentWeather.appendChild(icons.cloudyIcon);
  currentWeatherContainer.appendChild(currentWeather);
  currentWeatherContainer.appendChild(currentWeatherLocation);
  currentWeatherContainer.appendChild(currentDescription);

  return { currentWeatherContainer };
};

// Call the weatherApi function
weatherApi();

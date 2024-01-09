// Getting Weather Api
const weatherApi = async () => {
  // Api Key - do not push


  // Api
  const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=40.79857&lon=-73.96659&appid=${apiKey}&units=imperial`;
  const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=40.79857&lon=-73.96659&appid=${apiKey}&units=imperial`;

  // Fetching Api Data
  try {
    // Current Weather
    const responseWeather = await fetch(urlWeather);
    const dataWeather = await responseWeather.json();
    console.log(dataWeather);

    // Forecast Weather
    const responseForecast = await fetch(urlForecast);
    const dataForecast = await responseForecast.json();
    console.log(dataForecast);

    weatherDomInfo(dataWeather);
  } catch (error) {
    console.log("Error Please Fix It: ", error);
  }
};
weatherApi();

const weatherIcons = () => {

  return { sunny };
};
// Dom information
const weatherDomInfo = (dataWeather) => {
 const weatherSizing = ['bg-cover', 'bg-center', 'h-screen']
};

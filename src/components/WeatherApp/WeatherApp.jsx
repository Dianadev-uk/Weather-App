import { useState, useEffect } from "react";
import "../WeatherApp/WeatherApp.css";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";



const WeatherApp = () => {
  let api_key = "cd7706d20d9a4a6633d4357900d79d1d";

  const [wicon, setWicon] = useState(cloud_icon);
  const [location, setLocation] = useState(null);
  const [temperature, setTemperature] = useState("24°C"); //default
  const [humidity, setHumidity] = useState("64%"); //default
  const [windSpeed, setWindSpeed] = useState("18 km/h"); //default
  const [selectedCity, setSelectedCity] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(0) //to manage time delay. I don't want the city name below update before finishing typing on the input.

  useEffect(() => {
    fetchUserLocation();
  }, []);

  const fetchUserLocation = () => {  //to get the current user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  };

  const fetchWeatherData = async (latitude, longitude) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();
    updateWeatherInfo(data);
  };

  const search = async (city) => { //you can search any city
    if (!city) return;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
    let response = await fetch(url);
    let data = await response.json();
    updateWeatherInfo(data);
  };

  const updateWeatherInfo = (data) => {
    const humidityValue = data.main.humidity + "%";
    const windSpeedValue = data.wind.speed + " km/h";
    const temperatureValue = data.main.temp + "°C";
    const cityName = data.name;

    setWicon(getWeatherIcon(data.weather[0].icon));
    setLocation(cityName);
     setTemperature(temperatureValue);
     setHumidity(humidityValue);
     setWindSpeed(windSpeedValue);
  };

  const getWeatherIcon = (weatherCode) => {
    if (weatherCode === "01d" || weatherCode === "01n") {
      return clear_icon;
    } else if (weatherCode === "02d" || weatherCode === "02n") {
      return cloud_icon;
    } else if (
      weatherCode === "03d" ||
      weatherCode === "03n" ||
      weatherCode === "04d" ||
      weatherCode === "04n"
    ) {
      return drizzle_icon;
    } else if (
      weatherCode === "09d" ||
      weatherCode === "09n" ||
      weatherCode === "10d" ||
      weatherCode === "10n"
    ) {
      return rain_icon;
    } else if (weatherCode === "13d" || weatherCode === "13n") {
      return snow_icon;
    } else {
      return clear_icon;
    }
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);

    clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      if (!city) {
        fetchUserLocation(); //fetch users location if input is empty
      } else {
        search(city);
      }
     
    }, 500);
    setTypingTimeout(timeout);


    const humidityElement =
      document.getElementsByClassName("humidity-percent")[0];
    const windElement = document.getElementsByClassName("wind-rate")[0];
    const tempElement = document.getElementsByClassName("weather-temp")[0];

    if (humidityElement) {
      humidityElement.innerHTML = humidity;
    }

    if (windElement) {
      windElement.innerHTML = windSpeed;
    }

    if (tempElement) {
      tempElement.innerHTML = temperature;
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Enter a city"
          onChange={handleCityChange}
          value={selectedCity}
        />
      </div>

      <div className="weather-image">
        <img src={wicon} alt="" className="icon" />
      </div>
      <div className="weather-temp">{temperature}</div>
      <div className="weather-location">{location || "Loading..."}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{ humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">{ windSpeed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default WeatherApp;

 
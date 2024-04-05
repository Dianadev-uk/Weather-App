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

  
  const predefinedCities = [
    { name: "New York", latitude: 40.7128, longitude: -74.006 },
    { name: "London", latitude: 51.5074, longitude: -0.1278 },
    { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
    { name: "Tokyo", latitude: 35.6895, longitude: 139.6917 },
    { name: "Sydney", latitude: -33.8688, longitude: 151.2093 },
    { name: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
    { name: "Berlin", latitude: 52.52, longitude: 13.405 },
    { name: "Rome", latitude: 41.9028, longitude: 12.4964 },
    { name: "Moscow", latitude: 55.7558, longitude: 37.6173 },
    { name: "Beijing", latitude: 39.9042, longitude: 116.4074 },
  ];

  const [wicon, setWicon] = useState(cloud_icon);
  const [location, setLocation] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState(predefinedCities);

  useEffect(() => {
    fetchUserLocation();
  }, []);

  const fetchUserLocation = () => {
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

  // const search = async (city) => {   //you can search any city 
  //   if (!city) return;

  //   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

  //   let response = await fetch(url);
  //   let data = await response.json();

  //   updateWeatherInfo(data);
  // }; 

  const updateWeatherInfo = (data) => {
    const humidity = data.main.humidity + "%";
    const windSpeed = data.wind.speed + " km/h";
    const temperature = data.main.temp + "°C";
    const cityName = data.name;

    setWicon(getWeatherIcon(data.weather[0].icon));
    setLocation(cityName);
    document.getElementsByClassName("humidity-percent")[0].innerHTML = humidity;
    document.getElementsByClassName("wind-rate")[0].innerHTML = windSpeed;
    document.getElementsByClassName("weather-temp")[0].innerHTML = temperature;
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
    setSelectedCity(event.target.value);
    const selectedCityData = cities.find(
      (city) => city.name === event.target.value
    );
    if (selectedCityData) {
      fetchWeatherData(selectedCityData.latitude, selectedCityData.longitude);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <select
          className="cityInput"
          onChange={handleCityChange}
          value={selectedCity}
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="weather-image">
        <img src={wicon} alt="" className="icon" />
      </div>
      <div className="weather-temp">24 C</div>
      <div className="weather-location">{location || "Loading..."}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;

 
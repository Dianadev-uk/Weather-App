import { useEffect, useState } from "react";
import {  Link } from "react-router-dom";
import "../WeatherApp/WeatherApp.css";

const FiveDays = () => {
  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState(null);
  
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );   
    }
  }, []);
   
  useEffect(() => {
    if (location) {
      fetchForecastData(location.latitude, location.longitude);
    }
    console.log(location)
  }, [location]);

  const fetchForecastData = async (latitude, longitude) => {
    let api_key = "cd7706d20d9a4a6633d4357900d79d1d";
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`;

    try {
      let response = await fetch(url);
      let data = await response.json();

        // it will inform the forecast every 3 hours 
      const forecastData = data.list.filter((item) => {
        return item.dt_txt.includes('00:00:00') ||
          item.dt_txt.includes('03:00:00') ||
          item.dt_txt.includes('06:00:00') ||
          item.dt_txt.includes('09:00:00') ||
          item.dt_txt.includes('12:00:00') ||
          item.dt_txt.includes('15:00:00') ||
          item.dt_txt.includes('18:00:00') ||
          item.dt_txt.includes('21:00:00');
    });

      setForecast(forecastData);
    } catch (error) {
      console.error("Error fetching forecast data", error);
    }
  };

  return (
    <div className="forecast-container">
      {forecast ? (
        <div className="forecast-list">
          {forecast.map((item, index) => (
            <div key={index} className="forecast-item">
              <div className="forecast-date">{item.dt_txt}</div>
              <div className="forecast-temp">Temperature: {item.main.temp}°C</div>
              
            </div>
          ))}
        </div>
      ) : (
        <div>Loading forecast...</div>
      )}
      <div className="back-container">
        {/* link to go back to the main page */}
        <Link to="/" className="back"><span> BACK ⬅️</span></Link>
        </div>
    </div>
  );
};

export default FiveDays;

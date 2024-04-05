import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../WeatherApp/WeatherApp.css";

const FiveDays = () => {
  const [forecast, setForecast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchForecastData(latitude, longitude);
      },
      (error) => {
        console.error("Error fetching location:", error);
      }
    );
  }, []);

  const fetchForecastData = async (latitude, longitude) => {
    let api_key = "cd7706d20d9a4a6633d4357900d79d1d";
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`;

    try {
      let response = await fetch(url);
      let data = await response.json();

      setForecast(data);
    } catch (error) {
      console.error("Error fetching forecast data", error);
    }
  };

  const handleViewForescastClick = () => {
    navigate("/forecast");
  };

  return (
    <div>
      {forecast ? (
        <div>
          {forecast.list.map((item, index) => (
            <div key={index}>
              <div>Date: {item.dt_txt}</div>
              <div>Temperature: {item.main.temp}°C</div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading forecast...</div>
      )}
      <Link to="/forecast">
        <button className="button" onClick={handleViewForescastClick}>
          View 5-Day Forecast
        </button>
      </Link>
    </div>
  );
};

export default FiveDays;

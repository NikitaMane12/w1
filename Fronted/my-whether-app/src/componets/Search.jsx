import { useState } from "react";
import axios from "axios";
import AddF from "./AddF";

const Search = () => {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  const cityHandler = (event) => {
    setCity(event.target.value.trim());
  };

  const fetchData = async () => {
    try {
      console.log("Fetching data for city:", city);
      const apiKey = "349db4a4d70726f5b27e0e75f112654c";
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      console.log("Response data:", res.data);

      if (res.data) {
        setForecast(res.data);
        setError(null);
      } else {
        setError("City not found.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("An error occurred while fetching the data.");
    }
  };

  const searchHandler = () => {
    if (city) {
      fetchData();
    }
  };

  return (
    <div className="Container">
      <h1>Welcome to Weather App</h1>
      <input type="text" value={city} onChange={cityHandler} />
      <button onClick={searchHandler}>SEARCH</button>

      {error && <div className="error">{error}</div>}
      {forecast && (
        <div className="res">
          <h2>City: {forecast.city.name}</h2>
          <div className="forecast">
            {forecast.list.slice(0, 5).map((item, index) => (
              <div key={index} className="day-forecast">
                <p>Date: {new Date(item.dt * 1000).toLocaleDateString()}</p>
                <p>Temperature: {item.main.temp}°C</p>
                <p>Weather: {item.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {forecast && <AddF weather={forecast.city} />}
    </div>
  );
};

export default Search;

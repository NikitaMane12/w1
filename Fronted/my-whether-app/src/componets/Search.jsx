import { useState } from "react";
import axios from "axios";
import AddF from "./AddF";

const Search = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const cityHandler = (event) => {
    setCity(event.target.value.trim());
  };

  const fetchData = async () => {
    try {
      console.log("Fetching data for city:", city);
      const res = await axios.get(`http://localhost:3000/favorites?q=${city}`);
      console.log("Response data:", res.data);

      const matchedCity = res.data.find(
        (item) => item.name.toLowerCase() === city.toLowerCase()
      );

      if (matchedCity) {
        setWeather(matchedCity);
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
      {weather && (
        <div className="res">
          <h2>City: {weather.name}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Weather: {weather.weather}</p>
        </div>
      )}
      {weather && <AddF weather={weather} />}
    </div>
  );
};

export default Search;

import { useState } from "react";

const AddF = ({ weather }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavoritesHandler = () => {
    if (weather && !favorites.some((fav) => fav.name === weather.name)) {
      setFavorites([...favorites, weather]);
    }
  };

  return (
    <div>
      <button onClick={addToFavoritesHandler}>Add to Favorites</button>
      <div className="favorites">
        <h2>Favorite Cities</h2>
        {favorites.length > 0 ? (
          <div className="favorites-container">
            {favorites.map((fav, index) => (
              <div className="card" key={index}>
                <h3>{fav.name}</h3>
                <p>Temperature: {fav.temperature}°C</p>
                <p>Weather: {fav.weather}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No favorite cities added yet.</p>
        )}
      </div>
    </div>
  );
};

export default AddF;

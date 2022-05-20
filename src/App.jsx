import "./css/App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("");

  const apiCall = async (e) => {
    e.preventDefault();
    const loc = e.target.elements.loc.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${
      import.meta.env.VITE_API_KEY
    }`;
    const req = axios.get(url);
    const res = await req;
    setWeather({
      descp: res.data.weather[0].description,
      temp: res.data.main.temp,
      city: res.data.name,
      humidity: res.data.main.humidity,
      press: res.data.main.pressure,
    });

    setCity(res.data.name);
  };

  return (
    <div className="App">
      <div className="bottom">
        <div className="input">
          <form onSubmit={apiCall} className="form">
            <input type="text" placeholder="city" name="loc" />
            <button className="bttn">Search</button>
          </form>
        </div>
        <div className="title">
          <h2>{city}</h2>
        </div>
        <div className="temp">
          <p>Temp: {weather.temp}</p>
          <p></p>
        </div>
        <div className="icon"></div>

        <div className="feels-like">
          <p className="first">Feels like: {weather.temp}</p>
          <p className="second">
            Humidity: {weather.humidity}
            <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;

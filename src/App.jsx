import "./css/App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [icon, setIcon] = useState("");

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
      // icon: res.data.weather[0].icon,
      temp: res.data.main.temp,
      city: res.data.name,
      humidity: res.data.main.humidity,
      press: res.data.main.pressure,
    });

    setIcon(res.data.weather[0].icon);
    setCountry(res.data.sys.country);
    setCity(res.data.name);
  };

  let k = weather.temp;
  let C = k - 273.15;

  let temp = C.toFixed(1);
  let iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";

  return (
    <div className="App">
      <div className="container">
        <div className="input">
          <form onSubmit={apiCall} className="form">
            <input type="text" placeholder="Enter City" name="loc" id="input" />
            <br />
            <button className="bttn">Search</button>
          </form>
        </div>
        <div className="title">
          <h2>City: {city}</h2>
          <p>Country: {country}</p>
          <p className="temp">
            Temp: {temp === "NaN" ? "" : <img src={iconUrl} />}
          </p>

          <p>Description: {weather.descp}</p>
          <p>Humidity: {weather.humidity}</p>
        </div>
      </div>
    </div>
  );
};

export default App;

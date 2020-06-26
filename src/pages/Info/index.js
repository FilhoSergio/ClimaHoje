import React, { useState } from "react";
// import { Link } from "react-router-dom";
import "./styles.css";

// import { FiLogIn } from "react-icons/fi";
// import api from "../../services/api";
import axios from "axios";

const Home = () => {
  const [city, setCity] = useState("");
  const [woeid, setWoeid] = useState("");

  async function getTimeToday() {
 
    await axios
      .get(
        `https://api.hgbrasil.com/stats/find_woeid?key=17284dd0&format=json-cors&sdk_version=console&city_name=${city}%2C%20CE`
      )
      .then((response) => {
        const weather = response.data.woeid;
        // this.setState({weather});
        setWoeid(weather);
        if (response.data.error) {
          alert("Nenhum resultado encontrado", response.data.error);
        }
      })
      .catch(function (error) {
        console.error("Nenhum resultado encontrado.", error);
      });
    await axios
      .get(`https://api.hgbrasil.com/weather?woeid=${woeid}`)
      .then((response) => {
        console.log("search by city", response.data.results);
      });
  }

  return (
    <div id="page-home">
      <div className="content">
        <header></header>
        <main>
          <h1>Previsão do tempo.</h1>
          <p>Consulte o clima em sua cidade.</p>
          <input
            type="search"
            placeholder="Digite o nome da cidade"
            value={city}
            className="search"
            onChange={(event) => setCity(event.target.value)}
          />
          <button onClick={getTimeToday} label="Success" className="square_btn">
            
            Consultar
          </button>
          <p> </p>
        </main>
        
      </div>
    </div>
  );
};

export default Home;

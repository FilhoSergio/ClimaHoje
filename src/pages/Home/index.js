import React, { useState, useEffect } from "react";
import "./styles.css";
import { Card, Col, Row, Button } from "react-bootstrap";
import api from "../../services/api";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { WiStrongWind, WiHorizonAlt, WiHorizon } from "react-icons/wi";
import { DiReact } from "react-icons/di";
import sun from "../../assets/sun.png";
import cloud from "../../assets/cloud.png";

const Home = () => {
  const [city, setCity] = useState("");
  const [woeid, setWoeid] = useState("");
  const [infos, setInfos] = useState([]);
  const [currently, setCurrently] = useState("");
  const [forecast, setForecast] = useState([]);



  useEffect(() => {
    api
      .get(`?woeid=${woeid}&format=json-cors&key=341ce3dd`)
      .then((response) => {
        setInfos(response.data.results);
        setCurrently(response.data.results.currently);
        setForecast(response.data.results.forecast);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [woeid]);

  async function getTimeToday() {
    await axios
      .get(
        `https://api.hgbrasil.com/stats/find_woeid?key=17284dd0&format=json-cors&sdk_version=console&city_name=${city}%2C%20CE`
      )
      .then((response) => {
        const weather = response.data.woeid;
        console.log("pearl jam", weather);

        setWoeid(weather);
        if (response.data.error) {
          alert("Nenhum resultado encontrado", response.data.error);
        }
      })
      .catch(function (error) {
        console.error("Nenhum resultado encontrado.", error);
      });
  }

  return (
    <div id="page-home">
      <div className="content">
        <header>
          <h1>Previsão do tempo.</h1>
          <p>Consulte o clima em sua cidade.</p>
        </header>
        <main>
          <input
            type="search"
            placeholder="Digite o nome da cidade"
            value={city}
            className="search"
            onChange={(event) => setCity(event.target.value)}
          />
          <Button
            variant="warning"
            className="float-right float-sm-right"
            onClick={getTimeToday}
          >
            Consultar
          </Button>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <h5> {infos.city} </h5>
                  <Card.Subtitle className="mb-2 text-muted">
                    <WiHorizonAlt /> {infos.sunrise} <br />
                    <WiHorizon /> {infos.sunset} <br />
                    <WiStrongWind /> {infos.wind_speedy}
                  </Card.Subtitle>
                </Col>
                <Col> 
                
                <img className="imgmacro" src={sun} /></Col>
              </Row>

              <h4> {infos.temp} ºC </h4>
              <p> {infos.description} </p>
              <hr />
              <Row>
                {forecast.slice(0, 4).map((forecasts) => (
                  <Col key={forecasts.date}>
                    <span>
                      <b>
                        {forecasts.weekday} <br></br>
                        {forecasts.date}
                      </b>
                    </span>
                    <br />
                    <small>
                      Max {forecasts.max}ºC <br />
                      Min {forecasts.min}ºC <br />
                    </small>
                    <br />
                    <img className="imgmini" src={cloud} />
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Home;

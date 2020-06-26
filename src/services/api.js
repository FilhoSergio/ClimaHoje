import axios from "axios";

const api = axios.create({
    baseURL: "https://api.hgbrasil.com/weather"
});

// TODO: com a consulta de cidade retornar o código do campo woeid https://api.hgbrasil.com/weather?woeid=
// https://api.hgbrasil.com/stats/find_woeid?key=17284dd0&format=json-cors&sdk_version=console&city_name=${nome}%2C%20CE


export default api;
//1a1a4aef6e9046cf67298da62f4ac232 - OWM key

let cityInfoToday = document.querySelector("#city-info-today");

let getWeatherToday = function() {

    let apiUrl = "api.openweathermap.org/data/2.5/weather?q=Seattle&appid=1a1a4aef6e9046cf67298da62f4ac232";

    fetch(apiUrl).then(function(response) {
        console.log(response);
    });
};



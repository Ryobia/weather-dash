//1a1a4aef6e9046cf67298da62f4ac232 - OWM key
let key = "1a1a4aef6e9046cf67298da62f4ac232";
let cityInfoToday = document.querySelector("#city-info-today");
let temperature = document.querySelector("#temp");
let cityInputEl = document.querySelector("#cityInput");
let searchBtnEl = document.querySelector("#searchBtn");

let getWeatherToday = function(city) {
    let apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=1a1a4aef6e9046cf67298da62f4ac232";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                temp = data.main.temp;
                    console.log(data);
                humidity = data.main.humidity;
                windSpeed = data.wind.speed;
                
                
            });
        } else {
            alert("Something ain't right");
        }

    });


};

let displayWeather = function(temp, humidity, windSpeed, uv) {



};

let searchSubmitHandler = function(event) {
    event.preventDefault();
    let city = cityInputEl.value.trim();

    if (city) {
        getWeatherToday(city);
        cityInputEl.value = "";
    } else {
        alert("Please Enter a City");
    }
};


searchBtnEl.addEventListener("click", searchSubmitHandler);
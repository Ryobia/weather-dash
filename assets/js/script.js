//1a1a4aef6e9046cf67298da62f4ac232 - OWM key
let today = new Date;
let cityInfoToday = document.querySelector("#city-info-today");
let cityNameEl = document.querySelector("#cityName");
let temperatureEl = document.querySelector("#temp");
let humidityEl = document.querySelector("#humidity");
let windEl = document.querySelector("#wind");
let uvEl = document.querySelector("#uv");
let cityInputEl = document.querySelector("#cityInput");
let searchBtnEl = document.querySelector("#searchBtn");
let iconEl = document.getElementById("#icon");
let searchHistory = [];
let recentCitiesEl = document.querySelector("#recentCities");

let getWeatherToday = function(city) {
    let apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=1a1a4aef6e9046cf67298da62f4ac232";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                let lat = data.coord.lat;
                let lon = data.coord.lon;
                
                fetch("http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&exclude=hourly,daily,minutely&units=imperial&appid=1a1a4aef6e9046cf67298da62f4ac232")
                    .then(function(response) {
                        response.json().then(function(data) {
                            console.log(data);
                            let uv = data.current.uvi;
                            let temp = data.current.temp;
                            let humidity = data.current.humidity;
                            let wind = data.current.wind_speed;
                            let icon = data.current.weather[0].icon;

                            displayWeather(city, temp, humidity, wind, uv, icon);
                        });
                });

                


            });
        } else {
            alert("Something ain't right");
        }

    });


};

let displayWeather = function(city, temp, humidity, wind, uv, icon) {
    cityNameEl.innerHTML = city.toUpperCase() + " " + today.toLocaleDateString("en-us") + '<img src="http://openweathermap.org/img/wn/"' + icon + '"@2x.png" alt="weather-icon" height="70px"></img>';
    temperatureEl.textContent = temp + " °F";
    humidityEl.textContent = humidity + "%";
    windEl.textContent = wind + " MPH";
    uvEl.textContent = uv;
};

let searchSubmitHandler = function(event) {
    event.preventDefault();
    let city = cityInputEl.value.trim();

    if (city) {
        getWeatherToday(city);
        searchHistory.push(city);
        localStorage.setItem("city", searchHistory);
        saveCityInput(city);
        cityInputEl.value = "";
    } else {
        alert("Please Enter a City");
    }
};

let saveCityInput = function(city) {
    let cityEl = document.createElement("li");
    cityEl.classList.add("list-group-item");
    cityEl.addEventListener("click", function() {
        cityInputEl.value = cityEl.textContent;
        searchSubmitHandler;
        
    });
    cityEl.textContent = city;
    recentCitiesEl.appendChild(cityEl);
    

};


searchBtnEl.addEventListener("click", searchSubmitHandler);
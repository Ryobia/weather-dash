const today = new Date;
const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
const dayTwo = new Date(today);
    dayTwo.setDate(dayTwo.getDate() + 2);
const dayThree = new Date(today);
    dayThree.setDate(dayThree.getDate() + 3);
const dayFour = new Date(today);
    dayFour.setDate(dayFour.getDate() + 4);
const dayFive = new Date(today);
    dayFive.setDate(dayFive.getDate() + 5);
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
let weatherIconEl = document.querySelector("#weatherIcon");
let img = document.createElement("img");
let forecastEl = document.querySelector("#forecast");
let fiveDayEl = document.querySelector("#word");


let getWeatherToday = function(city) {
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=1a1a4aef6e9046cf67298da62f4ac232";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                let lat = data.coord.lat;
                let lon = data.coord.lon;
                
                fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon="
                 + lon +"&exclude=hourly,minutely&units=imperial&appid=1a1a4aef6e9046cf67298da62f4ac232")
                    .then(function(response) {
                        response.json().then(function(data) {
                            console.log(data);
                            let uv = data.current.uvi;
                            let temp = data.current.temp;
                            let humidity = data.current.humidity;
                            let wind = data.current.wind_speed;
                            let icon = data.current.weather[0].icon;
                            changeIcon(icon);
                            displayWeather(city, temp, humidity, wind, uv);
                            let forecast = [
                                {
                                    day: tomorrow.toLocaleDateString("en-us"),
                                    icon: data.daily[0].weather[0].icon,
                                    temp: data.daily[0].temp.day,
                                    humidity: data.daily[0].humidity
                                },{
                                    day: dayTwo.toLocaleDateString("en-us"),
                                    icon: data.daily[1].weather[0].icon,
                                    temp: data.daily[1].temp.day,
                                    humidity: data.daily[1].humidity
                                },{
                                    day: dayThree.toLocaleDateString("en-us"),
                                    icon: data.daily[2].weather[0].icon,
                                    temp: data.daily[2].temp.day,
                                    humidity: data.daily[2].humidity
                                },{
                                    day: dayFour.toLocaleDateString("en-us"),
                                    icon: data.daily[3].weather[0].icon,
                                    temp: data.daily[3].temp.day,
                                    humidity: data.daily[3].humidity
                                },{
                                    day: dayFive.toLocaleDateString("en-us"),
                                    icon: data.daily[4].weather[0].icon,
                                    temp: data.daily[4].temp.day,
                                    humidity: data.daily[4].humidity
                                }
                            ];
                                console.log(forecast);
                                displayForecast(forecast);
                            
                        });
                });

                


            });
        } else {
            alert("Something ain't right");
        }

    });


};

let changeIcon = function(icon) {
    
    img.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    cityInfoToday.appendChild(img);
};

let displayWeather = function(city, temp, humidity, wind, uv, icon) {
    cityNameEl.innerHTML = city.toUpperCase() + " " + today.toLocaleDateString("en-us");
    temperatureEl.textContent = "Temperature: " + temp + " °F";
    humidityEl.textContent = "Humidity: " + humidity + "%";
    windEl.textContent = "Wind Speed: " + wind + " MPH";
    uvEl.classList.remove("greenbg", "yellowbg", "redbg", "p-2")

    if (uv<3) {
        uvEl.classList.add("greenbg", "p-2");
    } else if (uv<6 && uv>2) {
        uvEl.classList.add("yellowbg", "p-2");
    } else if (uv>5) {
        uvEl.classList.add("redbg", "p-2");
    }
    uvEl.textContent = "UV Index: " + uv;
};

let displayForecast = function(forecast) {
    fiveDayEl.textContent = "5-Day Forecast";
    forecastEl.innerHTML = "";
    for(i=0; i<5; i++) {
        f = forecast[i];
        let cardEl = document.createElement("div");
            cardEl.classList.add("card", "bg-primary", "p-1", "m-2");
        let dateEl = document.createElement("h5");
            dateEl.textContent = f.day;
            cardEl.appendChild(dateEl);
        let forecastIconEl = document.createElement("img");
            forecastIconEl.src = "https://openweathermap.org/img/wn/" + f.icon + "@2x.png";
            cardEl.appendChild(forecastIconEl);
        let tempEl = document.createElement("p");
            tempEl.textContent = "Temperature: " + f.temp + " °F";
            cardEl.appendChild(tempEl);
        let humEl = document.createElement("p");
            humEl.textContent = "Humidity: " + f.humidity + "%";
            cardEl.appendChild(humEl);
        forecastEl.appendChild(cardEl);

    };

};

let searchSubmitHandler = function(event) {
    event.preventDefault();
    let city = cityInputEl.value.trim();

    if (city) {
        getWeatherToday(city);
        searchHistory.push(city);
        localStorage.setItem("city", JSON.stringify(searchHistory));
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
    
    console.log(searchHistory);

};

let loadCityInput = function() {
    searchHistory = JSON.parse(localStorage.getItem("city"));
        if (!searchHistory) {
            searchHistory = ["Search History"];

        } else {
            searchHistory
        }
    for(i=0; i<searchHistory.length; i++) {
        let cityEl = document.createElement("li");
        cityEl.classList.add("list-group-item");
        cityEl.addEventListener("click", function() {
            cityInputEl.value = cityEl.textContent;
            searchSubmitHandler;
            
        });
        cityEl.textContent = searchHistory[i];
        recentCitiesEl.appendChild(cityEl);
    }
};

let clearHistory = function() {
    localStorage.clear();
    loadCityInput();
    recentCitiesEl.innerHTML = "";
};

loadCityInput();

searchBtnEl.addEventListener("click", searchSubmitHandler);
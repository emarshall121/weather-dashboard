var searchEl = document.getElementById("searchButton")
var inputEl = document.getElementById("searchTermInput")
var searchTerm = ""
var searchHistory = []
var currentLocation;

// Grab user input for city and save to localStorage
searchEl.addEventListener("click", function(){
    event.preventDefault();
    searchTerm=inputEl.value;
    var newSearchTerm = inputEl.value;
    searchHistory.push(newSearchTerm);
    localStorage.setItem("cities", JSON.stringify(searchHistory));
    getWeather();
    displaySearchHistory();
})

// Render search history on page
var displaySearchHistory = function() {
    var historyEl = document.getElementById("searchHistory");
    for (i=0; i<searchHistory.length; i++) {
        var pastSearch = document.createElement("input");
    }
}

var getWeather = function () {
    // Display current weather for the selected city
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=03b8660b3c0063cd9b89194405afe9d0&units=imperial`)
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            // console.log(response)

            // Display current city
            document.getElementById("cityName").innerHTML = `${searchTerm}`
            var cityNameEl = document.createElement('p');
            cityNameEl.textContent=searchTerm

            // Display current weather icon
            var currentPicEl = document.querySelector("#icon");
            var iconId = response.weather[0].icon
            currentPicEl.setAttribute("src", `http://openweathermap.org/img/wn/${iconId}@2x.png`);

            // Display current temperature
            var currentTemp = response.main.temp;
            document.getElementById("temperature").innerHTML = `Temperature: ${currentTemp}`
            var tempEl = document.createElement('p');
            tempEl.textContent=currentTemp

            // Display current humidity
            var currentHumidity = response.main.humidity
            document.getElementById("humidity").innerHTML = `Humidity: ${currentHumidity}`
            var humidityEl = document.createElement('p');
            humidityEl.textContent=currentHumidity

            // Display current windspeed
            var currentWindspeed = response.wind.speed
            document.getElementById("windspeed").innerHTML = `Windspeed: ${currentWindspeed}`
            var windspeedEl = document.createElement('p');
            windspeedEl.textContent=currentWindspeed
        })
        .catch(function(error){
            console.log(error);
            
        })

    // Display 5 day weather
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=03b8660b3c0063cd9b89194405afe9d0&units=imperial
    `)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        console.log(response)

        // Displays the high for each day of the 5 day forcast
        for (i=0; i<response.list.length; i+=8){
            var newCardEl = document.createElement('div');
            newCardEl.className="card";
            document.querySelector('#forcastCardHolder').appendChild(newCardEl);
            var date = JSON.stringify(response.list[i].dt_txt);
            var dateSplit = date.split(" ");
            var dateFinal = dateSplit[0];
            var dateEl = document.createElement('p');
            dateEl.textContent=dateFinal;
            document.querySelector('#forcastCardHolder').appendChild(dateEl);
            var tempEl = document.createElement('p');
            tempEl.textContent = response.list[i].main.temp
            document.querySelector('#forcastCardHolder').appendChild(tempEl);
            var humidityEl = document.createElement('p');
            humidityEl.textContent=response.list[i].main.humidity;
            document.querySelector('#forcastCardHolder').appendChild(humidityEl);
        }

    })
    .catch(function(error){
        console.log(error);
        
    })

}

// UV Index
// var lat = ""
// var long = ""
// fetch("https://api.openweathermap.org/data/2.5/uvi?appid=7e4c7478cc7ee1e11440bf55a8358ec3&lat=")
// .then (function(response){
//     return response.json();
// })
// .then (function(reponse){
//     console.log(response);
// })

// render weather info on the page
// store user's search history (localStorage)
// display the search history
// UV index color coding
// 5 day forcast


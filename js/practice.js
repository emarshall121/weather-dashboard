// Variables
const searchTerm = "Tucson"



// Grab user input for city
var searchTerm = "Tucson"
// search for a city
// Get weather data from api

// one day weather - fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=03b8660b3c0063cd9b89194405afe9d0&units=imperial`)

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=03b8660b3c0063cd9b89194405afe9d0&units=imperial
`)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        console.log(response)
        var day1high = response.list[5].main.temp
        // document.querySelector("#day1high").innerHTML = day1high;

        // Displays the high for each day of the 5 day forcast
        for (i=5; i<response.list.length; i+=8){
            var tempEl = document.createElement('p');
            tempEl.textContent = response.list[i].main.temp
            document.querySelector('main').appendChild(tempEl);
        }

        for (i=5; i<response.list.length; i+=8){
            var tempEl = document.createElement('p');
            tempEl.textContent = response.list[i].dt_text
            document.querySelector('main').appendChild(tempEl);
        }


    })
    .catch(function(error){
        console.log(error);
        
    })
// render weather info on the page
// store user's search history (localStorage)
// display the search history
// UV index color coding
// 5 day forcast


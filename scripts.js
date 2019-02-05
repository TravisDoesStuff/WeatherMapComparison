let city1 = [];
let city1Data = [];
let city2 = [];
let city2Data = [];

let compareEnabled = false;

var map = L.map('map').setView([38.848389, -99.272461], 5);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(map);


function onMapClick(e) {
    let cityCoord = [e.latlng.lat.toString(), e.latlng.lng.toString()];
    let cityId = 0;

    if(city1.length === 0) {
        city1 = cityCoord;
        L.marker(city1).addTo(map);
        getCityData(city1, 1);
    }
    else if(city2.length === 0) {
        city2 = cityCoord;
        L.marker(city2).addTo(map);
        getCityData(city2, 2);
    } else {
        // remove all markers
    }
}

function getCityData(city, cityId) {
    let openWeatherMapKey = "";
    let weatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat="+city[0]+"&lon="+city[1]+"&units=imperial&appid="+openWeatherMapKey;

    fetch(weatherUrl)
        .then(res => res.json())
        .then(
            (result) => {
                displayCityData(result, cityId);
            },
            (error) => {

            }
        );
}

function displayCityData(data, cityId) {
    let tableCell = "city"+cityId;
    console.log(data);

    let weatherIcon = "<img src='https://openweathermap.org/img/w/"+data.weather[0].icon+".png'>"

    document.getElementById(tableCell+"_name").innerHTML = data.name;
    document.getElementById(tableCell+"_summary").innerHTML = weatherIcon + "<br>" + data.weather[0].main;

    document.getElementById(tableCell+"_temperature").innerHTML = Math.round(data.main.temp)+"&#176;F";
    document.getElementById(tableCell+"_humidity").innerHTML = data.main.humidity+"%";
    document.getElementById(tableCell+"_pressure").innerHTML = data.main.pressure+"hPa";

    // if(city1.length > 0 && city2.length > 0) {
    //     compareCities();
    // }
}

function compareCities() {

}

map.on('click', onMapClick);

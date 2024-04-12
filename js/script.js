const favoriteCity = document.querySelector('#favoriteCityBtn');
const themeToggle = document.querySelector('#themeBtn');
const submit = document.querySelector("#submitBtn");
const userCity = document.querySelector("#userCity");
const city = document.querySelector(".current-location");
const temperature = document.querySelector(".current-temp")
const weatherDescription = document.querySelector(".current-condition");
const weatherApiKey = 'fe330accdd6c57ffe4bd2ac73c28c373'



 const getWeatherData = () => {
    
    // Value of the city name from the user's input
    const cityName = userCity.value;

    // Alerts user if a city was not entered
    if (!cityName) alert("Please Enter A City");

    
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApiKey}&units=imperial`

    // Fetches the data from the weather api and displays it on the console
    fetch(weatherApi)
    .then(response => response.json())
    .then(data => {
    
        // Rounds the temperature values
        let mainTemp = Math.floor(Math.round(data.main.temp));
        let minTemp = Math.floor(Math.round(data.main.temp_min));
        let maxTemp = Math.floor(Math.round(data.main.temp_max));

        // Weather information is being displayed to the page
        city.innerHTML = `<h2>${data.name}, ${data.sys.country}</h2>`
        temperature.innerHTML = `
        <h4>Current Temp: ${data.main.temp}°F</h4>
        <h4>Min Temp: ${data.main.temp_min}°F</h4>
        <h4>Max Temp: ${data.main.temp_max}°F</h4>
        `
        weatherDescription.innerHTML = `<p>${data.weather[0].description}</p>`

        // console.log(data)
    } ).catch (() => {
        console.error();
    })
 }

//  Event Listener for the submit and it invokes the getWeatherData function
 submit.addEventListener("click", event => {
    event.preventDefault();
    getWeatherData()
});

    //api for current day forecast
    

    //api for five day forecast
    // const weatherFiveDayForecast = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}`

   

    //Possible ways to fetch the api data 
    /*
    const data = await fetch(weatherApi);
    const result = await data.json()
    console.log(result.data)
    */





//A way to possibly use the weather condition codes to determine the theme of the page


function weatherTheme (){
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApiKey}&units=imperial`
    const cityName = userCity.value;
    

    fetch(weatherApi)
     .then(response => response.json())
     .then(data => { 
        const currentWeatherId = data.weather[0].main
        if (currentWeatherId >= 200 && currentWeatherId < 600 ) {
            console.log("theme is rainy/thunderstorm/ drizzle")
          } else if (currentWeatherId >= 600 && currentWeatherId < 700){
             console.log("it's snowing")
          } else if (currentWeatherId >= 701 && currentWeatherId < 781) {
           console.log("your condition is random today and you can figure it out")
          } else if (currentWeatherId === 800) {
           console.log("clear skies")
          } else {
           console.log("cloudy days ahead")}
        }) .catch(() => {
            console.error();
        }) 
    }
     //document.createElement("p");
     //Posibly needs API Url to pull data from?
    



//toggling theme (placeholer)
// themeToggle.addEventListener("click", () =>{
//     document.body.classList.toggle('cloudy-theme');
// }

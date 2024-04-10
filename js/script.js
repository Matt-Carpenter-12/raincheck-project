const favoriteCity = document.getElementById$('favoriteCityBtn');
const themeToggle = document.getElementById('themeBtn');
const submit = document.getElementById("submitBtn");
const userCity = document.getElementById("userCity");
const location = document.getElementById("location");
const temperature = document.getElementById("temp")
const weatherDescription = document.getElementById("weather-description");
const weatherApiKey = 'fe330accdd6c57ffe4bd2ac73c28c373'



 const getWeatherData = () => {
    
    // Value of the city name from the user's input
    const cityName = userCity.value;

    // Alerts user if a city was not entered
    if (!cityName) alert("Please Enter A City");

    
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApiKey}`

    // Fetches the data from the weather api and displays it on the console
    fetch(weatherApi)
    .then(response => response.json())
    .then(data => {
        console.log(data)
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

/** 
function weatherConditionId (){
    const currentWeatherId = main.id
    const fiveDayForecastId = list.weather.id;


    const currentWeather = document.createElement("p");
    currentWeather.getAttribute('div', )

    if (currentWeatherId >= 200 && currentWeatherId < 600 ) {
        
        
        console.log("theme is rainy/thunderstorm/ drizzle")

    }else if (currentWeatherId >= 600 && currentWeatherId < 700){

        console.log("it's snowing")

    }else if (currentWeatherId >= 701 && currentWeatherId =< 781) {

        console.log("your condition is random today and you can figure it out")

    }else if (currentWeatherId === 800) {

        console.log("clear skies")
   }else {
    console.log("cloudy days ahead")
   }
}
*/
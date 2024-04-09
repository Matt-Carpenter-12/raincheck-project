const favoriteCity = $('#favoriteCityBtn');
const themeToggle = $('#themeBtn');
const submitBtn = $('#submitBtn');
const weatherApiKey = "9f93c87d7a3641b68c10eb22514cfde4";
const userCity = $('#userCity')



submitBtn.addEventListener("submit", (event) => {
    event.preventDefault();
    getWeatherData();
})

    
async function getWeatherData(city){

    //api for current day forecast
    const currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`

    //api for five day forecast
    // const weatherFiveDayForecast = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}`

    const response = await fetch(currentWeatherApi);
    console.log(response)


    //Possible ways to fetch the api data 
    /*
    const data = await fetch(weatherApi);
    const result = await data.json()
    console.log(result.data)
    */
}




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
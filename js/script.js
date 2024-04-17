const favoriteCity = document.querySelector('#favoriteCityBtn');
const themeToggle = document.querySelector('#themeBtn');
const submit = document.querySelector("#submitBtn");
const userCity = document.querySelector("#userCity");
const city = document.querySelector(".current-location");
const temperature = document.querySelector(".current-temp")
const weatherDescription = document.querySelector(".current-condition");
const weatherApiKey = 'fe330accdd6c57ffe4bd2ac73c28c373'
const container = document.querySelector('.container');

const musicSection = document.querySelector(".music")
const playlistOne = document.querySelector(".playlist-one")
const playlistTwo = document.querySelector(".playlist-two")
let searchPlaylistTitle = "";
const favoritesArray = []

 const getWeatherData = () => {
    
    // Value of the city name from the user's input
    const cityName = userCity.value;

    // Alerts user if a city was not entered
    if (!cityName) alert("Please Enter A City");

    
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApiKey}&units=imperial`

    // Fetches the data from the weather API
    fetch(weatherApi)
    .then(response => response.json())
    .then(data => {
        favoritesArray.push(cityName)
        localStorage.setItem("favorites", JSON.stringify(favoritesArray))
        console.log("favoritesArray", favoritesArray)
         //creates weather id to mark weather conditions
        const currentWeatherId = data.weather[0].id

        getWeatherID(currentWeatherId);
        
        // Rounds the temperature values
        let mainTemp = Math.floor(Math.round(data.main.temp));
        let minTemp = Math.floor(Math.round(data.main.temp_min));
        let maxTemp = Math.floor(Math.round(data.main.temp_max));

        // Weather information is being displayed to the page
        city.innerHTML = `<h2>${data.name}, ${data.sys.country}</h2>`
        temperature.innerHTML = `
        <h3>${mainTemp}°F</h3>
        <p>L: ${minTemp}°F | H: ${maxTemp}°F</p>
        `
        weatherDescription.innerHTML = `<p>${data.weather[0].main}</p>`
        userCity.value = "" 
        // console.log(data)
    } ).catch (() => {
        console.error();
    })
 }


function getWeatherID(currentWeatherId) {
    const root = document.querySelector(':root')
    if (currentWeatherId >= 200 && currentWeatherId < 600 ) {
        //changes theme in CSS
        root.style.setProperty('--bg-pic', 'url(./Images/rain-bg.jpg)')
        const img = getComputedStyle(root).getPropertyValue('--big-pic');
        root.style.setProperty('--primary-color', '#e7fbfb')
        const background = getComputedStyle(root).getPropertyValue('--primary-color');
        searchPlaylistTitle = "rainy";

      } else if (currentWeatherId >= 600 && currentWeatherId < 700){
        root.style.setProperty('--bg-pic', 'url(./Images/snow-bg.jpg)')
        const img = getComputedStyle(root).getPropertyValue('--big-pic');
        root.style.setProperty('--primary-color', '#e7eaef')
        const background = getComputedStyle(root).getPropertyValue('--primary-color');
         searchPlaylistTitle = "snowy-day";
       
      } else if (currentWeatherId >= 701 && currentWeatherId < 781) {
       searchPlaylistTitle ="unusual-weather";
    
      } else if (currentWeatherId === 800) {
        root.style.setProperty('--bg-pic', 'url(./Images/sunny-bg.jpg)')
        const img = getComputedStyle(root).getPropertyValue('--big-pic');
        root.style.setProperty('--primary-color', '#f3f6ec')
        const background = getComputedStyle(root).getPropertyValue('--primary-color');
       searchPlaylistTitle = "sunny";
  
      } else { //changes theme in CSS
        root.style.setProperty('--bg-pic', 'url(./Images/cloudy-bg.jpg)')
        const img = getComputedStyle(root).getPropertyValue('--big-pic');
        root.style.setProperty('--primary-color', '#dce4f2')
        const background = getComputedStyle(root).getPropertyValue('--primary-color');
       searchPlaylistTitle = "cloudy";
   
      }
    // GetToken funtion is being called with the input of a possible playlist title to be searched
    getToken(searchPlaylistTitle)
}

//  Event Listener for the submit and it invokes the getWeatherData function
 submit.addEventListener("click", event => {
    event.preventDefault();
    getWeatherData()
});


// Function to get the Spotify access token to be used with an API call for a playlist 
function getToken(searchPlaylistTitle) {

    const clientId = 'adda26d9e1f84220ae4acd844e4516f3';
    const clientSecret = '61627fc566894be5bf4cf0176b120df7';

    const url ='https://accounts.spotify.com/api/token';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    }
    fetch(url, options)
    .then(response => response.json())
    .then(data => {

        searchForPlaylist(data.access_token, searchPlaylistTitle)

    }).catch(() => {
        console.error
    })
} 


// Function takes the input of the token to make an API call and the input of a search value for the playlist
function searchForPlaylist(token, search) {
    const playlistThree = document.querySelector(".playlist-three")
    const playlistUrl = `https://api.spotify.com/v1/search?q=${search}&type=playlist&limit=50&offset=0`;

    const options = {
        method: 'GET',
        headers: {
            Authorization : `Bearer ${token}`
        }
    }
    fetch(playlistUrl, options)
    .then(response => response.json())
    .then(data => {

        // Selects a random playlist index
        let randomNumOne = Math.floor(Math.random() * 50);
        let randomNumTwo = Math.floor(Math.random() * 50);
        let randomNumThree = Math.floor(Math.random() * 50);


        // Makes sure the same two playlists are not shown
        if (randomNumTwo === randomNumOne || randomNumOne === randomNumThree) {
            randomNumTwo = Math.floor(Math.random() * 50);
        }

        const playlistOneId = data.playlists.items[randomNumOne].id;
        const playlistTwoId = data.playlists.items[randomNumTwo].id;
        const playlistThreeId = data.playlists.items[randomNumThree].id;

        // Src for the embedded playlists are added to index.html
        playlistOne.setAttribute("src", `https://open.spotify.com/embed/playlist/${playlistOneId}`)
        playlistTwo.setAttribute("src", `https://open.spotify.com/embed/playlist/${playlistTwoId}`)
        playlistThree.setAttribute("src", `https://open.spotify.com/embed/playlist/${playlistThreeId}`)

        // Displays the playlist section
        musicSection.style.display = 'block';

    }).catch (() => {
        console.error
    })
}

function favorites(){
    console.log("favorites clicked...")
    const savedFavs = JSON.parse(localStorage.getItem("favorites"))
    console.log("savedFavs", savedFavs)
   
}
document.addEventListener("DOMContentLoaded", function(){
    favoriteCity.addEventListener("click", favorites)})


















    //api for current day forecast
    

    //api for five day forecast
    // const weatherFiveDayForecast = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}`

   

    //Possible ways to fetch the api data 
    /*
    const data = await fetch(weatherApi);
    const result = await data.json()
    console.log(result.data)
    */



//toggling theme (placeholer)
// themeToggle.addEventListener("click", () =>{
//     document.body.classList.toggle('cloudy-theme');
// }

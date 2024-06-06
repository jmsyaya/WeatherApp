import config from './config.js';

const API_KEY = config.apiKey;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=kr&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather_icon")

// async -> 비동기 작업. 
//async 함수 안에서 await 키워드를 사용하면, 해당 비동기 작업이 완료될 때까지 코드 실행을 일시 중지하고 결과를 기다린 다음, 해당 결과를 반환.
async function checkWeather(city) {                                     

    // fetch()로 url을 통해 원하는 API의 결과값을 받아올 수 있음.
    const response = await fetch(apiUrl + city + `&appid=${API_KEY}`);   
    
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();


        // 받아오는 값 안에서 name 값, main 안에 있는 temp값 humidity값, wind 안에 있는 speed값을 선택해서 불러옴.
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
    
        if(data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if(data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if(data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }
    
        document.querySelector(".weather").style.display = "block"; // 검색창에 입력한 값을 바탕으로 날씨 정보를 디스플레이화 함.
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})
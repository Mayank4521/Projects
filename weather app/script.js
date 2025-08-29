const apikey = "232f1a0316df9706867d29083202724e"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const searchin = document.querySelector("#searchin")    
const searchbtn = document.querySelector("#searchbtn")    
const weatherIcon = document.querySelector("#weather-icon")

async function checkWeather(city) {
    city = city.trim()

    if(!city) return;


    try{
    const response = await fetch(apiUrl + city + `&appid=${apikey}`)


    if(response.status===404){
        document.querySelector(".error").style.display = 'block'
        document.querySelector("#stats").style.display = 'none'
    }
    else{
    const data = await response.json()

    console.log(data)
    document.querySelector("#temperature").innerHTML= Math.round(data.main.temp) + "°C"
    document.querySelector("#city").innerHTML = data.name
    document.querySelector(".humidity").innerHTML= data.main.humidity+" %"
    document.querySelector(".wind").innerHTML= data.wind.speed+" km/h"

    if(data.weather[0].main == 'Clouds'){
        weatherIcon.src = './images/cloud.png'
    }
    else if(data.weather[0].main == 'Rain'){
        weatherIcon.src = './images/rain-cloud.png'
    }
    else if(data.weather[0].main == 'Clear'){
        weatherIcon.src = './images/sun.png'
    }
    else if(data.weather[0].main == 'Drizzle'){
        weatherIcon.src = './images/partly cloud.png'
    }

    document.querySelector("#stats").style.display = 'block'
    document.querySelector(".error").style.display = 'none'
}
}catch(error){
    document.querySelector("#stats").style.display = 'none'
    document.querySelector(".error").style.display = 'block'
    console.log("Error fechting data: " ,error)
}
}

searchbtn.addEventListener("click",function(){
    checkWeather(searchin.value)
})

let $showForecastBtn = document.querySelector('#show-forecast-button')
let $mainPage = document.querySelector('.main-page')
let $forecastPage = document.querySelector('.forecast-page')

let $currentImg = document.querySelector('#current-img')



let $currentForecast = document.querySelector('.current-forecast')

let $hourlyForecast = document.querySelector('.hourly-forecast')
let $hourlyForecastDivs = document.querySelectorAll('.hourly-forecast div')

let $dailyForecast = document.querySelector('.daily-forecast')
let $dailyForecastDivs = document.querySelectorAll('.daily-forecast div')











let $clock = document.querySelector('.clock')

$clock.innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}`

let interval = setInterval(()=>{
    if (new Date().getHours() < 10 && new Date().getMinutes() < 10) {
        $clock.innerHTML = `0${new Date().getHours()}:0${new Date().getMinutes()}`
    }   else if (new Date().getHours() >= 10 && new Date().getMinutes() < 10){
        $clock.innerHTML = `${new Date().getHours()}:0${new Date().getMinutes()}`
    }   else if (new Date().getHours() < 10 && new Date().getMinutes() >= 10){
        $clock.innerHTML = `0${new Date().getHours()}:${new Date().getMinutes()}`
    }   else{
        $clock.innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}`
    }
}, 1000)




let key = "2cfda1f27f8f18422038c85cc30073ad"
// let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=42.882004&lon=74.582748&cnt=14&appid=${apiKey}`

// let lat = navigator.geolocation.getCurrentPosition(position => position.coords.latitude)
// let lon = navigator.geolocation.getCurrentPosition(position => position.coords.longitude)

// let key = "5bc031c279acd1a2ab229b70ca46786d"
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${42.8}&lon=${74.582748}&lang=ru&units=metric&appid=${key}`

let months = ['Января', "Февраля", "Апреля", "Марта", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]


fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data.current.weather[0]);
        // $currentImg.setAttribute("src", `https:${data.current.condition.icon}`)


        // function condition(el) {
        //     if (el == 'Clear') {
        //         return 'Ясно'
        //     }
        //     if (el == 'Partly cloudy') {
        //         return 'Переменная облачность'
        //     }
        //     if (el == 'Cloudy') {
        //         return 'Облачно'
        //     }
        //     if (el == 'Sunny') {
        //         return 'Солнечно'
        //     }
        //     if (el == 'Overcast') {
        //         return 'Пасмурно'
        //     }
        // }
        
        // console.log(data.current.condition.text);



        $currentForecast.innerHTML = `
            <h3>${data.timezone}</h3>
            <h1>${Math.round(data.current.temp)}</h1>
            <p>${data.current.weather[0].description[0].toUpperCase() + data.current.weather[0].description.slice(1)}</p>
            <p>Макс: ${Math.round(data.daily[0].temp.max)}°, мин: ${Math.round(data.daily[0].temp.min)}°</p>
        `

        $hourlyForecastDivs[0].innerHTML = `
            <p>${data.daily[0].weather[0].description[0].toUpperCase() + data.daily[0].weather[0].description.slice(1)} до конца дня.</p>
            <p>Порывы ветра до ${data.current.wind_gust} км/ч.</p>
        `

        data.hourly.forEach((elem, index) => {
            let hour = new Date().getHours() + index

            if (index < 24) {
                $hourlyForecastDivs[1].insertAdjacentHTML('beforeend', `
                <div class="hourly-forecast-card">
                    <p>${index == 0 ? '' : (hour - 24 * Math.floor(hour/24)) < 10 ? '0' : ''}${index  ==  0  ?  'Сейчас'  :  hour < 24  ?  hour + ':00'  :  hour - 24 * Math.floor(hour/24) + ':00'}</p>
                    <img src="https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png">
                    <h4>${Math.round(elem.temp)}°</h4>
                </div>
            `)
            }
        })

        let sunset = new Date(1677116897)

        console.log(sunset);






        $dailyForecastDivs[0].innerHTML = `
            <img src="./img/calendar.svg">
            Прогноз на 8 дней
        `





        let weekDays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]


        data.daily.forEach((elem, index) => {
            $dailyForecastDivs[1].insertAdjacentHTML('beforeend', `
                <div class="daily-forecast-card">
                    <h2>${index == 0 ? 'Сегодня' : weekDays[new Date(elem.dt*1000).getDay()]}</h2>
                    <img src="https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png">
                    <div class="temp">
                        <p>${elem.temp.min}°</p>
                        <div class="temp-scale">
                            <div class="left" style="width: ${elem.temp.min < 0 ? 50-50/(10/elem.temp.min*-1) : 50-50/(30/elem.temp.min)}%;"></div>
                            <div class="temp-scale-gradient"></div>
                            <div class="right"></div>
                        </div>
                        <p style="text-align: right;" style="width: 0%;">${elem.temp.max}°</p>
                    </div>
                </div>
            `)
        })


    })
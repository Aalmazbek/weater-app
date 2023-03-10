

let $select = document.querySelector('change', function(){
})



let $body = document.querySelector('body')

window.addEventListener('scroll', function(){
    if (document.documentElement.scrollTop > 20) {
        $currentForecast.style.boxShadow = '0 0 10px 2px rgba(0, 0, 0, 0.3)'
    }   else{
        $currentForecast.style.boxShadow = '0 0 10px 2px rgba(0, 0, 0, 0)'
    }
})












// let $clock = document.querySelector('.clock')

// $clock.innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}`

// let interval = setInterval(()=>{
//     if (new Date().getHours() < 10 && new Date().getMinutes() < 10) {
//         $clock.innerHTML = `0${new Date().getHours()}:0${new Date().getMinutes()}`
//     }   else if (new Date().getHours() >= 10 && new Date().getMinutes() < 10){
//         $clock.innerHTML = `${new Date().getHours()}:0${new Date().getMinutes()}`
//     }   else if (new Date().getHours() < 10 && new Date().getMinutes() >= 10){
//         $clock.innerHTML = `0${new Date().getHours()}:${new Date().getMinutes()}`
//     }   else{
//         $clock.innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}`
//     }
// }, 1000)










let url
let currentLat
let currentLon
let currentCityGeo

let key = "2cfda1f27f8f18422038c85cc30073ad"
// let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=42.882004&lon=74.582748&cnt=14&appid=${apiKey}`

// let lat = navigator.geolocation.getCurrentPosition(position => position.coords.latitude)
// let lon = navigator.geolocation.getCurrentPosition(position => position.coords.longitude)

// let key = "5bc031c279acd1a2ab229b70ca46786d"

const citiesGeolocation = [
    {
        name: "Бишкек",
        lat: 42.874622,
        lon: 74.569763
    },
    {
        name: "Каракол",
        lat: 42.492039,
        lon: 78.381821
    },
    {
        name: "Нарын",
        lat: 41.426350,
        lon: 75.991058
    },
    {
        name: "Ош",
        lat: 40.513996,
        lon: 72.816101
    },
    {
        name: "Джалал-Абад",
        lat: 40.925984,
        lon: 73.001030
    },
    {
        name: "Баткен",
        lat: 40.062590,
        lon: 70.819390
    },
    {
        name: "Талас",
        lat: 42.522770,
        lon: 72.242740
    },
    {
        name: "Балыкчы",
        lat: 42.460170,
        lon: 76.187090
    }
]



let weatherCitiesArray

function refreshLocalStorage(){
    if (JSON.parse(localStorage.getItem('weatherCities')) != undefined) {
        weatherCitiesArray = JSON.parse(localStorage.getItem('weatherCities'))
        weatherCitiesArray = weatherCitiesArray.filter((elem, index, arr) => arr.findIndex(item => item.name == elem.name) === index)
        console.log(weatherCitiesArray);
    }   else{
        weatherCitiesArray = []
    }
    // location.reload()
}

refreshLocalStorage()





let months = ['Января', "Февраля", "Апреля", "Марта", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]
let weekDays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]

    
navigator.geolocation.getCurrentPosition(function(position) {
    currentLat = position.coords.latitude
    currentLon = position.coords.longitude
    // console.log(currentLat);
    // console.log(currentLon);

    
    
    // citiesGeolocation.forEach(elem => {
    //     if (currentLat.toFixed(1) == elem.lat.toFixed(1) && currentLon.toFixed(1) == elem.lon.toFixed(1)) {
    //         // weatherCitiesArray.splice(weatherCitiesArray.findIndex(item => item.name == elem.name), 1)
    //         if (weatherCitiesArray.findIndex(item => item.name == elem.name) > -1) {
    //             console.log(elem.name);
    //             weatherCitiesArray.splice(weatherCitiesArray.findIndex(item => item.name == elem.name), 1)
    //         }
    //     }
    // })
    
    weatherCitiesArray.forEach(elem => {
        url = `https://api.openweathermap.org/data/2.5/onecall?lat=${elem.lat}&lon=${elem.lon}&lang=ru&units=metric&appid=${key}`
    
        fetchApi(url)
    })

    if (currentLat != undefined && currentLon != undefined) {
        // setTimeout(function(){
            
        citiesGeolocation.forEach((elem, index, arr) => {
            if (currentLat.toFixed(1) == elem.lat.toFixed(1) && currentLon.toFixed(1) == elem.lon.toFixed(1)) {
                currentCityGeo = elem.name
                if (weatherCitiesArray.findIndex(item => item.name == elem.name) < 0 ) {
                    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${elem.lat}&lon=${elem.lon}&lang=ru&units=metric&appid=${key}`
                    fetchApi(url)
    
                    weatherCitiesArray.push(elem)
                    localStorage.setItem('weatherCities', JSON.stringify(weatherCitiesArray))
                }
            }
        })


        // }, 1000)

    }
})





let $cityControl = document.querySelector('.city-control')
let $cityControlCloseBtn = document.querySelector('.city-control > img')
let $cityControlInput = document.querySelector('.city-control .input input')
let $cityControlCities = document.querySelector('.city-control .cities')
let $cityControlSearchResults = document.querySelector('.city-control .search-results')

$cityControlCloseBtn.addEventListener('click', closeCityControl)

function closeCityControl() {
    $cityControl.style.transform = "translateX(100%)"
}


function openCityControl() {
    $cityControl.style.transform = "translateX(0%)"
}



$cityControlInput.addEventListener('input', function(){
    if ($cityControlInput.value != '') {
        $cityControlCities.classList.add('hide')
        $cityControlSearchResults.classList.remove('hide')

        $cityControlSearchResults.innerHTML = ''

        citiesGeolocation.forEach(elem => {
            if ($cityControlInput.value.toUpperCase() == elem.name.slice(0, $cityControlInput.value.length).toUpperCase()) {
                if (weatherCitiesArray.findIndex(item => item.name == elem.name) < 0) {
                    console.log(elem.name);
                    $cityControlSearchResults.insertAdjacentHTML('afterbegin', `
                        <div class="search-result">
                            <h2>${elem.name}</h2>

                            <p class="hide">Добавлено</p>
                            <img src="./img/plus.svg">
                        </div>
                    `)
                }   else{
                    $cityControlSearchResults.insertAdjacentHTML('afterbegin', `
                        <div class="search-result">
                            <h2>${elem.name}</h2>

                            <p>Добавлено</p>
                            <img class="hide" src="./img/plus.svg">
                        </div>
                    `)
                }

                $cityControlSearchResults.firstElementChild.lastElementChild.addEventListener('click', function(){
                    weatherCitiesArray.push(citiesGeolocation[citiesGeolocation.findIndex(item => item.name == elem.name)])
                    console.log(weatherCitiesArray);
                    localStorage.setItem('weatherCities', JSON.stringify(weatherCitiesArray))
                })
            }
        })

    }   else{
        $cityControlCities.classList.remove('hide')
        $cityControlSearchResults.classList.add('hide')
    }
})


// citiesGeolocation.forEach(elem => {
//     $cityControlCities.insertAdjacentHTML('beforeend', `
//         <div>
//             <h1>${elem.name}</h1>
//         </div>
//     `)
// })




















function fetchApi(url) {
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


            createCitiesSliderPage(data)
        })
}




let $citiesSlider = document.querySelector('.cities-slider')

function createCitiesSliderPage(data){

    let currentCityName
    
    citiesGeolocation.forEach(elem => {
        if (data.lat.toFixed(1) == elem.lat.toFixed(1) && data.lon.toFixed(1) == elem.lon.toFixed(1)) {
            currentCityName = elem.name
            // weatherCitiesArray.splice(weatherCitiesArray.findIndex(item => item.name == elem.name), 1)
            console.log(weatherCitiesArray);
            console.log(elem.name);
        }
    })



    $citiesSlider.insertAdjacentHTML('afterbegin', `
        <div style="${currentCityName == currentCityGeo ? "order: -1;" : ""}" class="cities-slider-page">
            <div class="current-forecast"></div>

            <div class="hourly-forecast">
                <div></div>
                <hr>
                <div></div>
            </div>

            <div class="daily-forecast">
                <div></div>
                <hr>
                <div></div>
            </div>
        </div>
    `)





    let $showForecastBtn = document.querySelector('#show-forecast-button')
    let $mainPage = document.querySelector('.main-page')
    let $forecastPage = document.querySelector('.forecast-page')

    let $currentImg = document.querySelector('#current-img')



    let $currentForecast = document.querySelector('.current-forecast')

    let $hourlyForecast = document.querySelector('.hourly-forecast')
    let $hourlyForecastDivs = document.querySelectorAll('.hourly-forecast div')

    let $dailyForecast = document.querySelector('.daily-forecast')
    let $dailyForecastDivs = document.querySelectorAll('.daily-forecast div')




    
    
    
    
    
    $currentForecast.innerHTML = `
    <img src="./img/plus.svg" alt="">
    <h3>${currentCityName}</h3>
    <h1>${Math.round(data.current.temp)}</h1>
    <p>${data.current.weather[0].description[0].toUpperCase() + data.current.weather[0].description.slice(1)}</p>
    <p>Макс: ${Math.round(data.daily[0].temp.max)}°, мин: ${Math.round(data.daily[0].temp.min)}°</p>
    `
    
    $currentForecast.firstElementChild.addEventListener('click', openCityControl)

    $hourlyForecastDivs[0].innerHTML = `
        <p>${data.daily[0].weather[0].description[0].toUpperCase() + data.daily[0].weather[0].description.slice(1)} до конца дня.</p>
        <p>Порывы ветра до ${data.current.wind_gust} км/ч.</p>
    `

    data.hourly.forEach((elem, index) => {
        let hour = new Date().getHours() + index

        if (index < 24) {
            $hourlyForecastDivs[1].insertAdjacentHTML('beforeend', `
            <div class="hourly-forecast-card">
                <p>${index  ==  0  ?  'Сейчас'  :  hour < 24  ?  hour  :  hour - 24 * Math.floor(hour/24)}</p>
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





    let minTemp = data.daily.concat()
    let maxTemp = data.daily.concat()

    minTemp.sort((a, b) => a.temp.min > b.temp.min ? 1 : -1)
    maxTemp.sort((a, b) => a.temp.max > b.temp.max ? -1 : 1)
    // console.log(minTemp[0].temp.min);
    // console.log(maxTemp[0].temp.max);

    minTemp = minTemp[0].temp.min
    maxTemp = maxTemp[0].temp.max

    console.log(minTemp);
    console.log(maxTemp);





    data.daily.forEach((elem, index) => {
        $dailyForecastDivs[1].insertAdjacentHTML('beforeend', `
            <div class="daily-forecast-card">
                <h2>${index == 0 ? 'Сегодня' : weekDays[new Date(elem.dt*1000).getDay()]}</h2>
                <img src="https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png">
                <div class="temp">
                    <p>${elem.temp.min.toFixed(1)}°</p>
                    <div class="temp-scale">
                        <div class="left" style="width: ${elem.temp.min > minTemp ? (100/(maxTemp/elem.temp.min)) + 4 : 0 + 4}%;"></div>
                        <div class="right" style="width: ${elem.temp.max < maxTemp ? (100/(elem.temp.max/minTemp)) + 4 : 0 + 4}%;"></div>
                    </div>
                    <p style="text-align: right;" style="width: 0%;">${elem.temp.max.toFixed(1)}°</p>
                </div>
            </div>
        `)
    })


    $cityControlCities.insertAdjacentHTML('afterbegin', `
        <div class="card">
            <div>
                <h2>${currentCityName}</h2>
                <p>${Math.round(data.daily[0].temp.max)}° / ${Math.round(data.daily[0].temp.min)}°</p>
            </div>

            <h1>${Math.round(data.current.temp)}°</h1>
        </div>
    `)
}




















let touchstartX = 0
let touchendX = 0
    
function checkDirection() {
    if (touchendX < touchstartX && touchendX - touchstartX < -100) {
        swipeLeft()
        // console.log(touchendX - touchstartX);
    }
    if (touchendX > touchstartX && touchendX - touchstartX > 100) {
        swipeRight()
    }
}

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
})

document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    checkDirection()
})




let translateX = 0

function swipeLeft(){
    // console.log('swiped left')
    if (translateX > (-100 + 100/$citiesSlider.childElementCount) && $citiesSlider.childElementCount > 1) {
        translateX += (-100/$citiesSlider.childElementCount)
        $citiesSlider.style.transform = `translateX(${translateX}%)`
    }
}

function swipeRight(){
    if (translateX < 0) {
        translateX += (100/$citiesSlider.childElementCount)
        $citiesSlider.style.transform = `translateX(${translateX}%)`
    }
}











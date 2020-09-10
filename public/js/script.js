const filterResult = document.querySelector(".filter");
const date = document.querySelector(".date");
const exactDateArr = Date().split("G");
const exactDate = exactDateArr[0];

const populateField = (data) => {
  let weatherForcastSection = document.querySelector(".weather-forcast");
  console.log(weatherForcastSection);
  weatherForcastSection.innerHTML = `
  <div class="container">
  <h3 class='date'>${exactDate}</h3>
  <div class="weather-img">
    <img class='weather' src="./img/${(data.weather[0].main)}.png" alt="rainy">
  </div>
  <div class="weather-information flex">
    <div>
      <h1 class='country-name'><i class="fa fa-map-marker"> </i>  ${data.name}</h1>
      <div>
        <h3 class="weather-temperature"><i class="fa fa-thermometer-full"> </i> ${data.main.temp}</h3>
      </div>
    </div>
    <div class="weather-details">
      <h1 class="weather-main">${data.weather[0].main}</h1>
      <div class="weather-description flex">
      <img class='weather' src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="rainy">
       <h2> ${data.weather[0].description}</h2>
      </div>
    </div>
  </div>
  
  <div class="other-info flex grid">
    <div class="wind">
      <h3 class='title'><i class="fas fa-wind"></i> Wind</h3>
      <h4>Speed: <span class="wind-speed">${data.wind.speed}</span></h4>
      <h4>Degree: <span class="wind-degree">${data.wind.deg}</span></h4>
    </div>

    <div class="Temperature">
      <h3 class='title'> <i class="fa fa-thermometer-full"></i> Temperature</h3>
      <h4>Minimum: <span class="temperature-min">${data.main.temp_min}</span></h4>
      <h4>Maximum: <span class="temperature-max">${data.main.temp_max}</span></h4>
    </div>

    <div>
      <h3 class='title'> <i class="fa fa-map-pin"></i> Pressure</h3>
      <h4 class='pressure'>${data.main.pressure}</h4>
    </div>

    <div>
      <h3 class='title'><i class="fa fa-map-pin"></i> Humidity</h3>
      <h4 class='humidity'>${data.main.humidity}</h4>
    </div>
  </div>

</div>`;
};

const storeInLocalStorage = (data) => {
  window.localStorage.setItem("data", JSON.stringify(data));
  let dataStored = JSON.parse(window.localStorage.getItem("data"));
  populateField(dataStored);
};

const fetchWeatherDetails = (countryName) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=bfbe3b863ee632b59db77a6f2736c9f0`
  )
    .then(async (response) => {
      const data = await response.json();
      console.log(data);
      storeInLocalStorage(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getCountryName = (e) => {
  fetchWeatherDetails(e.target.value);
};
if(localStorage.getItem('data')){
  let dataStored = JSON.parse(window.localStorage.getItem("data"));
  populateField(dataStored);
}else{
  fetchWeatherDetails("New York City");

}



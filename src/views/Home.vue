<template>

  <div class="weatherUI" v-if="loadComplete">
    <div class="left">
      <div class="location">
        <h1>{{userLocation.city}}</h1>
        <span>{{userLocation.country}}</span>
      </div>
      <div class="update">
        <span>{{currentTemp.time}}</span>
      </div>
      <div class="main-info">
        <div class="info-card">
          <span>{{currentTemp.description}}</span>
          <h1>{{currentTemp.temp}}</h1>
        </div>
        <div class="icon">
          <img :src="getImage(currentTemp.weatherIcon)" alt="weather">
        </div>
      </div>
    </div>

    <div class="right">
      <div class="searchBar">
        <form @submit.prevent= "getData">
          <input type="text" v-model="cityName" maxlength="15" required>
          <span class="material-icons">search</span>
        </form>

        <div class="buttons">
          <button 
          @click="toggleDetails = true, toggleGraph = false">More Details</button>
          <button @click="toggleGraph= true, toggleDetails = false">Temp Graph</button>
        </div>
      </div>

      <div class="extraDetails">
        <div class="extraDetails-card">
          
          <MoreDetail :currentTemp ="currentTemp" v-if="toggleDetails" />
          
          <div class="demo-graph" v-if="toggleGraph">
            <div class="chartArea">
              <Chart :chartData="hourlyTempList"  :options="chartOptions" label="Temperature" :chartColors="chartColors"></Chart>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>


  <div class="secondary" v-if="loadComplete">
    <DailyTemp :dailyTempList ="dailyTempList" />
  </div>


</template>

<script>
import { ref } from '@vue/reactivity'
import getGeolocation from '../composables/getGeolocation'
import getWeather from '../composables/getWeather'
import getDateTime from '../composables/getDateTime'
import sortDailyTemp from '../composables/sortDailyTemp'
import sortHourlyTemp from '../composables/sortHourlyTemp'
import DailyTemp from '../components/DailyTemp.vue'
import Chart from '../components/Chart.vue'
import MoreDetail from '../components/MoreDetail.vue'




// import HourlyTempGraph from '../components/HourlyTempGraph.vue'


export default {
  name: 'Home',
  components: {
    DailyTemp,
    Chart,
    MoreDetail
    
  },
  setup(){
    const cityName = ref('london')
    const countryCode =ref('gb')

    const userLocation = ref('')
    
    const currentTemp = ref(null)
    const dailyTempList = ref(null)
    const hourlyTempList = ref({})

    //handles component loading
    const loadComplete = ref(false)

    //handles detail card toggles
    const toggleDetails = ref(false)
    const toggleGraph = ref(false)

    //calls composable functions
    const {geoData, getGeoData} = getGeolocation()
    const {weatherData, getWeatherData} = getWeather()
    const {convertDateTime} = getDateTime()
    const {timeTempWeather} = sortDailyTemp()
    const {hourlyWeather} = sortHourlyTemp()


    //chart properties
    const chartColors = ref({
      borderColor: "#82ac75",
      pointBorderColor: "#439473" ,
      pointBackgroundColor: "#cee5d0" ,
      backgroundColor: "#cee5d0"
    })

    //styling chart
    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: true ,
      spanGaps:true,
      legend:{
        display:false
      },
      tooltips:{
        enabled:true
      },
      elements:{
        point:{
          radius: 0.7
        }
      },
      scales:{
        xAxes:{
          display: true,
          color: '#191'
        },
        yAxes:[{
          ticks: {
            beginAtZero: false,
          }
        }]
        }
      }
    )

    //handle dynamic pictures
    const getImage = (path) =>{
        return require(`../weather-Icons/${path}.svg`)
      }



    //fetching gps location and weather data
    const getData = async() =>{
      await getGeoData(cityName.value, countryCode.value)
      userLocation.value = {
        city: geoData.value[0].name,
        country: geoData.value[0].country}
      await getWeatherData(geoData.value[0].lat, geoData.value[0].lon)

      //assign current weather values
      currentTemp.value ={
        time: convertDateTime(weatherData.value.current.dt, weatherData.value.timezone),
        uvi: weatherData.value.current.uvi,
        pressure: weatherData.value.current.pressure,
        temp : Math.round(weatherData.value.current.temp),
        feelsLike : weatherData.value.current.feels_like,
        humidity : weatherData.value.current.humidity,
        windSpeed : weatherData.value.current.wind_speed,
        clouds: weatherData.value.current.clouds,
        description : weatherData.value.current.weather[0].description,
        weatherIcon: weatherData.value.current.weather[0].icon
      }

      //generate list with daily values (3 days)
      dailyTempList.value = timeTempWeather(weatherData.value.daily, weatherData.value.timezone)

      //generate list with hourly values (24hrs)
      hourlyTempList.value = hourlyWeather(weatherData.value.hourly, weatherData.value.timezone)


      //enables components to render
      loadComplete.value=true
      toggleDetails.value =true
      toggleGraph.value = false

      //clears input value after loading
      cityName.value =""      
    }

    getData()

    
    
    return {
    cityName,
    countryCode,
    userLocation,
    geoData,
    weatherData, 
    getData,
    getGeoData,
    getWeatherData,
    convertDateTime,
    timeTempWeather,
    dailyTempList,
    hourlyTempList,
    loadComplete,
    chartOptions,
    chartColors,
    currentTemp,
    getImage,
    toggleDetails,
    toggleGraph
    }

  }
}
</script>

<style >

@import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Bitter&family=Poppins&display=swap');

  .weatherUI{
    width: 45vw;
    height: 36vh;

    max-height: 300px;
    max-width: 600px;

    min-width: 600px;
    min-height: 300px;

    background: #1F1F1F;
    margin-top: 5em;
    border-radius: 25px;
    margin-left: auto;
    margin-right: auto;
    
    display: flex;
  }

  .left, .right{
    height: 100%;
    width: 50%;
  }

  .left{
    display:flex;
    flex-direction: column;
  }

  .location{
    width: 100%;
    height:15%;
    display: flex;
    text-align: center;
   
  }
  .location h1{
    margin: 0;
    margin-left: 0.8em;
    margin-top: 0.3em;
    color:#F8F8F8;
    font-family: Poppins;
  }

  .location span{
    align-self: center;
    margin-left: 0.5em;
    color: #F8F8F8;
    border: 2px solid none;
    border-radius: 15px;
    font-size: 0.55em;
    padding: 0.4em;
    background: rgb(69,8,170);
    background: linear-gradient(85deg, rgba(69,8,170,1) 0%, rgba(151,92,208,1) 1%, rgba(198,58,197,1) 42%, rgba(242,75,140,1) 73%, rgba(252,122,133,1) 91%);
    font-family: Poppins;

  }

  .update{
    width: 100%;
    height: 5%;
    margin-left: 2em;
    font-family: Poppins;
    font-size: 0.8em;

  }

  .update span{
    font-size: 0.7em;
    font-weight: 700;
    color: rgb(129, 129, 129);
  }

  .main-info{
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;

    position: relative;
  }

  .info-card{
    width: 80%;
    height: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top:22px;
    text-align: center;
    border-radius: 12px;

    background: rgb(69,8,170);
    background: linear-gradient(85deg, rgba(69,8,170,1) 0%, rgba(151,92,208,1) 1%, rgba(198,58,197,1) 42%, rgba(242,75,140,1) 73%, rgba(252,122,133,1) 91%);

    
  }

  .info-card h1{
    font-size: 5.5em;
    margin: 0;
    padding: 0;

    color: #F8F8F8;
    font-family: Bitter;
    letter-spacing: 6px;


    background: #F0F0F0;
    background: -webkit-radial-gradient(circle farthest-corner at center center, #F0F0F0 23%, #FFFFFF 84%);
    background: -moz-radial-gradient(circle farthest-corner at center center, #F0F0F0 23%, #FFFFFF 84%);
    background: radial-gradient(circle farthest-corner at center center, #F0F0F0 23%, #FFFFFF 84%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    
  }

  .info-card span{
    font-size: 0.8em;
    font-family: bitter;
    color: #f8f8f8d7;
    text-transform: capitalize;
    font-weight: bold;

  }

  .icon{
    width: 140px;
    height: 140px;
    position: absolute;
    top: 45%;
  }

  .icon img{
    height: 100%;
    width: 100%;
  }



  .right{
    display:flex;
    flex-direction: column;
  }

  .searchBar{
    height: 20%;
    width: 100%;

    position: relative;
  }

  .searchBar input{
    background: none;
    border: none;
    position: absolute;
    right: 10%;
    top: 15%;
    font-size: 1em;
    width: 30px;
    height: 30px;
    color: #F8F8F8;
  }

  .searchBar input:hover, .searchBar input:valid{
    width: 170px;
    background: #313131;
    border-radius: 12px;
    transition: 0.4s ease;
  }

  .searchBar input:focus{
    outline-width: 0;
    width: 170px;
    border-radius: 12px;
    background: #313131;
  }


  .searchBar .material-icons{
    color:rgb(129, 129, 129);
    position: absolute;
    height: 20px;
    width: 20px;

    pointer-events: none;

    right:12.5%;
    top: 24%;
  }

  .extraDetails{
    height: 80%;
    width: 100%;

    position: relative;
  }

  .buttons{
    position: absolute;
    bottom: -15%;
  }

  .extraDetails-card{

    height: 80%;
    width: 90%;
    background: #313131;
    margin-right: auto;
    margin-top:22px;
    border-radius: 12px;

  }

  .buttons button{
    background: none;
    border: none;
    color: rgb(129, 129, 129);
    padding: 5px 10px 0 5px;
    cursor: pointer;
    font-family: Poppins;
    font-size: 0.8em;


  }

  .buttons button:hover{
    color: #F8F8F8;
    transition: 0.2s ease;

  }

  

  .secondary{
    width: 45vw;
    height: 36vh;

    max-height: 300px;
    max-width: 620px;

    min-width: 620px;
    min-height: 300px;

    background: #282828;
    margin-top: 2em;
    border-radius: 25px;
    margin-left: auto;
    margin-right: auto;
    
    display: flex;
    padding-left: 1.5em;
    padding-right: 1.5em;
  }

  .demo-graph{
    height:100%;
    width: 100%;
  }

  .chartArea{
    position: relative;
    height: 100%;
    width: 80%;
  }






  
</style>
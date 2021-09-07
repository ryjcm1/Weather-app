<template>
    <div class="future-weather" v-for="dailyTemp in dailyTempList" :key="dailyTemp.time">

      <div class="display">
        <span class="time">{{dailyTemp.time}}</span>
        <div class="dayTemp">
          <h1>{{dailyTemp.maxTemp}}</h1>
          <div class="lowerTemp">
            <span>/{{dailyTemp.minTemp}}</span>
          </div>
        </div>
      </div>
      <div class="icon">
        <img :src="getImage(dailyTemp.weatherID)" alt="weather">
      </div>
    </div>
</template>

<script>
export default {
    props: ['dailyTempList'],
    setup(props){

      const getImage = (path) =>{
        return require(`../weather-Icons/${path}.svg`)
      }
        

      return { getImage }
    }


}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Bitter&family=Poppins&display=swap');


  .future-weather{
 
    max-height: 240px;
    max-width: 170px;

    min-width: 180px;
    min-height: 250px;

    background: #1F1F1F;
    border-radius: 50px;

    margin: auto;
    
    display: flex;
    justify-content: center;

    position: relative;
  }


  .time{
    color: rgb(129, 129, 129);
    margin-top:3em;
    font-size: 0.65em;
    font-family: Poppins;
    
  }

  .icon{
    position: absolute;
    right: 12%;
    top: 20%;
  }

  .display{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
  }


  .display h1{
    color: #F8F8F8;
    position: relative;
    font-size: 2.5em;
    font-family: Bitter;
  }

  .lowerTemp span{
    position: absolute;
    font-size: 1.4em;
    color: rgb(129, 129, 129);
    bottom: 5%;
    right: 26%;
    font-family: Bitter;

  }





</style>
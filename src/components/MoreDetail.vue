<template>
    <div class="extra-stats">
        <div class="feelsL">
            <h5>{{currentTemp.feelsLike}}</h5>
            <span>Real Feel</span>
        </div>

        <div class="pressure">
            <h5>{{currentTemp.pressure/10}} kpa</h5>
            <span>Pressure</span>
        </div>

        <div class="uvi">
            <h5>{{currentTemp.uvi}}</h5>
            <span>UVI</span>
        </div>

        <div class="wind">
            <h5>{{currentTemp.windSpeed}} km/h</h5>
            <span>Wind</span>
        </div>

        <div class="humidity">
            <h5>{{currentTemp.humidity}}%</h5>
            <span>Humdity</span>
        </div>
        
        <div class="clouds">
            <h5>{{currentTemp.clouds}}%</h5>
            <span>Clouds</span>
        </div>
            
    </div>
</template>

<script>
export default {
    props: ['currentTemp'],
    setup(props){

    }

}
</script>

<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Bitter&family=Poppins&display=swap');

    h5{
        font-family: Bitter;
    }

    span{
        font-family: Poppins;
    }

    .extra-stats{
        height: 100%;
        width: 90%;

        display:grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;

        text-align: center;
        margin: auto;
        
    }

    .extra-stats h5{
        color: #F8F8F8;
    }

    .extra-stats div{
        position: relative;
    }

    .extra-stats div span{
        position: absolute;
        font-size: 0.7em;
        color:rgb(129, 129, 129);
    }


    .feelsL span{
        right: 29%;
        top: 63%;
    }

    .pressure span{
        right: 31%;
        top: 63%;
    }

    .uvi span{
        right: 42%;
        top: 63%;
    }
    
    .wind span{
        right: 38%;
        top: 63%;
    }

    .humidity span{
        right: 32%;
        top: 63%;
    }

    .clouds span{
        right: 35%;
        top: 63%;
    }


</style>
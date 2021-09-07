import {ref} from 'vue'

const weatherData = ref(null)
const error = ref(null)

const getWeatherData = async(lat, lon) =>{
    try{
        let tempData = await fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alert&appid=${process.env.VUE_APP_MY_API_KEY}&units=metric`)
        // console.log(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alert&appid=${process.env.VUE_APP_MY_API_KEY}&units=metric`)
        weatherData.value = await tempData.json()

    }catch(err){
        console.log(err.message)
        error.value = err.message
    }
}

const getWeather = ()=>{
    return{ weatherData, error, getWeatherData}
}


export default getWeather



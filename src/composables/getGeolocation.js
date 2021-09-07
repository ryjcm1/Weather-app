import {ref} from 'vue'

const geoData = ref(null)
const error = ref(null)

const getGeoData = async(cityName,countryCode) =>{
    try{
        let data = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},,${countryCode}&limit=1&appid=${process.env.VUE_APP_MY_API_KEY}`)
        // console.log(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},,${countryCode}&limit=1&appid=${process.env.VUE_APP_MY_API_KEY}`)
        geoData.value = await data.json()

     }catch(err){
        console.log(err.message)
        error.value = err.message
    }
}


const getGeolocation =()=>{
    
    return {geoData, error, getGeoData}
}


export default getGeolocation



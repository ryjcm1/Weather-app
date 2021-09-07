

const {utcToZonedTime, format } = require('date-fns-tz')



const timeTempWeather = (listOfDailyTemp,timezone) => {

    const convertDateTime=(dtValue, timezone)=>{

        const dateObject = new Date(dtValue*1000)
        const zonedDate = utcToZonedTime(dateObject,timezone)
        
        //regex pattern for date format
        const pattern = 'EEEE MMMM do'
        const humanDateFormat = format(zonedDate, pattern, {timeZone: timezone})
    
        return humanDateFormat
    
    }
    

    const tempList = []
    let x


    for(x=1; x<=3; x++){

        let listObjectFrag = {
            time:  convertDateTime(listOfDailyTemp[x].dt, timezone),
            temp: Math.round(listOfDailyTemp[x].temp.day),
            weatherID: listOfDailyTemp[x].weather[0].icon,
            description: listOfDailyTemp[x].weather[0].description,
            maxTemp: Math.round(listOfDailyTemp[x].temp.max),
            minTemp: Math.round(listOfDailyTemp[x].temp.min)
        }

        tempList.push(listObjectFrag)
    }

    console.log(tempList)
    return tempList

}

const sortDailyTemp = ()=>{
    return {timeTempWeather}
}

export default sortDailyTemp

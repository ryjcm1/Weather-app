//sort through values and make new object 24hrs from current:
//  dt in hours
//  and temp

const {utcToZonedTime, format } = require('date-fns-tz')



const hourlyWeather = (listOfHourlyWeather,timezone) => {

    const convertDateTime=(dtValue, timezone)=>{

        const dateObject = new Date(dtValue*1000)
        const zonedDate = utcToZonedTime(dateObject,timezone)
        
        //regex pattern for date format
        const pattern = 'Ka'
        const humanDateFormat = format(zonedDate, pattern, {timeZone: timezone})
    
        return humanDateFormat
    
    }
    

    const tempList = []
    let x


    for(x=0; x<=23; x++){

        let listObjectFrag = {
            time:  convertDateTime(listOfHourlyWeather[x].dt, timezone),
            temp: Math.round(listOfHourlyWeather[x].temp)
        }

        tempList.push(listObjectFrag)
    }

    // console.log(tempList)
    return tempList

}

const sortHourlyTemp = ()=>{
    return {hourlyWeather}
}

export default sortHourlyTemp
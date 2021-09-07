const {utcToZonedTime, format } = require('date-fns-tz')


const convertDateTime=(dtValue, timezone)=>{

    const dateObject = new Date(dtValue*1000)
    const zonedDate = utcToZonedTime(dateObject,timezone)
    
    //regex pattern for date format
    const pattern = 'EEEE MMMM do yyy h:mm b'
    const humanDateFormat = format(zonedDate, pattern, {timeZone: timezone})

    return humanDateFormat

}

const getDateTime =()=>{
return {convertDateTime}
}

export default getDateTime
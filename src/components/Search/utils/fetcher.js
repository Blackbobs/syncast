// import { useStateContext } from "../../../context/ContextProvider"

export const get5DayForecast = async(latt, long) => {
    // const {lat, long} = useStateContext()
    try {
        const apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latt}&lon=${long}&appid=f1d2af9bb32c328646672517495c4990`

        const response = await fetch(apiURL)
        // console.log(response)
        return response
        
    } catch (error) {
        // console.log(error)
    }

}

export const getLongAndLat = async (city) => {
    try {     
        const apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=f1d2af9bb32c328646672517495c4990`
    
        const response = await fetch(apiURL)
        // console.log(response)
        return response.json()
    } catch (error) {
        // console.log(error)
    }
    }
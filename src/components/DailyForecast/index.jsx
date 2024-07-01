import React, {useEffect, useState} from 'react'
import { getLongAndLat } from '../Search/utils/fetcher';
import { useStateContext } from '../../context/ContextProvider';

const DailyForecast = () => {
  const {city, setLatt, setLong, latt, long} = useStateContext()
  const [weatherData, setWeatherData] = useState(null);

  // const API_KEY = process.env.REACT_APP_WEATHER_API

   const get5DayForecast = async() => {
    try {
        // const apiURL = `api.openweathermap.org/data/2.5/forecast/daily?lat=${latt}&lon=${long}&cnt=6&appid=${process.env.REACT_APP_WEATHER_API}`

        const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&cnt=7&appid=${process.env.REACT_APP_WEATHER_API}`

        // const options = {
        //   method: 'GET',
        //   headers: {
        //     'x-rapidapi-key': 'bd0533e664mshde1103ced48fc3bp1bfa18jsn5774673d7b6c',
        //     'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
        //   }
        // };
        const response = await fetch(apiURL)
        const result = await response.json()
        // console.log(result.data.weather.description)
        console.log(result)
        return result
        
    } catch (error) {
        // console.log(error)
    }

}



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch longitude and latitude based on city
        const geoData = await getLongAndLat(city);
        if (geoData && geoData.length > 0) {
          setLong(geoData[0]?.lon);
          setLatt(geoData[0]?.lat);
        } else {
          throw new Error('Unable to fetch geographical coordinates');
        }

        // Fetch 5-day forecast using longitude and latitude
        const forecastData = await get5DayForecast(long, latt);
        setWeatherData(forecastData.weather[0].description);
        console.log(forecastData.weather[0].description)
        
        
        
      } catch (error) {
        console.error('Error fetching data:', error);
       
      }
    };

    fetchData();
  }, [city, latt, long]); 
  return (
    <section>
   
    </section>
  )
}

export default DailyForecast
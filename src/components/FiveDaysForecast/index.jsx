import React, { useEffect, useState } from "react";
import { getLongAndLat } from "../utils/fetcher";
import { useStateContext } from "../../context/ContextProvider";
import { IoMdRainy, IoMdSunny } from "react-icons/io";

const FiveDaysForecast = () => {
  const { city, setLatt, setLong, latt, long } = useStateContext();
  const [weather, setWeather] = useState([]);
  const [temp, setTemp] = useState([]);
  const [humidity, setHumidity] = useState([]);

  const getFiveDaysForecast = async () => {
    try {
      const apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latt}&lon=${long}&appid=${process.env.REACT_APP_WEATHER_API}`;

      const response = await fetch(apiURL);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch longitude and latitude based on city
        const geoData = await getLongAndLat(city);
        if (geoData && geoData.length > 0) {
          setLong(geoData[0]?.lon);
          setLatt(geoData[0]?.lat);
        } else {
          throw new Error("Unable to fetch geographical coordinates");
        }

        // Fetch 5-day forecast using longitude and latitude
        const forecastData = await getFiveDaysForecast(long, latt);
        if (forecastData) {
            setWeather(prev => [...prev, forecastData.weather[0]?.description || null]);
            setTemp(prev => [...prev, forecastData.main?.temp || null]);
            setHumidity(prev => [...prev, forecastData.main?.humidity || null]);
          }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [city, latt, long]);

  return <div>FiveDaysForecast</div>;
};

export default FiveDaysForecast;

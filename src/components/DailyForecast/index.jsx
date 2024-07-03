import React, { useEffect, useState, useMemo } from "react";
import { getLongAndLat } from "../utils/fetcher";
import { useStateContext } from "../../context/ContextProvider";
import { IoMdRainy, IoMdSunny } from "react-icons/io";

const DailyForecast = () => {
  const { city, setLatt, setLong, latt, long, searchTerm } = useStateContext();
  const [weather, setWeather] = useState('');
  const [temp, setTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [data, setData] = useState({});

  // const API_KEY = process.env.REACT_APP_WEATHER_API

  const getDailyForecast = async () => {
    try {
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&cnt=1&units=metric&appid=${process.env.REACT_APP_WEATHER_API}`

      // const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&cnt=1&appid=${process.env.REACT_APP_WEATHER_API}`;

      const response = await fetch(apiURL);
      const result = await response.json();
      // console.log(result);
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
         await setLong(geoData[0]?.lon);
         await setLatt(geoData[0]?.lat);
        } else {
          throw new Error("Unable to fetch geographical coordinates");
        }

        // Fetch today's forecast using longitude and latitude
        const forecastData = await getDailyForecast(long, latt);
         if (forecastData) {
          setWeather(forecastData.weather[0]?.description)
          setTemp(forecastData.main?.temp)
          setHumidity(forecastData.main?.humidity)
     
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [city, latt, long, searchTerm]);
  return (
    <section className="p-2 text-white">
      <h1 className="text-2xl font-bold text-slate-950 py-3">
        Today's forecast
      </h1>
      <div className="bg-slate-800 p-3 rounded-lg space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold capitalize">{city}</h2>
          <p className="text-[18px] font-medium">{temp} <sup>o</sup> <span className="capitalize">C</span> </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[18px] flex items-center gap-2">
            <IoMdRainy size={30} />
            {weather}
          </p>
          <small className="text-xl">
            {" "}
            <span className="text-gray-300 font-medium">Humidity</span> -{" "}
            {humidity} %
          </small>
        </div>
      </div>
    </section>
  );
};

export default DailyForecast;

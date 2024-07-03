import React, { useEffect, useState } from "react";
import { getLongAndLat } from "../utils/fetcher";
import { useStateContext } from "../../context/ContextProvider";
import { IoMdRainy, IoMdSunny } from "react-icons/io";

const DailyForecast = () => {
  const { city, setLatt, setLong, latt, long, searchTerm } = useStateContext();
  const [weather, setWeather] = useState(null);
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);

  // const API_KEY = process.env.REACT_APP_WEATHER_API

  const getDailyForecast = async () => {
    try {
      // const apiURL = `api.openweathermap.org/data/2.5/forecast/daily?lat=${latt}&lon=${long}&cnt=6&appid=${process.env.REACT_APP_WEATHER_API}`

      const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&cnt=1&appid=${process.env.REACT_APP_WEATHER_API}`;

      // const options = {
      //   method: 'GET',
      //   headers: {
      //     'x-rapidapi-key': 'bd0533e664mshde1103ced48fc3bp1bfa18jsn5774673d7b6c',
      //     'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
      //   }
      // };
      const response = await fetch(apiURL);
      const result = await response.json();
      // console.log(result.data.weather.description)
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
        const forecastData = await getDailyForecast(long, latt);
        setWeather(forecastData?.weather[0]?.description);
        setTemp(forecastData?.main?.temp);
        setHumidity(forecastData?.main?.humidity);
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
          <p className="text-[18px] font-medium">{temp}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[18px] flex items-center gap-2">
            <IoMdRainy size={30} />
            {weather}
          </p>
          <small className="text-xl">
            {" "}
            <span className="text-gray-300 font-medium">Humidity</span> -{" "}
            {humidity}
          </small>
        </div>
      </div>
    </section>
  );
};

export default DailyForecast;

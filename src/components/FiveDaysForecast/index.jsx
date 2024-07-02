import React, { useEffect, useState } from "react";
import { getLongAndLat } from "../utils/fetcher";
import { useStateContext } from "../../context/ContextProvider";
import { IoMdRainy, IoMdSunny } from "react-icons/io";

const FiveDaysForecast = () => {
  const { city, setLatt, setLong, latt, long } = useStateContext();
  const [data, setData] = useState([]);
  //   const [weather, setWeather] = useState([]);
  //   const [temp, setTemp] = useState([]);
  //   const [humidity, setHumidity] = useState([]);

  const getFiveDaysForecast = async () => {
    try {
      const apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latt}&lon=${long}&cnt=5&appid=${process.env.REACT_APP_WEATHER_API}`;

      const response = await fetch(apiURL);
      const result = await response.json();
      //   console.log(result);
      return result.list;
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
          // console.log(forecastData)
          setData(
            forecastData.map((entry) => ({
              weather: entry.weather[0]?.description,
              temp: entry.main?.temp,
              humidity: entry.main?.humidity,
            }))
          );
          //   setWeather(forecastData[0]?.weather[0]?.description);
          //   setTemp(forecastData[0]?.main?.temp);
          //   setHumidity(forecastData[0]?.main?.humidity);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [city, latt, long]);

  return (
    <section className="p-2 text-white">
      <h1 className="text-2xl font-bold text-slate-950 py-3">
        5 Days Forecast
      </h1>
      {data.map((forecast, index) => (
        <div key={index} className="bg-slate-800 p-3 rounded-lg space-y-5 my-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold capitalize">{city}</h2>
            <p className="text-[18px] font-medium">{forecast.temp}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[18px] flex items-center gap-2">
              <IoMdRainy size={30} />
              {forecast.weather}
            </p>
            <small className="text-xl">
              {" "}
              <span className="text-gray-300 font-medium">Humidity</span> -{" "}
              {forecast.humidity}
            </small>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FiveDaysForecast;

// export const get5DayForecast = async(latt, long) => {
//     // const {lat, long} = useStateContext()
//     try {
//         const apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latt}&lon=${long}&appid=${process.env.REACT_APP_WEATHER_API}`

//         const response = await fetch(apiURL)
//         // console.log(response)
//         return response

//     } catch (error) {
//         // console.log(error)
//     }

// }

export const getLongAndLat = async (city) => {
  try {
    const apiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_WEATHER_API}`;

    const response = await fetch(apiURL);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

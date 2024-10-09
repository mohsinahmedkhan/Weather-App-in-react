import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [weather, setWeather] = useState(null);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("karachi");

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bba17a072d2127459491390ad0f73f88&units=metric`)
      .then((res) => res.json())
      .then((res) => setWeather(res))
  }, [city])

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOnClick = () => {
    if (search) {
      setCity(search);
      setSearch("")
    } else {
      alert("Please type the city name.");
    }
  };



  const temp = Math.round(weather?.main?.temp);
  const max = Math.round(weather?.main?.temp_max)
  const min = Math.round(weather?.main?.temp_min)
  const feels_like = Math.round(weather?.main?.feels_like)
  const humidity = Math.round(weather?.main?.humidity)
  const icons = weather?.icon

  return (
    <>
      <div className='container'>
        <h1>Weather App</h1>

        <div className='input'>
          <input onChange={handleOnChange} value={search} type="text" placeholder='Enter City Name' />
          <img onClick={handleOnClick} className='img' src="https://cdn.pixabay.com/photo/2021/07/02/04/48/search-6380865_640.png" alt="img" />
        </div>

        {weather && (
          <div className='box'>

            <div className='h1'>
              <h1>{weather.name}</h1>
              <span>{temp}°C</span>
              <p>Broken Clouds</p>
            </div>

            <div className='max'>
              <p>Max: {max}°C</p>
              <p>Min: {min}°C</p>
            </div>

            <div className='image'>
              {weather?.weather && weather.weather.length > 0 && (
                <div className='image'>
                  <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                </div>
              )}
            </div>

            <div className='feel'>
              <p className='cel' >{feels_like}°C</p>
              <p>....Feels Like</p >
            </div>

            <div className='humidity'>
              <p className='cel'>{humidity}%</p>
              <p>....Humidity</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App

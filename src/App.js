import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon, FaSearch, FaArrowCircleUp, FaArrowCircleDown, FaArrowAltCircleDown } from "react-icons/fa";
import { MdOutlineCompress } from "react-icons/md";
import { HiEmojiHappy } from "react-icons/hi";
import { BiWind } from "react-icons/bi";
import { WiHumidity } from "react-icons/wi";

// 72bf5c4e77a1b5f99079bd22c5b79725

// https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=72bf5c4e77a1b5f99079bd22c5b79725

function App() {
  const [theme,setTheme]=useState("dark");
  const [bg,setBg]=useState();
  const [fg,setFg]=useState();
  const [check,setCheck] = useState(false);
  const [city,setCity] = useState("");
  const API_KEY = "72bf5c4e77a1b5f99079bd22c5b79725";
  const [load,setLoad]=useState(false);
  const [weather,setWeather] = useState({});

  const GetWeatherData=async ()=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    try{
      setLoad(false);
      const res = await axios.get(url);
      const data = res.data;
      console.log(data);
      setWeather({
        icon:`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        des:`${data.weather[0].main}`,
        feels_like:`${Math.abs(data.main.feels_like-273.15).toFixed(2)}`,
        temp:`${Math.abs(data.main.temp-273.15).toFixed(2)}`,
        temp_min:`${Math.abs(data.main.temp_min-273.15).toFixed(2)}`,
        temp_max:`${Math.abs(data.main.temp_max-273.15).toFixed(2)}`,
        pressure:`${data.main.pressure} hPa`,
        humidity:`${data.main.humidity} %`,
        name:`${data.name}`,
        wind:`${data.wind.speed} m/s`,
        country:`${new Intl.DisplayNames(['en'],{type:"region"}).of(data.sys.country)}`,
        sunrise:`${new Date(data.sys.sunrise*1000).toLocaleDateString(undefined,{minute:"2-digit",second:"2-digit",hour:"2-digit"})}`,
        sunset:`${new Date(data.sys.sunset*1000).toLocaleDateString(undefined,{minute:"2-digit",second:"2-digit",hour:"2-digit"})}`
      });
      setLoad(true);
    }catch(err){
      alert("Server Error / Wrong City")
    }
  }

  useEffect(()=>{
    setBg(theme==="dark"?"#323131":"white");
    setFg(theme==="dark"?"#dbd7d7":"#323131");
    
  },[theme]);

  return (
    <div className="App" style={{"--bg":bg,"--fg":fg}}>
      <div className='weather-frame'>
        <div className='setting-frame'>
          {/* Theme Changer Frame */}
          <div className='theme-changer-frame'>
            <input className='theme-changer' onClick={e=>{setCheck(!check);setTheme(theme==="dark"?"light":"dark")}} type={"checkbox"} checked={check}/>
            <FaMoon onClick={e=>{setCheck(!check);setTheme(theme==="dark"?"light":"dark")}} className='theme-icons moon'/>
            <FaSun onClick={e=>{setCheck(!check);setTheme(theme==="dark"?"light":"dark")}} className='theme-icons sun'/>
            <div className='hider' onClick={e=>{setCheck(!check);setTheme(theme==="dark"?"light":"dark")}}></div>
          </div>

        </div>
        {/* Search Bar Frame */}
        <div className='search-frame'>
          <input type={"text"} className="search-inp" value={city} onKeyDown={e=>e.key==="Enter"?GetWeatherData():""} onChange={e=>setCity(e.target.value)}/>
          <FaSearch className='search-icons' onClick={e=>GetWeatherData()}/>
        </div>
        {/* Weather Data Frame */}
        {
          load?
          <div className='display-frame'>
            <div className='temp-frame'>
              <p className='country-detail details'>{weather.name}, {weather.country}</p>
              <img src={weather.icon} className="temp-weather-icon"></img>
              <p className='desp-detail details'>{weather.des}</p>
              <p className='temp-detail'>{weather.temp}&#8451;</p>
              <p className='sunrise-detail details'>Sunrise : {weather.sunrise.split(",")[1]}</p>
              <p className='sunset-detail details'>Sunset : {weather.sunset.split(",")[1]}</p>
            </div>
            <div className='extra-data-frame'>
              <div className='detail-frame'>
                <FaArrowCircleUp className='detail-icon'/>
                <p className='extra-data-p details'>Min-Temp</p>
                <p className='extra-data-detail'>{weather.temp_min}&#8451;</p>
              </div>
              <div className='detail-frame'>
                <FaArrowAltCircleDown className='detail-icon'/>
                <p className='extra-data-p details'>Max-Temp</p>
                <p className='extra-data-detail'>{weather.temp_max}&#8451;</p>
              </div>
              <div className='detail-frame'>
                <MdOutlineCompress className='detail-icon'/>
                <p className='extra-data-p details'>Pressure</p>
                <p className='extra-data-detail'>{weather.pressure}</p>
              </div>
              <div className='detail-frame'>
                <BiWind className='detail-icon'/>
                <p className='extra-data-p details'>Speed</p>
                <p className='extra-data-detail'>{weather.wind}</p>
              </div>
              <div className='detail-frame'>
                <WiHumidity className='detail-icon'/>
                <p className='extra-data-p details'>Humidity</p>
                <p className='extra-data-detail'>{weather.humidity}</p>
              </div>
              <div className='detail-frame'>
                <HiEmojiHappy className='detail-icon'/>
                <p className='extra-data-p details'>Feel Like</p>
                <p className='extra-data-detail'>{weather.feels_like}</p>
              </div>
            </div>
          </div>:
          ""
        }
      </div>
    </div>
  );
}

export default App;

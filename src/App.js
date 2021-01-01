// import logo from './logo.svg';
// import { fab } from '@fortawesome/free-brands-svg-icons';

import React,{Component} from 'react' ;
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { faCoffee , faSun, faDrizzle, faCloud, faCloudSun, faSnowman, faCloudShowersHeavy, faCloudRain } from '@fortawesome/free-solid-svg-icons';

import Weather from './Components/Weather';
import WeatherForm from './Components/WeatherForm'; 
import { faCloudflare } from '@fortawesome/free-brands-svg-icons';

const API_key = "0d5a421868b2356ca01d86a0c52eec0f";

class App extends Component{
  constructor(){
    super();
    this.state= {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      error: false,
    };
    // this.getWeatherInfo();

    this.weatherIcon = {
      Thunderstorm: faCloudflare,
      Drizzle: faCloudRain,
      Rain: faCloudShowersHeavy,
      Snow: faSnowman,
      Atmosphere: faSun,
      Clear: faCloudSun,
      Clouds: faCloud
    };

  }

  
  calCelsius(temp){
    let cell = Math.floor(temp-273.15) ;
    return cell; 
  }

  getWeatherIcon(icons, rangeId) {
    switch (true) { 
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  }
  getWeatherInfo = async(e) => {
    e.preventDefault();

    const country = e.target.elements.country.value; // fetching input form value
    const city = e.target.elements.city.value;      

    if(city&&country){
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
    const json_response = await api_call.json();
    console.log(json_response);

    this.setState({
      // city: json_response.name ,  
      // country: json_response.sys.country,
      city: `${json_response.name}, ${json_response.sys.country}`,
      celsius:this.calCelsius(json_response.main.temp), 
      temp_max: this.calCelsius(json_response.main.temp_max),
      temp_min: this.calCelsius(json_response.main.temp_min),
      description: json_response.weather[0].description,
      error:false 
      // icon: this.weatherIcon.Thunderstorm
    });

    this.getWeatherIcon(this.weatherIcon, json_response.weather[0].id);
  }

  else{
    this.setState({error:true})
  }

  }



  render() {
    return (
      <div className="App">
        <WeatherForm loadweather={this.getWeatherInfo} error={this.state.error}/>
        <Weather 
        city={this.state.city} 
        country={this.state.country}
        temp_celsius={this.state.celsius}
        temp_max ={this.state.temp_max}
        temp_min= {this.state.temp_min}
        description = {this.state.description}
        weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}


// function App() {
//   return (
//     <div className="App">
//       <Weather/>
//     </div>
//   );
// }

export default App;

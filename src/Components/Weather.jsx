import React,{Component} from 'react' ;
import ReactDOM from 'react-dom' ;  
import '../styles/style.css';

import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCoffee , faSun, faDrizzle, faCloud, faCloudSun, faSnowman, faCloudShowersHeavy, faCloudRain } from '@fortawesome/free-solid-svg-icons';

const minmaxTemp = (min,max) => {   
    if(min && max){
        return(
            <h3>
                <span className="px-3 mx-3">{min}&deg;</span>
                <span className="px-3 mx-3">{max}&deg;</span>
            </h3>      
        )    
    }
};


// or function minmaxTemp(min,max){}
const Weather = (props) => {

    // let task = props.weatherIcon;

    return(
        <div className="container text-light">
            <div className="Cards">
                <h1 className="py-3">
                    {props.city}
                </h1>
                <h5 className="py-4">                  
                    <FontAwesomeIcon icon={props.weatherIcon} size="3x"/>
                    {/* <WeatherIcons name={props.weatherIcon} size="2x" /> */}
                </h5>  
                {console.log(props.weatherIcon)}
                {/* <h2 className="py-2">
                    {props.temp_celsius}&deg;
                </h2> */}
                {props.temp_celsius ? (<h1 className="py-2">{props.temp_celsius}&deg;</h1>): null}

                {minmaxTemp(props.temp_min,props.temp_max)}
                <h4>{props.description}</h4>
            </div>
        </div>
    )
};

 

export default Weather;
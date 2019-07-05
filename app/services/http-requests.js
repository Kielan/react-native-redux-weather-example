import Qs from 'qs';
import { API_KEY } from '../config';

const throwErrorManually = ({ error_message }) => {
    throw new Error("Thrown from throwErrorManually()");
}
const query = {
  key: "AIzaSyBBu8K9Mup1qgO1LFE45xrlpLTtGupWzUo",
  language: "en", // language of the results
  types: "geocode" // default: 'geocode'
}

//Return the element that corresponds to that index.
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function getWeekDay(date) {
  let day = date.getDay();
  return weekdays[day];
}
export const orderWeatherData = async (darkSkyData) => {
  let orderWeatherData = {};
  // I think the data can make it from state to view in unordered fashion
  //time data.daily is just not returning a time
  //accurate to properly parse a proper weekDay
  await darkSkyData.daily.data.map((unorderedItem, i) => {
    let date = new Date(unorderedItem.temperatureHighTime);
    let dayString = getWeekDay(date);
    unorderedItem.weekDay = dayString;

    return orderWeatherData[`${dayString}_${i}`] = unorderedItem;
  })

  return {dailyForecast: orderWeatherData, hourlyForecast: darkSkyData.hourly};
}

export const fetchWeatherData = async (coords) => {
  let weatherData = await fetch(`https://api.darksky.net/forecast/${API_KEY}/${coords.lat},${coords.lng}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err)
  return weatherData;
}

export const fetchGooglePlacesAutocompleteApi = async (text) => {
    try {
        let placesData = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=${encodeURIComponent(text)}&${Qs.stringify(query)}`);
        let placesJSON = placesData.json();
        if (placesJSON.error_message) {
            throwErrorManually(placesJSON)
        }
        return placesJSON
    } catche (e) {
        console.error(e);
    }
}

export const fetchGooglePlacesApi = async (place_id) => {
  let url = 'https://maps.googleapis.com/maps/api/place/details/json?' + Qs.stringify({
    key: "AIzaSyBBu8K9Mup1qgO1LFE45xrlpLTtGupWzUo",
    placeid: place_id,
    language: "en",
  })
  let placesData = await fetch(url)

  return placesData.json()
}

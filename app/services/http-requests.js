import Qs from 'qs';
import { API_KEY } from '../config';

const query = {
  key: "AIzaSyBBu8K9Mup1qgO1LFE45xrlpLTtGupWzUo",
  language: "en", // language of the results
  types: "geocode" // default: 'geocode'
}

export const fetchWeatherData = async (coords) => {
  let weatherData = await fetch(`https://api.darksky.net/forecast/${API_KEY}/${coords.lat},${coords.lng}`)
    .then((res) => res.json())
    .then((data) => data.currently)
    .catch((err) => err)
  return weatherData;
}

export const fetchGooglePlacesAutocompleteApi = async (text) => {
  let placesData = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=${encodeURIComponent(text)}&${Qs.stringify(query)}`);
  //  .then((res) => {
//      let responseObj = res.json()
//      console.log('placesData res: ', res.json())
//      return res.json();
//    })
//    .catch((err) => err)
  return placesData.json()
}

export const fetchGooglePlacesApi = async (place_id) => {
  /*url = 'https://maps.googleapis.com/maps/api/geocode/json?' + Qs.stringify({
    latlng: latitude + ',' + longitude,
    key:  "AIzaSyBBu8K9Mup1qgO1LFE45xrlpLTtGupWzUo",
  });*/
  console.log('fetchGooglePlacesApi url place_id: ', place_id)

  let url = 'https://maps.googleapis.com/maps/api/place/details/json?' + Qs.stringify({
    key: "AIzaSyBBu8K9Mup1qgO1LFE45xrlpLTtGupWzUo",
    placeid: place_id,
    language: "en",
  })
  let placesData = await fetch(url)

  return placesData.json()
}

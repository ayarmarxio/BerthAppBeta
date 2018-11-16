import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { transform } from "ol/proj";
import { defaults as defaultControls } from "ol/control.js";
import MousePosition from "ol/control/MousePosition.js";
import { createStringXY } from "ol/coordinate.js";
import axios from "axios";
import "@babel/polyfill";

export default class OpenLayers {
  constructor() {
    this._coords;
  }

  get Coords() {
    return this._coords;
  }

  getMap() {
    var mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(4),
      projection: "EPSG:4326",
      // comment the following two lines to have the mouse position
      // be placed within the map.
      // className: 'custom-mouse-position',
      // target: document.getElementById('mouse-position'),
      undefinedHTML: "&nbsp;"
    });

    var map = new Map({
      controls: defaultControls({
        attributionOptions: {
          collapsible: false
        }
      }).extend([mousePositionControl]),
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: "map",
      view: new View({
        center: transform([9.7320104, 52.3758916], "EPSG:4326", "EPSG:3857"),
        zoom: 14
      })
    });

    map.on("click", function(event) {
      let coords = map.getCoordinateFromPixel(event.pixel);
      console.log(coords);
      this._coords = coords;
      let long = coords[0];
      let lat = coords[1];
      console.log(long);
      console.log(lat);
      let newCoords = transform([long, lat], "EPSG:3857", "EPSG:4326");
      console.log("se transforma???" + newCoords);
      let newLong = newCoords[0];
      let newLat = newCoords[1];
      console.log("new long: " + newLong);
      console.log("new lat: " + newLat);

      let url =
        "http://photon.komoot.de/reverse?lon=" + newLong + "&lat=" + newLat;

      getAddressNow(url);
    });

    async function getAddressNow(url) {
      let getAddress = await axios.get(url);
      console.log(getAddress);
      let street = getAddress.data.features[0].properties.street;
      console.log("Esta es la calle: " + street);
      let city = getAddress.data.features[0].properties.city;
      let country = getAddress.data.features[0].properties.country;
      let houseNumber = getAddress.data.features[0].properties.housenumber;
      let addressFinal =
        street + " # " + houseNumber + ", " + city + " " + country;
      console.log(addressFinal);
      alert(addressFinal);

      document.getElementById("location-span").innerHTML = addressFinal;
    }
  }
}

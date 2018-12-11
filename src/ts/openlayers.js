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

  //Method to create the map
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
        center: transform(
          [12.088952064514158, 55.639260563486914],
          "EPSG:4326",
          "EPSG:3857"
        ),
        zoom: 14
      })
    });

    // Method to get coordinates from clicking in the map
    map.on("click", function(event) {
      let coords = map.getCoordinateFromPixel(event.pixel);
      this._coords = coords;
      console.log("Estas son las this coords: " + this._coords);

      document.getElementById("hidden-coords").value = coords;

      let long = coords[0];
      let lat = coords[1];

      let newCoords = transform([long, lat], "EPSG:3857", "EPSG:4326");
      let newLong = newCoords[0];
      let newLat = newCoords[1];
      let url =
        "http://photon.komoot.de/reverse?lon=" + newLong + "&lat=" + newLat;

      getAddressNow(url);
    });

    // Method that connects with Geo Api to get the address
    async function getAddressNow(url) {
      let getAddress = await axios.get(url);
      let city = getAddress.data.features[0].properties.city;
      let country = getAddress.data.features[0].properties.country;
      let postcode = getAddress.data.features[0].properties.postcode;
      let addressFinal = city + "  " + postcode + ", " + country;

      alert(addressFinal);

      document.getElementById("location-span").innerHTML = addressFinal;
    }
  }
}

import CurrentDateTime from "./widgets/CurrentDateTime";
import CurrentWeather from "./widgets/CurrentWeather";
import BusTimes from "./widgets/BusTimes";
import StudioMessages from "./widgets/StudioMessages";

/**
 * defaultWidgets.js - An array of default widgets, that defines and describes each widget.
 *
 * Widgets should be written so as to transform the *exact* data response from any http(s) request, defined by the dataURL.
 *
 * @param {string} name - The verbose name of the widget.
 * @param {component} component - A direct reference to the component function.
 * @param {string} dataURL - The URL from which to fetch data to feed the component.
 * @param {number} refreshInterval - The frequency the dataURL should be visited.
 * @param {object} props - An object to be passed to the widget as props.
 * --> @param {object} err - An object containing any error information.
 * --> @param {object} data - An object containing the exact data from the endpoint response.
 */
export const defaultWidgets = [
  {
    name: "Date & Time",
    component: CurrentDateTime,
    dataURL: null,
    refreshInterval: null,
    props: { err: null, data: {} }
  },
  {
    name: "Weather",
    component: CurrentWeather,
    dataURL: "http://localhost:8080/api/weather",
    refreshInterval: 480,
    props: {
      err: null,
      data: null
    }
  },
  {
    name: "Bus Times",
    component: BusTimes,
    dataURL: "http://localhost:8080/api/bus",
    refreshInterval: 240,
    props: {
      err: null,
      data: null
    }
  },
  {
    name: "Messages",
    component: StudioMessages,
    dataURL: "http://localhost:8080/api/messages",
    refreshInterval: 480,
    props: {
      err: null,
      data: null
    }
  }
];

import CurrentDateTime from "./widgets/CurrentDateTime";
import CurrentWeather from "./widgets/CurrentWeather";
import BusTimes from "./widgets/BusTimes";
import StudioMessages from "./widgets/StudioMessages";
import LastPlayed from "./widgets/LastPlayed";
import Schedule from "./widgets/Schedule";
import Marketing from "./widgets/Marketing";
import Webcams from "./widgets/Webcams";
import Equipment from "./widgets/Equipment";
import PlayoutViewer from "./widgets/PlayoutViewer";

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
    dataURL: "/api/weather",
    refreshInterval: 483,
    props: {
      err: null,
      data: null
    }
  },
  {
    name: "Bus Times",
    component: BusTimes,
    dataURL: "/api/bus",
    refreshInterval: 187,
    props: {
      err: null,
      data: null
    }
  },
  {
    name: "Messages",
    component: StudioMessages,
    dataURL: "/api/messages",
    refreshInterval: 241,
    props: {
      err: null,
      data: null
    }
  },
  {
    name: "Last Played",
    component: LastPlayed,
    dataURL: "/api/lastplayed",
    refreshInterval: 9,
    props: {
      err: null,
      data: null
    }
  },
  {
    name: "Schedule",
    component: Schedule,
    dataURL: "/api/schedule",
    refreshInterval: 62,
    props: {
      err: null,
      data: null
    }
  },

  {
    name: "Marketing",
    component: Marketing,
    dataURL: "/api/images/marketing",
    refreshInterval: 1800,
    props: {
      err: null,
      data: null
    }
  },
  {
    name: "Webcam ST1",
    component: Webcams,
    dataURL: null,
    refreshInterval: null,
    props: {
      err: null,
      data: {
        success: true,
        webcam: {
          name: "Studio 1",
          code: "st1",
          images: [
            {
              id: "st1_dj",
              url: "http://cctv.medianet/st1-dj.jpg"
            },
            {
              id: "st1_guest",
              url: "http://cctv.medianet/st1-guest.jpg"
            }
          ]
        }
      }
    }
  },
  {
    name: "Webcam ST2",
    component: Webcams,
    dataURL: null,
    refreshInterval: null,
    props: {
      err: null,
      data: {
        success: true,
        webcam: {
          name: "Studio 2",
          code: "st2",
          images: [
            {
              id: "st1_dj",
              url: "http://cctv.medianet/st2-dj.jpg"
            },
            {
              id: "st1_guest",
              url: "http://cctv.medianet/st2-guest.jpg"
            }
          ]
        }
      }
    }
  },
  {
    name: "ST2 Bookings",
    component: Equipment,
    dataURL: "/api/equipment/Studio%202",
    refreshInterval: 300,
    props: {
      err: null,
      data: null
    }
  },
  {
    name: "TC1 Bookings",
    component: Equipment,
    dataURL: "/api/equipment/Tascam%201",
    refreshInterval: 300,
    props: {
      err: null,
      data: null
    }
  },
  {
    name: "TC2 Bookings",
    component: Equipment,
    dataURL: "/api/equipment/Tascam%202",
    refreshInterval: 300,
    props: {
      err: null,
      data: null
    }
  },
  {
    name: "TC3 Bookings",
    component: Equipment,
    dataURL: "/api/equipment/Tascam%203",
    refreshInterval: 300,
    props: {
      err: null,
      data: null
    }
  },
  {
    name: "Playout 1",
    component: PlayoutViewer,
    dataURL: null,
    refreshInterval: null,
    props: {
      data: {
        success: true,
        playout: {
          name: "Playout 1",
          wsURL: "ws://status.medianet:3000?token=playout1"
        }
      }
    }
  },
  {
    name: "Playout 2",
    component: PlayoutViewer,
    dataURL: null,
    refreshInterval: null,
    props: {
      data: {
        success: true,
        playout: {
          name: "Playout 2",
          wsURL: "ws://status.medianet:3000?token=playout2"
        }
      }
    }
  },
  {
    name: "Onair 1",
    component: PlayoutViewer,
    dataURL: null,
    refreshInterval: null,
    props: {
      data: {
        success: true,
        playout: {
          name: "Onair 1",
          wsURL: "ws://status.medianet:3000?token=onair1"
        }
      }
    }
  },
  {
    name: "Onair 2",
    component: PlayoutViewer,
    dataURL: null,
    refreshInterval: null,
    props: {
      data: {
        success: true,
        playout: {
          name: "Onair 2",
          wsURL: "ws://status.medianet:3000?token=onair2"
        }
      }
    }
  }
];

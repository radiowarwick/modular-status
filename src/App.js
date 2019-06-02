import React, { useState, useEffect, useRef } from "react";
import { useInterval, useKeyPress } from "./customHooks";
import FlexLayout from "flexlayout-react";
import styled from "styled-components";
import axios from "axios";
import "./app.css";

import Button from "./components/Button";
import Headline from "./components/Headline";
import Checkbox from "./components/Checkbox";
import VideoOverlay from "./components/VideoOverlay";

import { defaultWidgets } from "./defaultWidgets";

/**
 * Export the context which provides the state of animations.
 */
export const GlobalAnimateContext = React.createContext(true);

const App = () => {
  /**
   * Define references (mutable persistant "boxes" to hold data).
   */
  const layoutRef = useRef(null);
  const secondsElapsed = useRef(new Date().getSeconds());
  const unixStart = useRef(
    Math.floor(Date.now() / 1000) - secondsElapsed.current
  );

  /**
   * UI Control variables to define how the UI should look in different states.
   */
  const editKeyDown = useKeyPress("e");
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);

  /**
   * Default Screensaver object held in state.
   */
  const [screenSaver, setScreenSaver] = useState({
    show: false,
    url: "https://media.radio.warwick.ac.uk/video/timelapse.mp4",
    minuteOfHour: 30
  });

  /**
   * Define whether components should animate or not.
   * This is an application-wide parameter.
   */
  const [animate, setAnimate] = useState(() => {
    if (!localStorage.animate) localStorage.setItem("animate", "true");
    return localStorage.animate === "true" ? true : false;
  });

  /**
   * An array of the indices of widgets (based on the defaultWidgets array) currently on the screen (active).
   *
   * Updates each render. This means that, the array may not reflect the current widgets
   * on screen until the next render.
   *
   * Used to fetch data only for the widgets on screen.
   */
  const activeWidgetIndices = [];

  /**
   * Define the widgets from a copy of the defaultWidgets array.
   *
   * Widgets make up the UI.
   */
  const [widgets, setWidgets] = useState(defaultWidgets.slice(0));

  /**
   * Define model from localStorage.
   */
  const [model] = useState(() => {
    const defaultJSON = {
      global: {
        tabEnableRename: false,
        tabSetEnableMaximize: false
      },
      layout: {}
    };
    if (!localStorage.flexLayoutJSON)
      localStorage.setItem("flexLayoutJSON", JSON.stringify(defaultJSON));

    return FlexLayout.Model.fromJson(JSON.parse(localStorage.flexLayoutJSON));
  });

  /**
   * Fetch and refresh the data for a widget in the widgets array (held in state).
   *
   * @param {number} widgetIndex - The index of the widget to be refreshed.
   */
  const refreshWidgetByIndex = widgetIndex => {
    /**
     * Make a copy of the widgets array. Prevents mutation of the widgets array.
     */
    const newWidgets = widgets.slice(0);

    /**
     * Fetch the data from the given dataURL endpoint.
     *
     * If all goes well, then set the `nextWidgets` array (index of widget) to hold the new data.
     *
     * If an error occours, then set `nextWidgets` array (index of widget) to an error state.
     *
     * No matter what happens, set the widgets array (held in state) to the new widgets.
     */
    axios
      .get(widgets[widgetIndex].dataURL)
      .then(response => {
        newWidgets[widgetIndex].props = {
          err: null,
          data: response.data
        };
      })
      .catch(error => {
        newWidgets[widgetIndex].props = {
          err: error,
          data: null
        };
      })
      .then(() => setWidgets(newWidgets));
  };

  /**
   * Returns a widget (react component) based on a node's component property.
   *
   * The node's component property holds the index of a widget in the widgets array (held in state).
   *
   * The widget is then built dynamically, using a refence to the actual react component function (Widget.ref),
   * and with the current props (Widget.props).
   *
   * @param {object} node - A node in the flexlayout model that will be converted to a widget (react component).
   */
  const factory = node => {
    /**
     * Get the index of the widget in the widgets array from the node on the flexlayout model.
     */
    const widgetIndex = node.getComponent();

    /**
     * Add the widget index to the active widget index array (if not already present).
     */
    if (activeWidgetIndices.indexOf(widgetIndex) < 0)
      activeWidgetIndices.push(widgetIndex);

    /**
     * Return the correct widget.
     */
    const Widget = widgets[widgetIndex];

    return <Widget.component {...Widget.props} />;
  };

  /**
   * Triggers an add tab event, providing a draggable box to position the new tab.
   *
   * Will add a new node to the model based on the widget index that is passed.
   *
   * @param {number} widgetIndex- The index in the widget array of the widget that will added
   * to the flexlayout model (as a new node).
   */
  const addWidgetToModel = widgetIndex => {
    setAdding(true);
    layoutRef.current.addTabWithDragAndDropIndirect(
      "Drag: " + widgets[widgetIndex].name,
      {
        component: widgetIndex,
        name: widgets[widgetIndex].name
      },
      () => {
        /**
         * After the widget has been "dropped", check if the widget has any data. If not, refresh with new data.
         */
        if (!widgets[widgetIndex].props.data) refreshWidgetByIndex(widgetIndex);
        setAdding(false);
      }
    );
  };

  /**
   * Saves the layout model to localStorage.
   */
  const save = () =>
    localStorage.setItem("flexLayoutJSON", JSON.stringify(model.toJson()));

  /**
   * Toggle editing mode.
   * If the screensaver is running, it will be hidden.
   */
  const toggleEdit = () => {
    setEditing(!editing);
    if (screenSaver.show === true) unshowScreenSaver();
  };

  /**
   * Unshow the screen saver.
   */
  const unshowScreenSaver = () =>
    setScreenSaver({ ...screenSaver, show: false });

  /**
   * Fetch the remote config for the screensaver.
   * If an error occours, don't do anything, and hold on the the previous screensaver config.
   */
  const updateScreenSaver = () => {
    axios.get("/api/screensaver").then(response => {
      /**
       * Only if the returned values exist and are valid should the config be overwritten in state.
       */
      if (
        response.data.screensaver.url &&
        response.data.screensaver.minuteOfHour &&
        !isNaN(response.data.screensaver.minuteOfHour)
      )
        setScreenSaver({
          ...screenSaver,
          url: response.data.screensaver.url,
          minuteOfHour: response.data.screensaver.minuteOfHour
        });
    });
  };

  /**
   * Every second, check to see if the active widgets need to be refreshed with new data, or if the screensaver
   * needs to be played.
   */
  useInterval(() => {
    /**
     * Define the current date based on how many seconds have elapsed from the start time.
     *
     * This may not reflect the precise date, but it will be instantiated for each second independant of the
     * time it takes for one update cycle to complete.
     */
    const currentDate = new Date(
      (unixStart.current + secondsElapsed.current) * 1000
    );

    activeWidgetIndices.forEach(widgetIndex => {
      /**
       * If the `refreshInterval` is null, then the widget doesn't need to be refreshed (static).
       * If a suitable number of seconds have elapsed (based on `refreshInterval`), then refresh the widget.
       */
      if (
        widgets[widgetIndex].refreshInterval &&
        secondsElapsed.current % widgets[widgetIndex].refreshInterval === 0
      )
        refreshWidgetByIndex(widgetIndex);
    });

    /**
     * If the current miniute matches the minuite that the screensaver should be shown,
     * and it is the first second of the minite, then reveal the screensaver.
     */
    if (
      currentDate.getMinutes() === screenSaver.minuteOfHour &&
      currentDate.getSeconds() === 0 &&
      !screenSaver.show
    )
      setScreenSaver({ ...screenSaver, show: true });

    /**
     * If the current minuite is 30 minuites before the scheduled display of the screensaver,
     * update the screensaver config to get any new videos or new minuite of hour for display.
     */
    if (
      currentDate.getMinutes() === screenSaver.minuteOfHour - 30 &&
      currentDate.getSeconds() === 0
    )
      updateScreenSaver();

    secondsElapsed.current++;
  }, 1000);

  /**
   * If the editing mode changes, then update the model's global attributes to reflect the change.
   * Effectively removes all headings and splitters when not editing to allow for seamless display.
   */
  useEffect(() => {
    model.doAction(
      FlexLayout.Actions.updateModelAttributes({
        splitterSize: editing ? 8 : 0,
        tabSetTabStripHeight: editing ? 30 : 0,
        tabSetHeaderHeight: editing ? 25 : 0
      })
    );
  }, [editing]);

  /**
   * When the component mounts, get the data for all the active components. Only runs once, on mount.
   */
  useEffect(() => {
    activeWidgetIndices.forEach(widgetIndex => {
      if (widgets[widgetIndex].refreshInterval)
        refreshWidgetByIndex(widgetIndex);
    });
    return setWidgets(defaultWidgets.slice(0));
  }, []);

  /**
   * If the animation state changes, save to local storage.
   */
  useEffect(() => localStorage.setItem("animate", animate), [animate]);

  /**
   * If the key press state (down/up) of the editing key changes, toggle the editing state.
   */
  useEffect(() => {
    if (editKeyDown === true) toggleEdit();
  }, [editKeyDown]);

  return (
    <Container>
      {!editing && screenSaver.show ? (
        <VideoOverlay src={screenSaver.url} handleEnded={unshowScreenSaver} />
      ) : null}
      <Toolbar style={{ width: editing ? "11rem" : "0rem" }}>
        <Headline value="Toolbar" fontSize={1.5} />
        <Checkbox
          value="Animate"
          isChecked={animate}
          handleChange={() => setAnimate(!animate)}
        />
        {widgets.map((widget, widgetIndex) => (
          <Button
            key={widgetIndex}
            handleClick={() => addWidgetToModel(widgetIndex)}
            value={widget.name}
            disabled={adding}
          />
        ))}
      </Toolbar>
      <Content>
        <GlobalAnimateContext.Provider value={animate}>
          <FlexLayout.Layout
            ref={layoutRef}
            model={model}
            factory={factory}
            onModelChange={save}
          />
        </GlobalAnimateContext.Provider>
      </Content>
    </Container>
  );
};

export default App;

/**
 * Main Styles.
 *
 * NOTE - The `flexlayout` styles are provided as a seperate stylesheet by the makers of the package.
 */
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  position: relative;
  flex-grow: 1;
`;

const Toolbar = styled.div`
  background-color: #111;

  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  box-shadow: inset -3px 0px 3px 0px black;
`;

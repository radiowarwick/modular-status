import React, { useState, useEffect, useRef } from "react";
import { useInterval } from "./useInterval";
import FlexLayout from "flexlayout-react";
import styled from "styled-components";
import axios from "axios";
import "./app.css";

import Button from "./components/Button";
import Headline from "./components/Headline";

import CurrentDateTime from "./widgets/CurrentDateTime";
import CurrentWeather from "./widgets/CurrentWeather";

const App = () => {
  /**
   * Define references (mutable persistant "boxes" to hold data).
   */
  const layoutRef = useRef(null);
  const secondsElapsed = useRef(0);

  /**
   * UI Control variables to define how the UI should look in different states.
   */
  const [editing, setEditing] = useState(true);
  const [adding, setAdding] = useState(false);

  /**
   * TODO - Write comment
   *
   * Updates each render. This means that, the array may not reflect the current widgets
   * on screen until the next render.
   *
   * Used to fetch data only for the widgets on screen.
   */
  const activeWidgetIndices = [];

  /**
   * Define the widgets that can be added to the layout.
   */
  const [widgets, setWidgets] = useState([
    {
      name: "Date & Time",
      component: CurrentDateTime,
      dataURL: null,
      refreshInterval: null,
      props: { err: false, data: {} }
    },
    {
      name: "Weather",
      component: CurrentWeather,
      dataURL: "http://localhost:8080/api/weather",
      refreshInterval: 120,
      props: {
        err: false,
        data: null
      }
    }
  ]);

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
    if (!localStorage.flexLayoutJSON) {
      localStorage.setItem("flexLayoutJSON", JSON.stringify(defaultJSON));
    }
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
          err: false,
          data: response.data
        };
      })
      .catch(error => {
        newWidgets[widgetIndex].props = {
          err: true,
          data: null
        };
      })
      .then(() => {
        setWidgets(newWidgets);
        console.log("Updating: " + widgets[widgetIndex].name);
        console.log("-----------------");
      });
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
   * Toggle editing toolbar.
   */
  const toggleEdit = () => setEditing(!editing);

  /**
   * Saves the layout model to localStorage.
   */
  const save = () =>
    localStorage.setItem("flexLayoutJSON", JSON.stringify(model.toJson()));

  /**
   * Every second, check to see if the active widgets need to be refreshed with new data.
   */
  useInterval(() => {
    activeWidgetIndices.forEach(widgetIndex => {
      /**
       * If the `refreshInterval` is null, then the widget doesn't need to be refreshed (static).
       * If a suitable number of seconds have elapsed (based on `refreshInterval`), then refresh the widget.
       */
      if (
        widgets[widgetIndex].refreshInterval &&
        secondsElapsed.current % widgets[widgetIndex].refreshInterval === 0
      ) {
        refreshWidgetByIndex(widgetIndex);
      }
    });

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

  console.log("Active Widgets: ");
  console.log(activeWidgetIndices);
  console.log("-----------------");

  return (
    <Container>
      <EditIcon onClick={toggleEdit}>✎</EditIcon>
      <Toolbar style={{ width: editing ? "11rem" : "0rem" }}>
        <Headline value="Widgets" fontSize={1.5} />
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
        <FlexLayout.Layout
          ref={layoutRef}
          model={model}
          factory={factory}
          onModelChange={save}
        />
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
  overflow: hidden;
  box-shadow: inset -3px 0px 3px 0px black;
`;

const EditIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  position: fixed;
  bottom: 0;
  right: 0;
  cursor: pointer;
  color: var(--accent-colour);
  z-index: 99;
  user-select: none;
`;

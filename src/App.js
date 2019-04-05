import React, { useState, useEffect, useRef } from "react";
import FlexLayout from "flexlayout-react";
import styled from "styled-components";
import "./app.css";

import Button from "./components/Button";
import Headline from "./components/Headline";

import DateTime from "./widgets/DateTime";

const App = () => {
  const layoutRef = useRef(null);
  const [editing, setEditing] = useState(true);
  const [adding, setAdding] = useState(false);

  /**
   * Define the widgets that can be added to the layout.
   */
  const [widgets, setWidgets] = useState([
    {
      component: "DateTime",
      ref: DateTime,
      name: "Date & Time",
      dataURL: null,
      props: null
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
   * Saves the model back to localStorage.
   */
  const save = () =>
    localStorage.setItem("flexLayoutJSON", JSON.stringify(model.toJson()));

  /**
   * Returns a widget (react component) based on a node's component property.
   *
   * Uses the node's component property to extract a widget (from the widget object held in state)
   * with matching component property.
   *
   * The widget is then built dynamically, using a refence to the actual react component function (Widget.ref),
   * and with the current props (Widget.props).
   *
   * @param {object} node - A node in the flexlayout model that will be converted to a react component.
   */
  const factory = node => {
    const component = node.getComponent();
    const [Widget] = widgets.filter(widget => widget.component === component);
    return <Widget.ref {...Widget.props} />;
  };

  /**
   * Triggers an add tab event, providing a draggable box to position the new tab.
   *
   * Will add a new node to the model based on the widget passed.
   *
   * @param {object} widget - The widget that will added to the flexlayout model (as a new node).
   */
  const addWidgetToModel = widget => {
    setAdding(true);
    layoutRef.current.addTabWithDragAndDropIndirect(
      "Drag: " + widget.name,
      {
        component: widget.component,
        name: widget.name
      },
      () => setAdding(false)
    );
  };

  /**
   * Toggle editing toolbar.
   */
  const toggleEdit = () => setEditing(!editing);

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

  return (
    <Container>
      <EditIcon onClick={toggleEdit}>✎</EditIcon>
      <Toolbar style={{ width: editing ? "11rem" : "0rem" }}>
        <Headline value="Widgets" fontSize={1.5} />
        {widgets.map((widget, index) => (
          <Button
            key={index}
            handleClick={() => addWidgetToModel(widget)}
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

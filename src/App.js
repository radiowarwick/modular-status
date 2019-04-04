import React, { useState, useEffect, useRef } from "react";
import FlexLayout from "flexlayout-react";
import styled from "styled-components";
import "./app.css";

import DateTime from "./components/DateTime";
import CardList from "./components/CardList";
import Button from "./components/Button";

const App = () => {
  const layoutRef = useRef(null);
  const [editing, setEditing] = useState(true);

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
   * Default Cardlist for Demo Only.
   */
  const [cardList] = useState({
    highlighted: false,
    cards: [
      {
        id: "bs_2",
        slim: false,
        data: {
          tag: "12X",
          title: "17:02",
          subtitle: "Towards Leamington"
        }
      },
      {
        id: "oa_2",
        slim: true,
        data: {
          imageURL: "https://media.radio.warwick.ac.uk/shows/5100.large.jpg",
          title: "The Italian Football Show",
          subtitle: "17:00 - 18:00"
        }
      },
      {
        id: "lp_2",
        slim: true,
        data: {
          imageURL: "https://i.ytimg.com/vi/hNJOI2dtDZ4/maxresdefault.jpg",
          title: "Borderline",
          subtitle: "Tame Impala"
        }
      }
    ]
  });

  /**
   * Avaliable widgets.
   */
  const widgets = [
    { component: "DateTime", name: "Date & Time" },
    { component: "CardList", name: "Card List" }
  ];

  /**
   * Returns a widget (react component) based on a node's component property.
   *
   * @param {object} node
   */
  const factory = node => {
    const component = node.getComponent();
    switch (component) {
      case "DateTime":
        return <DateTime unix={1577836799} />;
      case "CardList":
        return (
          <CardList cards={cardList.cards} highlighted={cardList.highlighted} />
        );
      default:
        return <p>{node.getName()}</p>;
    }
  };

  /**
   * Saves the model back to localStorage.
   */
  const save = () =>
    localStorage.setItem("flexLayoutJSON", JSON.stringify(model.toJson()));

  /**
   * Triggers an add tab event, providing a draggable box to position the new tab.
   *
   * @param {object} widget
   */
  const addNew = widget => {
    layoutRef.current.addTabWithDragAndDropIndirect("Drag: " + widget.name, {
      component: widget.component,
      name: widget.name
    });
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
      <Toolbar style={{ display: editing ? "flex" : "none" }}>
        {widgets.map((widget, index) => (
          <Button
            key={index}
            handleClick={() => addNew(widget)}
            value={widget.name}
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
  padding: 1rem;
  background-color: #111;

  display: flex;
  flex-direction: column;
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

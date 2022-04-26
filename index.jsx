import * as React from "react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import makeGrid from "./makeGrid";

export default function PintrestGrid({
  items,
  renderItem,
  verticalSpace,
  horizontalSpace,
  responsiveColumn,
}) {
  const [cards, setCards] = useState(null);
  const [clientWidth, setClientWidth] = useState(null);
  const [currentColumn, setCurrentColumn] = useState(null);
  const [currentColumnWidth, setCurrentColumnWidth] = useState(null);
  const inputElement = useRef();

  const gridIt = () => {
    if (items.length > 1) {
      const itemHeights = items.map((item, i) => {
        if (
          inputElement.current &&
          inputElement.current.children &&
          inputElement.current.children[i].clientHeight
        ) {
          return inputElement.current.children[i].clientHeight;
        }
      });

      console.log({ itemHeights });
      setCards(
        makeGrid(
          items,
          itemHeights,
          verticalSpace,
          horizontalSpace,
          currentColumn,
          currentColumnWidth
        )
      );
    }
  };

  useLayoutEffect(() => {
    function updateSize() {
      setClientWidth(window.outerWidth);
      const _currentColumn =
        window.outerWidth < 426
          ? 2
          : window.outerWidth < 769
          ? 3
          : window.outerWidth < 1026
          ? 4
          : 5;
      // const _currentColumnWidth =
      //   window.outerWidth < 426 ? 200 : window.outerWidth < 769 ? 250 : 300;
      setCurrentColumn(_currentColumn);
      setCurrentColumnWidth(250);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    gridIt();
  }, [inputElement.current, items, currentColumn]);

  return cards && items ? (
    <div
      ref={inputElement}
      style={{
        position: `relative`,
        width: `${cards.gridWidth}px`,
        height: `${cards.gridHeight}px`,
      }}
    >
      {cards.data.map((item, i) => (
        <div
          key={i}
          style={{
            position: `absolute`,
            top: `${item.y}px`,
            left: `${item.x}px`,
            transition:
              "left 600ms cubic-bezier(0.11, 0.51, 0.342, 1) 0s," +
              "top 800ms cubic-bezier(0.11, 0.51, 0.342, 1) 0s",
            width: `${item.columnWidth}px`,
          }}
        >
          {renderItem(item.item)}
        </div>
      ))}
    </div>
  ) : (
    "Loading..."
  );
}

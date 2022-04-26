// import React, { useState, useEffect } from "react";

const defaultHeight = 300;

export default function makeGrid(
  items,
  itemHeights,
  verticalSpace,
  horizontalSpace,
  currentColumn,
  currentColumnWidth
) {
  const column = 4;
  const columnHeights = Array.from(new Float32Array(currentColumn));
  const columnWidth = currentColumnWidth;
  console.log({ currentColumnWidth });

  const data = items.map((item, i) => {
    const height = itemHeights[i];
    //find which one is MIN to add after pin on that column
    const index = columnHeights.indexOf(Math.min.apply(Math, columnHeights));
    // const height = ItemHeight(item.image_url);
    const x = index * columnWidth + index * horizontalSpace;
    const y = columnHeights[index];
    columnHeights[index] += Math.round(height) + verticalSpace;

    //Container width and height

    return { height, columnWidth, item, x, y };
  });

  const gridWidth =
    currentColumn * columnWidth + (currentColumn - 1) * horizontalSpace;
  const gridHeight = Math.max.apply(null, columnHeights) - verticalSpace;

  return { gridWidth, gridHeight, data };
}

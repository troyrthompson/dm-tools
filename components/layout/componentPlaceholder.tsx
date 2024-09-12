"use client";

import { Widget } from "../elements/Widget";

export const ComponentPlaceholder = ({text}) => {
  return (
    <Widget title={text}>
        <div className="w-32"></div>
    </Widget>
  );
};

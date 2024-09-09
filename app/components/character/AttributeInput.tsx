"use client";

import { useRef, RefObject } from "react";

interface AttributeInputProps {
  type: string;
  defaultValue: string;
  inputRef: RefObject<HTMLInputElement>;
}

export const attributeInput = ({type, defaultValue, inputRef}: AttributeInputProps) => {
  return (
    <input
        type={type}
        ref={inputRef}
        defaultValue={defaultValue} />
  );
};

import React, { useState } from "react";

import Button from "components/Button";

import { SliderGroup, SliderInput, Title, Wrapper } from "./styles";

export type SliderProps = {
  onValueChange?: (value: number) => void;
  onSave?: (value: number) => void;
};

const Slider = ({ onValueChange, onSave }: SliderProps) => {
  const [value, setValue] = useState(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    !!onValueChange && onValueChange(Number(event.target.value));
    setValue(Number(event.target.value));
  };

  const handleSave = (value: number) => {
    !!onSave && onSave(value);
  };
  return (
    <Wrapper>
      <SliderGroup>
        <Title>Crop</Title>
        <SliderInput
          min="1"
          max="2"
          step=".1"
          value={value}
          onChange={handleChange}
          data-testid="slider-input"
        />
      </SliderGroup>
      <Button onClick={() => handleSave(value)}>Save</Button>
    </Wrapper>
  );
};

export default Slider;

import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import Slider, { SliderProps } from ".";

export default {
  title: "Slider",
  component: Slider,
  argTypes: {
    onSave: { action: "saved" },
  },
} as Meta<SliderProps>;

export const Default: Story<SliderProps> = (args) => <Slider {...args} />;

Default.args = {};

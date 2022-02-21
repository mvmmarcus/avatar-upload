import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import Button, { ButtonProps } from ".";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    children: {
      type: "string",
    },
    variant: {
      control: {
        type: "select",
        options: ["link", "default"],
      },
    },
  },
} as Meta<ButtonProps>;

export const Default: Story<ButtonProps> = (args) => <Button {...args} />;

Default.args = {
  children: "Buy now",
  variant: "default",
};

export const Link: Story<ButtonProps> = (args) => <Button {...args} />;

Link.args = {
  children: "Try again",
  variant: "link",
};

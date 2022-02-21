import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import Avatar, { AvatarProps } from ".";

export default {
  title: "Avatar",
  component: Avatar,
  argTypes: {
    urlImg: {
      type: "string",
    },
    scale: {
      control: {
        disable: true,
      },
    },
    isCropping: {
      control: {
        disable: true,
      },
    },
  },
} as Meta<AvatarProps>;

export const Default: Story<AvatarProps> = (args) => <Avatar {...args} />;

Default.args = {
  urlImg:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
};

export const Error: Story<AvatarProps> = (args) => <Avatar {...args} />;

Error.args = {
  urlImg: "",
};

import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import DropZone, { DropZoneProps } from ".";

export default {
  title: "DropZone",
  component: DropZone,
  argTypes: {
    avatarUrl: {
      control: { disable: true },
    },
    errorMessage: {
      type: "string",
    },
    isCropping: {
      type: "boolean",
    },
    onTryAgain: { action: "Try again" },
    onFinishCrop: { action: "Finish crop" },
  },
} as Meta<DropZoneProps>;

export const Default: Story<DropZoneProps> = (args) => <DropZone {...args} />;

Default.args = {};

export const Cropping: Story<DropZoneProps> = (args) => <DropZone {...args} />;

Cropping.args = {
  isCropping: true,
};

export const Error: Story<DropZoneProps> = (args) => <DropZone {...args} />;

Error.args = {
  errorMessage: "Sorry, the upload failed.",
};

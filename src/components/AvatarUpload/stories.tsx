import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import AvatarUpload, { AvatarUploadProps } from ".";

export default {
  title: "AvatarUpload",
  component: AvatarUpload,
  argTypes: {
    onSave: { action: "Saved crop" },
  },
} as Meta<AvatarUploadProps>;

export const Default: Story<AvatarUploadProps> = (args) => (
  <AvatarUpload {...args} />
);

Default.args = {};

import React from "react";

import { AvatarImg, Wrapper } from "./styles";

type AvatarProps = {
  isCropping?: boolean;
  urlImg?: string;
  scale?: number;
  hasError?: boolean;
};

const Avatar = ({
  urlImg,
  scale = 1,
  isCropping = false,
  hasError = false,
}: AvatarProps) => {
  return (
    <Wrapper>
      <AvatarImg
        hasError={hasError}
        isCropping={isCropping}
        scale={scale}
        src={urlImg}
        alt="avatar image"
      />
    </Wrapper>
  );
};

export default Avatar;

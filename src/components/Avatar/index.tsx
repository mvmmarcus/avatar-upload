import React from "react";

import { AvatarImg, Wrapper } from "./styles";

export type AvatarProps = {
  isCropping?: boolean;
  urlImg?: string;
  scale?: number;
};

const Avatar = ({ urlImg, scale = 1, isCropping = false }: AvatarProps) => {
  return (
    <Wrapper>
      <AvatarImg
        hasError={!urlImg}
        isCropping={isCropping}
        scale={scale}
        src={urlImg || "/img/error.svg"}
        alt="avatar image"
      />
    </Wrapper>
  );
};

export default Avatar;

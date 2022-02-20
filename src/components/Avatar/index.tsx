import React from "react";

import { AvatarImg, Wrapper } from "./styles";

type AvatarProps = {
  isCropping?: boolean;
  urlImg?: string;
  scale?: number;
  hasError?: boolean;
  avatarRef?: React.MutableRefObject<HTMLImageElement | null> | null;
};

const Avatar = ({
  urlImg,
  scale = 1,
  avatarRef = null,
  isCropping = false,
  hasError = false,
}: AvatarProps) => {
  return (
    <Wrapper>
      <AvatarImg
        hasError={hasError}
        isCropping={isCropping}
        ref={avatarRef}
        scale={scale}
        src={urlImg}
        alt="avatar image"
      />
    </Wrapper>
  );
};

export default Avatar;

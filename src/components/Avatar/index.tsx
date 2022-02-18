import { AvatarImg, Wrapper } from "./styles";

type AvatarProps = {
  isCropping?: boolean;
  urlImg?: string;
  scale?: number;
  avatarRef?: React.MutableRefObject<HTMLImageElement | null> | null;
};

const Avatar = ({
  urlImg,
  scale = 1,
  avatarRef = null,
  isCropping = false,
}: AvatarProps) => {
  return (
    <Wrapper>
      <AvatarImg
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

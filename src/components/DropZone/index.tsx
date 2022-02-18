import Avatar from "components/Avatar";
import Button from "components/Button";
import Slider from "components/Slider";

import {
  Content,
  ErrorMessage,
  Header,
  Subtitle,
  Title,
  TitleIcon,
} from "./styles";

type DropZoneProps = {
  avatarUrl?: string | ArrayBuffer | null;
  errorMessage?: string;
  isCropping?: boolean;
  onFinishCrop?: () => void;
  onScaleChange?: (scale: number) => void;
};

const DropZone = ({
  avatarUrl,
  errorMessage,
  isCropping = false,
  onFinishCrop,
  onScaleChange,
}: DropZoneProps) => {
  const handleFinishCrop = () => {
    !!onFinishCrop && onFinishCrop();
    !!onScaleChange && onScaleChange(1);
  };

  const handleScaleChange = (scale: number) => {
    !!onScaleChange && onScaleChange(scale);
  };

  if (errorMessage) {
    return (
      <Content hasAvatar={!!avatarUrl}>
        {!!avatarUrl && <Avatar urlImg={avatarUrl as string} />}
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <Button>Try again</Button>
      </Content>
    );
  }

  return (
    <>
      {isCropping ? (
        <Content hasAvatar={!!avatarUrl}>
          <Slider onSave={handleFinishCrop} onValueChange={handleScaleChange} />
        </Content>
      ) : (
        <Content hasAvatar={!!avatarUrl}>
          <Header>
            <TitleIcon src="/img/media.svg" alt="media icon" />
            <Title>Organization Logo</Title>
          </Header>
          <Subtitle>Drop the image here or click to browse.</Subtitle>
        </Content>
      )}
    </>
  );
};

export default DropZone;
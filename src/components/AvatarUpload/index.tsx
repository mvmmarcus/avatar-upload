import React, {
  DragEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import Avatar from "components/Avatar";
import DropZone from "components/DropZone";
import { cropImage, uploadImage } from "utils/image";

import { CancelButton, FileInput, Wrapper } from "./styles";

type States = "initial" | "cropping" | "success" | "error";

type AvatarUploadProps = {
  onSave?: (base64UrlImage: string) => void;
};

const AvatarUpload = ({ onSave }: AvatarUploadProps) => {
  const avatarRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarScale, setAvatarScale] = useState<number>(1);
  const [avatarUrl, setAvatarUrl] = useState<string | ArrayBuffer | null>(null);
  const [currentState, setCurrentState] = useState<States>("initial");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const isDraggable = currentState === "initial" || currentState === "success";
  const showCancelButton =
    currentState === "cropping" || currentState === "error";

  const onDragOver: DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const onDragLeave: DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleUploadFile = useCallback(async (file: File) => {
    const validImageExtensions = ["image/jpeg", "image/jpg", "image/png"];

    if (validImageExtensions.includes(file.type)) {
      try {
        const uploadEvent = await uploadImage(file);
        const previewImageUrl = await cropImage({
          imageUrl: uploadEvent.target?.result as string,
        });
        setAvatarUrl(previewImageUrl);
        setErrorMessage("");
        setCurrentState("cropping");
      } catch (error) {
        setAvatarUrl("/img/error.svg");
        setErrorMessage("Sorry, the upload failed.");
        setCurrentState("error");
      }
    } else {
      setAvatarUrl("/img/error.svg");
      setErrorMessage("Sorry, this file extension is not supported.");
      setCurrentState("error");
    }
  }, []);

  const onDropImage: DragEventHandler<HTMLDivElement> = useCallback(
    async (event) => {
      event.preventDefault();
      setIsDragOver(false);
      const draggableStates = ["initial", "success"];

      if (event?.dataTransfer && draggableStates.includes(currentState)) {
        const file = event.dataTransfer.files[0];

        await handleUploadFile(file);
      }
    },
    [handleUploadFile, currentState]
  );

  const handleCancel = () => {
    setErrorMessage("");
    setAvatarUrl("");
    setCurrentState("initial");
  };

  const handleFinishCrop = useCallback(
    async (avatarUrl: string) => {
      if (avatarRef?.current) {
        const previewImageWidth = avatarRef.current?.width;

        const previewImageResisedWidth = previewImageWidth * avatarScale;
        const cropedPreviewImageRatio =
          previewImageWidth / previewImageResisedWidth;

        const croppedImageUrl = await cropImage({
          imageUrl: avatarUrl as string,
          previewImageRatio: cropedPreviewImageRatio,
          preserveAspectRatio: false,
        });

        !!onSave && onSave(croppedImageUrl);

        setAvatarUrl(croppedImageUrl);
        setCurrentState("success");
      }
    },
    [avatarScale, onSave]
  );

  const renderState = useMemo(() => {
    const states = {
      initial: <DropZone />,
      cropping: (
        <DropZone
          isCropping
          avatarUrl={avatarUrl}
          onFinishCrop={() => handleFinishCrop(avatarUrl as string)}
          onScaleChange={setAvatarScale}
        />
      ),
      success: <DropZone avatarUrl={avatarUrl} />,
      error: <DropZone errorMessage={errorMessage} onTryAgain={handleCancel} />,
    };

    return states[currentState];
  }, [currentState, avatarUrl, errorMessage, handleFinishCrop]);

  const handleBrowseFile = (
    fileInputRef: React.MutableRefObject<HTMLInputElement | null>
  ) => {
    if (fileInputRef?.current) {
      fileInputRef.current.click();
    }
  };

  const handleChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    if (event?.target?.files) {
      const file = event.target?.files[0];
      await handleUploadFile(file);
    }
  };

  return (
    <Wrapper
      onDragOver={onDragOver}
      onDrop={onDropImage}
      onDragLeave={onDragLeave}
      isDraggable={isDraggable}
      isDragOver={isDragOver && isDraggable}
      onClick={() => isDraggable && handleBrowseFile(fileInputRef)}
    >
      {isDraggable && (
        <FileInput type="file" ref={fileInputRef} onChange={handleChangeFile} />
      )}
      {!!avatarUrl && (
        <Avatar
          avatarRef={avatarRef}
          isCropping={currentState === "cropping"}
          scale={avatarScale}
          urlImg={avatarUrl as string}
          hasError={!!errorMessage}
        />
      )}
      {renderState}
      {showCancelButton && (
        <CancelButton
          onClick={() => handleCancel()}
          src="/img/close.svg"
          alt="cancel button"
        />
      )}
    </Wrapper>
  );
};

export default AvatarUpload;

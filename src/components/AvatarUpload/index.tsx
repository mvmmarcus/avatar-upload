import {
  DragEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import DropZone from "components/DropZone";

import { CancelButton, Wrapper } from "./styles";
import Avatar from "components/Avatar";

type States = "initial" | "cropping" | "success" | "error";

const AvatarUpload = () => {
  const avatarRef = useRef<HTMLImageElement | null>(null);
  const [avatarScale, setAvatarScale] = useState<number>(1);
  const [avatarUrl, setAvatarUrl] = useState<string | ArrayBuffer | null>(null);
  const [currentState, setCurrentState] = useState<States>("initial");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const showCancelButton =
    currentState === "success" || currentState === "error";

  const onDragOver: DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault();
  }, []);

  const onDropImage: DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      const draggableStates = ["initial", "success"];

      if (event?.dataTransfer && draggableStates.includes(currentState)) {
        const file = event.dataTransfer.files[0];
        const validExtensions = ["image/jpeg", "image/jpg", "image/png"];

        if (validExtensions.includes(file.type)) {
          const fileReader = new FileReader();

          fileReader.onload = function (event) {
            const image = new Image();
            image.src = event?.target?.result as string;

            image.onload = function () {
              const defaultAvatarWidth = 114;
              const ratio = image.height / image.width;

              const canvas = document.createElement("canvas");
              canvas.width = defaultAvatarWidth;
              canvas.height = defaultAvatarWidth * ratio;
              const context = canvas.getContext("2d");

              context!.imageSmoothingQuality = "high";
              context!.drawImage(image, 0, 0, canvas.width, canvas.height);

              setAvatarUrl(canvas.toDataURL());
              setErrorMessage("");
              setCurrentState("cropping");
            };
          };

          fileReader.onerror = () => {
            setAvatarUrl("/img/error.svg");
            setErrorMessage("Sorry, the upload failed.");
            setCurrentState("error");
            console.log("Sorry, the upload failed.");
          };

          fileReader.readAsDataURL(file);
        } else {
          setAvatarUrl("/img/error.svg");
          setErrorMessage("Sorry, this file extension is not suported.");
          setCurrentState("error");
          console.log("file extension is not suported");
        }
      }
    },
    [currentState]
  );

  const handleResetState = () => {
    setErrorMessage("");
    setAvatarUrl("");
    setCurrentState("initial");
  };

  const handleFinishCrop = useCallback(() => {
    const image = new Image();
    image.src = avatarUrl as string;

    image.onload = function () {
      if (avatarRef.current) {
        const resizedWidth = avatarRef?.current?.width * avatarScale;
        const resizedHeight = avatarRef?.current?.height * avatarScale;

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = resizedWidth;
        canvas.height = resizedHeight;

        context!.imageSmoothingQuality = "high";
        context!.drawImage(image, 0, 0, canvas.width, canvas.height);

        setAvatarUrl(canvas.toDataURL());
        setCurrentState("success");
      }
    };
  }, [avatarUrl, avatarScale]);

  const renderState = useMemo(() => {
    const states = {
      initial: <DropZone />,
      cropping: (
        <DropZone
          isCropping
          avatarUrl={avatarUrl}
          onFinishCrop={handleFinishCrop}
          onScaleChange={setAvatarScale}
        />
      ),
      success: <DropZone avatarUrl={avatarUrl} />,
      error: <DropZone errorMessage={errorMessage} />,
    };

    return states[currentState];
  }, [currentState, avatarUrl, errorMessage, handleFinishCrop]);

  return (
    <Wrapper onDragOver={onDragOver} onDrop={onDropImage}>
      {!!avatarUrl && (
        <Avatar
          avatarRef={avatarRef}
          isCropping={currentState === "cropping"}
          scale={avatarScale}
          urlImg={avatarUrl as string}
        />
      )}
      {renderState}
      {showCancelButton && (
        <CancelButton
          onClick={() => handleResetState()}
          src="/img/close.svg"
          alt="cancel button"
        />
      )}
    </Wrapper>
  );
};

export default AvatarUpload;

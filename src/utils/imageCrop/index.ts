type CropImageProps = {
  imageUrl: string;
  cropWidth?: number;
  preserveAspectRatio?: boolean;
  previewImageRatio?: number;
};

export const addImageProcess = async (
  imageSource: string
): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = imageSource;
  });
};

export const cropImage = async ({
  imageUrl,
  cropWidth = 300,
  preserveAspectRatio = true,
  previewImageRatio = 1,
}: CropImageProps) => {
  const image = await addImageProcess(imageUrl);

  const ratio = image.height / image.width;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (preserveAspectRatio) {
    canvas.width = image.width < cropWidth ? image.width : cropWidth;
    canvas.height = image.width < cropWidth ? image.height : cropWidth * ratio;

    !!context && context.drawImage(image, 0, 0, canvas.width, canvas.height);
  } else {
    canvas.width = previewImageRatio * image.width;
    canvas.height = canvas.width;

    const cropDistanceX = (image.width - canvas.width) / 2;
    const cropDistanceY = (image.height - canvas.height) / 2;

    !!context &&
      context.drawImage(
        image,
        cropDistanceX,
        cropDistanceY,
        canvas.width,
        canvas.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
  }

  const croppedImageUrl = canvas.toDataURL();

  return croppedImageUrl;
};

export const uploadImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      !!fileReader.result && resolve(fileReader.result as string);
    };
    fileReader.onerror = reject;
    fileReader.readAsDataURL(file);
  });
};

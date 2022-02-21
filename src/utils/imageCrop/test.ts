import { uploadImage, cropImage } from ".";

describe("uploadImage()", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should upload image file and return base64 url", async () => {
    const file = new File(["file"], "image.png", {
      type: "image/png",
    });

    const imageUrl = await uploadImage(file);

    expect(imageUrl).toBe("data:image/png;base64,ZmlsZQ==");
  });
});

describe("cropImage()", () => {
  beforeAll(() => {
    Object.defineProperty(global.Image.prototype, "src", {
      set() {
        setTimeout(() => this.onload());
      },
    });
  });

  it("should crop image and return base64 url", async () => {
    const croppedImageUrl = await cropImage({
      imageUrl: "image_url",
      previewImageRatio: 1,
      cropWidth: 0,
    });

    expect(croppedImageUrl).toEqual("data:image/png;base64,00");
  });
  it("should crop image and return base64 url when image width is less than crop value", async () => {
    const croppedImageUrl = await cropImage({
      imageUrl: "image_url",
      previewImageRatio: 1,
      cropWidth: 300,
    });

    expect(croppedImageUrl).toEqual("data:image/png;base64,00");
  });
  it("should crop image without preserve aspect ratio and return base64 url", async () => {
    const croppedImageUrl = await cropImage({
      imageUrl: "image_url",
      preserveAspectRatio: false,
    });

    expect(croppedImageUrl).toEqual("data:image/png;base64,00");
  });
});

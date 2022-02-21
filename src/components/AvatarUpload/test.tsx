/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { fireEvent, screen, waitFor } from "@testing-library/react";

import AvatarUpload from ".";
import theme from "styles/theme";
import { renderWithTheme } from "utils/test/test-utils";

import * as imageUtils from "utils/image/image";

describe("<AvatarUpload />", () => {
  jest.spyOn(imageUtils, "uploadImage").mockResolvedValue("image_url");
  jest.spyOn(imageUtils, "cropImage").mockResolvedValue("image_url");

  const file = new File(["file"], "image.png", {
    type: "image/png",
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render AvatarUpload as default", () => {
    const { container } = renderWithTheme(<AvatarUpload />);

    expect(container.firstChild).toHaveStyle({ border: theme.border.dashed });
    expect(
      screen.getByRole("img", { name: /media icon/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Organization Logo/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Drop the image here or click to browse.")
    ).toBeInTheDocument();
  });

  it("should invoke dragover and dragleave events", async () => {
    const data = mockDropData([file]);

    const { container } = renderWithTheme(<AvatarUpload />);

    const dropZone = screen.getByTestId("drop-area");

    fireEvent.dragOver(dropZone, data);
    expect(container.firstChild).toHaveStyle({
      border: theme.border.activeDashed,
    });

    fireEvent.dragLeave(dropZone, data);
    expect(container.firstChild).toHaveStyle({
      border: theme.border.dashed,
    });
  });

  it("should drop image", async () => {
    const data = mockDropData([file]);

    renderWithTheme(<AvatarUpload />);

    const dropZone = screen.getByTestId("drop-area");

    await waitFor(() => {
      fireEvent.drop(dropZone, data);
    });

    expect(screen.getByText("Crop")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });
  it("should get error on upload image", async () => {
    jest.spyOn(imageUtils, "uploadImage").mockImplementation(() => {
      return Promise.reject();
    });

    const data = mockDropData([file]);

    renderWithTheme(<AvatarUpload />);

    const dropZone = screen.getByTestId("drop-area");

    await waitFor(() => {
      fireEvent.drop(dropZone, data);
    });

    expect(screen.getByText("Sorry, the upload failed.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
  });
  it("should get an error when trying to drop a file with unsupported extension", async () => {
    const pdfFile = new File(["file"], "file.pdf", {
      type: "file.pdf",
    });
    const data = mockDropData([pdfFile]);

    renderWithTheme(<AvatarUpload />);

    const dropZone = screen.getByTestId("drop-area");

    await waitFor(() => {
      fireEvent.drop(dropZone, data);
    });

    expect(
      screen.getByText("Sorry, this file extension is not supported.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
  });
  it("should cancel image cropping", async () => {
    jest.spyOn(imageUtils, "uploadImage").mockResolvedValue("image_url");

    const data = mockDropData([file]);

    renderWithTheme(<AvatarUpload />);

    const dropZone = screen.getByTestId("drop-area");

    await waitFor(() => {
      fireEvent.drop(dropZone, data);
    });

    expect(screen.getByText("Crop")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();

    fireEvent.click(screen.getByAltText("cancel button"));

    expect(
      screen.getByText("Drop the image here or click to browse.")
    ).toBeInTheDocument();
  });

  it("should finish image cropping", async () => {
    const onSave = jest.fn();

    const data = mockDropData([file]);

    renderWithTheme(<AvatarUpload onSave={onSave} />);

    const dropZone = screen.getByTestId("drop-area");

    await waitFor(() => {
      fireEvent.drop(dropZone, data);
    });

    fireEvent.change(screen.getByTestId("slider-input"), {
      target: {
        value: 1.5,
      },
    });

    expect(screen.getByRole("img", { name: /avatar image/i })).toHaveAttribute(
      "scale",
      "1.5"
    );

    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: /save/i }));
    });

    expect(onSave).toBeCalledWith("image_url");
    expect(screen.getByRole("img", { name: /avatar image/i })).toHaveAttribute(
      "src",
      "image_url"
    );
    expect(
      screen.getByText("Drop the image here or click to browse.")
    ).toBeInTheDocument();
  });

  it("should browse image when click on drop zone", async () => {
    const data = mockBrowseData([file]);

    renderWithTheme(<AvatarUpload />);

    const fileInput = screen.getByTestId("file-input");

    fireEvent.click(fileInput);

    await waitFor(() => {
      fireEvent.change(fileInput, data);
    });

    expect(screen.getByText("Crop")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("should can drop image only on draggable states", async () => {
    const data = mockDropData([file]);

    renderWithTheme(<AvatarUpload />);

    const dropZone = screen.getByTestId("drop-area");

    await waitFor(() => {
      fireEvent.drop(dropZone, data);
    });

    expect(screen.getByText("Crop")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();

    await waitFor(() => {
      fireEvent.drop(dropZone, data);
    });

    expect(screen.getByText("Crop")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });
});

function mockDropData(files: File[]) {
  return {
    dataTransfer: {
      files,
      items: files.map((file) => ({
        kind: "file",
        type: file.type,
        getAsFile: () => file,
      })),
      types: [],
    },
  };
}

function mockBrowseData(files: File[]) {
  return {
    target: {
      files,
      items: files.map((file) => ({
        kind: "file",
        type: file.type,
        getAsFile: () => file,
      })),
      types: [],
    },
  };
}

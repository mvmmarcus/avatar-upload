import React from "react";

import { fireEvent, screen } from "@testing-library/react";

import DropZone from ".";
import { renderWithTheme } from "utils/test/test-utils";

describe("<Slider />", () => {
  it("should render DropZone as default", () => {
    const { container } = renderWithTheme(<DropZone />);

    expect(
      screen.getByRole("img", { name: /media icon/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Organization Logo/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Drop the image here or click to browse.")
    ).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should change image scale and finish croppping", () => {
    const onFinishCrop = jest.fn();
    const onScaleChange = jest.fn();

    const { container } = renderWithTheme(
      <DropZone
        onFinishCrop={onFinishCrop}
        onScaleChange={onScaleChange}
        isCropping
      />
    );

    const sliderInput = screen.getByTestId("slider-input");
    const saveButton = screen.getByRole("button", { name: /save/i });

    fireEvent.change(sliderInput, {
      target: {
        value: 1.5,
      },
    });
    fireEvent.click(saveButton);

    expect(onScaleChange).toHaveBeenCalledWith(1.5);
    expect(onFinishCrop).toHaveBeenCalledWith();

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render with error and click on try again button", () => {
    const onFinishCrop = jest.fn();

    const { container } = renderWithTheme(
      <DropZone
        onTryAgain={onFinishCrop}
        errorMessage="Sorry, the upload failed."
      />
    );

    expect(screen.getByText("Sorry, the upload failed.")).toBeInTheDocument();
    const tryAgainButton = screen.getByRole("button", { name: /try again/i });

    fireEvent.click(tryAgainButton);

    expect(onFinishCrop).toHaveBeenCalledWith();

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render with success", () => {
    const { container } = renderWithTheme(<DropZone avatarUrl="image_url" />);

    expect(container.firstChild).toHaveStyle("align-items: center");
    expect(
      screen.getByRole("img", { name: /media icon/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Organization Logo/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Drop the image here or click to browse.")
    ).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });
});

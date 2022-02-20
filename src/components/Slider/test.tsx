import React from "react";

import { fireEvent, screen } from "@testing-library/react";

import Slider from ".";
import { renderWithTheme } from "utils/test-utils";

describe("<Slider />", () => {
  it("should render slider as default", () => {
    const { container } = renderWithTheme(<Slider />);

    expect(screen.getByText(/crop/i)).toBeInTheDocument();
    expect(screen.getByTestId("slider-input")).toHaveProperty("value", "1");
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should change slider value", () => {
    const onValueChange = jest.fn();

    const { container } = renderWithTheme(
      <Slider onValueChange={onValueChange} />
    );

    const sliderInput = screen.getByTestId("slider-input");

    fireEvent.change(sliderInput, {
      target: {
        value: 1.5,
      },
    });

    expect(onValueChange).toHaveBeenCalledWith(1.5);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should save image crop", () => {
    const onSave = jest.fn();

    const { container } = renderWithTheme(<Slider onSave={onSave} />);

    const sliderInput = screen.getByTestId("slider-input");
    const saveButton = screen.getByRole("button", { name: /save/i });

    fireEvent.change(sliderInput, {
      target: {
        value: 1.5,
      },
    });

    fireEvent.click(saveButton);

    expect(onSave).toHaveBeenCalledWith(1.5);

    expect(container.firstChild).toMatchSnapshot();
  });
});

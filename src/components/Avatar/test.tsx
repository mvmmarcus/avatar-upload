import React from "react";

import { screen } from "@testing-library/react";

import Avatar from ".";
import { renderWithTheme } from "utils/test/test-utils";

describe("<Avatar />", () => {
  it("should render avatar with specific url", () => {
    const { container } = renderWithTheme(
      <Avatar urlImg="image_url" isCropping={false} />
    );

    expect(screen.getByRole("img", { name: /avatar image/i })).toHaveAttribute(
      "src",
      "image_url"
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render avatar with diferent scale", () => {
    const { container } = renderWithTheme(
      <Avatar urlImg="image_url" scale={1.5} isCropping />
    );

    expect(screen.getByRole("img", { name: /avatar image/i })).toHaveAttribute(
      "scale",
      "1.5"
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render avatar with error", () => {
    const { container } = renderWithTheme(
      <Avatar urlImg="/img/error.svg" hasError />
    );

    expect(screen.getByRole("img", { name: /avatar image/i })).toHaveStyle(
      "width: auto"
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

import React from "react";

import { screen } from "@testing-library/react";

import Avatar from ".";
import { renderWithTheme } from "utils/test-utils";

describe("<Avatar />", () => {
  it("should render avatar with specific url", () => {
    const unsplashTestImageUrl =
      "https://images.unsplash.com/photo-1645300188328-6708bd739a81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80";

    const { container } = renderWithTheme(
      <Avatar
        urlImg={unsplashTestImageUrl}
        avatarRef={null}
        isCropping={false}
      />
    );

    expect(screen.getByRole("img", { name: /avatar image/i })).toHaveProperty(
      "src",
      unsplashTestImageUrl
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render avatar with diferent scale", () => {
    const unsplashTestImageUrl =
      "https://images.unsplash.com/photo-1645300188328-6708bd739a81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80";

    const { container } = renderWithTheme(
      <Avatar urlImg={unsplashTestImageUrl} scale={1.5} isCropping />
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

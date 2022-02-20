import React from "react";

import { screen } from "@testing-library/react";

import Button from ".";
import theme from "styles/theme";
import { renderWithTheme } from "utils/test-utils";

describe("<Button />", () => {
  it("should render default button", () => {
    const { container } = renderWithTheme(<Button>Save</Button>);

    expect(screen.getByRole("button", { name: /Save/i })).toHaveStyle({
      "background-color": theme.colors.gray07,
    });

    expect(container.firstChild).toMatchSnapshot();
  });
  it("should render link button", () => {
    const { container } = renderWithTheme(<Button variant="link">Save</Button>);

    expect(screen.getByRole("button", { name: /Save/i })).toHaveStyle({
      background: "transparent",
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});

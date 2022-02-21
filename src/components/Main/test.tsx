import React from "react";

import { screen } from "@testing-library/react";

import Main from ".";
import { renderWithTheme } from "utils/test-utils";

describe("<Main />", () => {
  it("should render main component", () => {
    const { container } = renderWithTheme(<Main>Main</Main>);

    expect(screen.getByText(/main/i)).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });
});

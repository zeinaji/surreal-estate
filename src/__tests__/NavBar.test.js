import React from "react";
import NavBar from "../components/NavBar";
import { render } from "@testing-library/react";

describe("NavBar", () => {
  xit("renders correctly", () => {
    const { asFragment } = render(<NavBar />);
    expect(asFragment()).toMatchSnapshot();
  });
});

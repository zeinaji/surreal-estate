import React from "react";
import Alert from "../components/Alert";
import { render } from "@testing-library/react";

describe("Alert", () => {
  xit("it renders", () => {
    const { asFragment } = render(<Alert message="Error!" success={false} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders error message", () => {
    const { getByText } = render(<Alert message="Error!" success={false} />);
    expect(getByText("Error!")).toBeInTheDocument();
  });

  it("renders success message", () => {
    const { getByText } = render(<Alert message="Success!!!" success={true} />);
    expect(getByText("Success!!!")).toBeInTheDocument();
  });
});

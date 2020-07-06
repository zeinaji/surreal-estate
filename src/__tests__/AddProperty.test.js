import React from "react";
import { render, getByDisplayValue } from "@testing-library/react";
import AddProperty from "../components/AddProperty";

describe("AddProperty", () => {
  xit("renders correctly", () => {
    const { asFragment } = render(<AddProperty />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders all input fields and button", () => {
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <AddProperty />
    );

    const title = getByPlaceholderText("Title");
    expect(title).toHaveAttribute("id-", "title");

    const type = getByDisplayValue("Flat");
    expect(type).toHaveAttribute("id", "type");

    const bedrooms = getByPlaceholderText("Bedrooms number");
    expect(bedrooms).toHaveAttribute("id-", "bedrooms");

    const bathrooms = getByPlaceholderText("Bathrooms number");
    expect(bathrooms).toHaveAttribute("id-", "bathrooms");

    const price = getByPlaceholderText("Price");
    expect(price).toHaveAttribute("id-", "price");

    const city = getByDisplayValue("Manchester");
    expect(city).toHaveAttribute("id", "city");

    const email = getByPlaceholderText("example@hotmail.com");
    expect(email).toHaveAttribute("id-", "email");

    const add = getByText("Add");
    expect(add).toHaveAttribute("type", "submit");
  });
});

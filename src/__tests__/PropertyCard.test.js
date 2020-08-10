import React from "react";
import PropertyCard from "../components/PropertyCard";
import { render } from "@testing-library/react";

describe("PropertyCard", () => {
  it("renders", () => {
    const { asFragment } = render(<PropertyCard />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with the correct props", () => {
    const property = {
      title: "2 Bedroom Flat",
      type: "Flat",
      city: "Manchester",
      bathrooms: 2,
      bedrooms: 3,
      price: 1000.0,
      email: "example@example.com",
    };
    // const { title, type, city, bathrooms, bedrooms, price, email } = property;

    const { getByText, getByAltText } = render(
      <PropertyCard
        {...property}
        /* title={title}
        type={type}
        city={city}
        bathrooms={bathrooms}
        bedrooms={bedrooms}
        price={price}
    email={email} */
      />
    );

    const logo = getByAltText("logo");
    expect(logo).toBeInTheDocument();

    const titleElement = getByText("2 Bedroom Flat");
    expect(titleElement).toHaveClass("title");

    const typeElement = getByText(/Flat - /);
    expect(typeElement).toHaveClass("type-city");

    const cityElement = getByText(/Manchester/);
    expect(cityElement).toHaveClass("type-city");

    const bathroomsElement = getByText("2");
    expect(bathroomsElement).toHaveClass("bathrooms");

    const bedroomsElement = getByText("3");
    expect(bedroomsElement).toHaveClass("bedrooms");

    const priceElement = getByText(/1000/);
    expect(priceElement).toHaveClass("price");

    expect(document.querySelector("a").getAttribute("href")).toBe(
      "mailto:example@example.com"
    );
  });
});

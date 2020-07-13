import React from "react";
import { render, wait } from "@testing-library/react";
import Properties from "../components/Properties";
import getProperties from "../requests/get-properties";
jest.mock("../requests/get-properties");

describe("Properties", () => {
  beforeEach(() => {
    getProperties.mockResolvedValue({
      status: 200,
      data: [
        {
          _id: "1",
          title: "Manchester City Centre",
          type: "Terraces",
          bedrooms: 2,
          bathrooms: 3,
          price: 1000,
          city: "Manchester",
          email: "example123@example.com",
        },
        {
          title: "2 Bedroom Flat",
          type: "Flat",
          city: "Manchester",
          bathrooms: 2,
          bedrooms: 3,
          price: 1000.0,
          email: "example@example.com",
        },
      ],
    });
  });
  it("renders", async () => {
    const { asFragment } = render(<Properties />);
    await wait(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("renders all property cards", async () => {
    const { getAllByAltText } = render(<Properties />);
    await wait(() => {
      expect(getAllByAltText("logo")).toHaveLength(2);
    });
  });

  it("renders an error message when there is an error", async () => {
    getProperties.mockResolvedValue({ status: 404 });
    const { getByText } = render(<Properties />);
    await wait(() => {
      expect(getByText("This has not been successful")).toBeInTheDocument();
    });
  });
});

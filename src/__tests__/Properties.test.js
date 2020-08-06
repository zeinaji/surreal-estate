import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import Properties from "../components/Properties";
import getProperties from "../requests/get-properties";
import { MemoryRouter, Route } from "react-router-dom";
import { act } from "react-dom/test-utils";

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
          city: "Leeds",
          bathrooms: 2,
          bedrooms: 3,
          price: 1000.0,
          email: "example@example.com",
        },

        {
          title: "3 Bedroom Sheffield House",
          type: "Terraced",
          city: "Sheffield",
          bathrooms: 1,
          bedrooms: 3,
          price: 1200.0,
          email: "example567@example.com",
        },
      ],
    });
  });

  xit("renders", async () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={["/view-properties"]}>
        <Properties />
      </MemoryRouter>
    );
    await wait(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("renders all property cards", async () => {
    const { getAllByAltText } = render(
      <MemoryRouter initialEntries={["/view-properties"]}>
        <Properties />
      </MemoryRouter>
    );
    await wait(() => {
      expect(getAllByAltText("logo")).toHaveLength(3);
    });
  });

  it("renders an error message when there is an error", async () => {
    getProperties.mockResolvedValue({ status: 404 });
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Properties />
      </MemoryRouter>
    );

    await wait(() => {
      expect(
        getByText("There has been an error, please try again later!")
      ).toBeInTheDocument();
    });
  });

  it("clicking filter links updates product query params", async () => {
    let testHistory, testLocation;

    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Properties />
        <Route
          path="*"
          render={({ history, location }) => {
            testHistory = history;
            testLocation = location;
            return null;
          }}
        />
      </MemoryRouter>
    );

    act(() => {
      const liverpoolLink = getByText("Liverpool");
      liverpoolLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    await wait(() => {
      expect(testLocation.pathname).toBe("/");
      expect(testLocation.search).toBe(`?query={"city":"Liverpool"}`);
    });
  });

  it("clikcing filter links updates product query params", async () => {
    let testHistory, testLocation;

    const { getByText } = render(
      <MemoryRouter initialEntries={[`/?query={"city":"Manchester"}`]}>
        <Properties />
        <Route
          path="*"
          render={({ history, location }) => {
            testHistory = history;
            testLocation = location;
            return null;
          }}
        />
      </MemoryRouter>
    );

    act(() => {
      const ascendingLink = getByText("Price ascending");
      ascendingLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    await wait(() => {
      expect(testLocation.pathname).toBe("/");
      expect(testLocation.search).toBe(
        `?query={"city":"Manchester"}&sort={"price":1}`
      );
    });
  });

  it("filters by search", async () => {
    let testHistory, testLocation, input;
    const { getByPlaceholderText, getByRole } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Properties />
        <Route
          path="*"
          render={({ history, location }) => {
            testHistory = history;
            testLocation = location;
            return null;
          }}
        />
      </MemoryRouter>
    );

    act(() => {
      input = getByPlaceholderText("Search");
      fireEvent.change(input, { target: { value: "flat" } });
    });

    const button = document.querySelector(".search-button");
    fireEvent.click(button);

    await wait(() => {
      expect(testLocation.pathname).toBe("/");
      expect(testLocation.search).toBe(`?query={"title":{"$regex":"Flat"}}`);
    });
  });
});

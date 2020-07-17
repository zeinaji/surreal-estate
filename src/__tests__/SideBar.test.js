import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SideBar from "../components/SideBar";
import { act } from "react-dom/test-utils";
import Properties from "../components/Properties";

describe("SideBar", () => {
  xit("renders", async () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={["/"]}>
        <SideBar />
      </MemoryRouter>
    );

    await wait(() => expect(asFragment()).toMatchSnapshot());
  });
});

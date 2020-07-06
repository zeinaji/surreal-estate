import React from "react";
import { render } from "@testing-library/react";
import App from "../components/App";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

xtest("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText("Hi");
  expect(linkElement).toBeInTheDocument();
});

test("navigates when you click the navbar links", () => {
  const { container, getByText } = render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  expect(container.innerHTML).toMatch("Properties page");

  act(() => {
    const addPropertyLink = getByText(/Add a Property/i);
    addPropertyLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(document.body.textContent).toMatch("Price");
});

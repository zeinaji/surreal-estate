import React from "react";
import { render, fireEvent, wait, act } from "@testing-library/react";
import AddProperty from "../components/AddProperty";

//requests
import addProperty from "../requests/add-property";
jest.mock("../requests/add-property");

describe("AddProperty", () => {
  let title;
  let type;
  let bedrooms;
  let bathrooms;
  let price;
  let city;
  let email;
  let add;

  beforeEach(() => {
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <AddProperty />
    );

    title = getByPlaceholderText("Title");
    type = getByDisplayValue("Flat");
    bedrooms = getByPlaceholderText("Bedrooms number");
    bathrooms = getByPlaceholderText("Bathrooms number");
    price = getByPlaceholderText("Price");
    city = getByDisplayValue("Manchester");
    email = getByPlaceholderText("example@hotmail.com");
    add = getByText("Add");

    addProperty.mockResolvedValue({ status: 201 });
  });
  xit("renders correctly", () => {
    const { asFragment } = render(<AddProperty />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders all input fields and button", () => {
    expect(title).toHaveAttribute("id-", "title");
    expect(type).toHaveAttribute("id", "type");
    expect(bedrooms).toHaveAttribute("id-", "bedrooms");
    expect(bathrooms).toHaveAttribute("id", "bathrooms");
    expect(price).toHaveAttribute("id-", "price");
    expect(city).toHaveAttribute("id", "city");
    expect(email).toHaveAttribute("id-", "email");
    expect(add).toHaveAttribute("type", "submit");
  });

  xit("catches and posts the user's input", async () => {
    act(() => {
      fireEvent.change(title, {
        target: { value: "City Centre Flat" },
      });
      fireEvent.change(bedrooms, {
        target: { value: 2 },
      });
      fireEvent.change(bathrooms, {
        target: { value: 1 },
      });
      fireEvent.change(price, {
        target: { value: 600 },
      });
      fireEvent.change(city, {
        target: { value: "Sheffield" },
      });
      fireEvent.change(email, {
        target: { value: "exampleemail@example.com" },
      });
    });
    fireEvent.click(add);

    await wait(() => {
      expect(title.value).toBe("City Centre Flat");
      expect(type.value).toBe("Flat");
      expect(bedrooms.value).toBe("2");
      expect(bathrooms.value).toBe("1");
      expect(price.value).toBe("600");
      expect(city.value).toBe("Sheffield");
      expect(email.value).toBe("exampleemail@example.com");

      expect(addProperty).toHaveBeenCalledTimes(1);
      expect(addProperty).toHaveBeenCalledWith({
        title: "City Centre Flat",
        type: "Flat",
        bedrooms: "2",
        bathrooms: "1",
        price: 600,
        city: "Sheffield",
        email: "exampleemail@example.com",
      });
    });
  });

  it("it doesn't render the Alert component before anything is added", () => {
    const { queryByText } = render(<AddProperty />);
    expect(queryByText(/successfully/)).not.toBeInTheDocument();
    expect(queryByText(/error/)).toBeFalsy();
  });

  it("renders the Alert component when the request is successful", async () => {
    const { getByText } = render(<AddProperty />);
    addProperty.mockResolvedValue({
      status: 404,
    });
    fireEvent.click(add);

    await wait(() => expect(getByText(/error/)).toBeInTheDocument());
  });

  it("renders the Alert component when the request is succesful", async () => {
    const { getByText } = render(<AddProperty />);
    addProperty.mockResolvedValue({ status: 201 });
    fireEvent.click(add);

    await wait(() => expect(getByText(/successfully/)).toBeInTheDocument());
  });
});

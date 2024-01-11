import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react"; // Import the useState functio
import { toBeInTheDocument } from "@testing-library/jest-dom";

expect.extend({ toBeInTheDocument }); // Extend the Jest matchers with the toBeInTheDocument function

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/frontend/);
  expect(linkElement).toBeInTheDocument();
});

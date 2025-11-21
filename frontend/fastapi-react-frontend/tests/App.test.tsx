import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import App from "../src/App";
import { renderWithProviders } from "./test-utils";

describe("App routing", () => {
  it("renders Homepage on /", () => {
    renderWithProviders(<App />, "/");

    expect(screen.getByText(/Add a User/i)).toBeInTheDocument();
  });

  it("renders IndividualUserPage on /users/1", () => {
    renderWithProviders(<App />, "/users/1");

    expect(screen.getByText(/user/i)).toBeInTheDocument();
  });

  it("renders NotFound on unknown route", () => {
    renderWithProviders(<App />, "/this/does/not/exist");

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});

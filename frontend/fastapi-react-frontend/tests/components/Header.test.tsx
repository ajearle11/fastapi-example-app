import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {Header} from "../../src/components/";

describe("Header", () => {
  it("renders the header container", () => {
    render(<Header />);

    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
  });

  it("shows the app title", () => {
    render(<Header />);

    expect(screen.getByText(/FastAPI-React/i)).toBeInTheDocument();
  });

  it("has a link to the homepage", () => {
    render(<Header />);

    const link = screen.getByRole("link", { name: /FastAPI-React/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});

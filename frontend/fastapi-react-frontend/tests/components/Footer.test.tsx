import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {Footer} from "../../src/components/";

describe("Footer", () => {
  it("renders the footer with company text", () => {
    render(<Footer />);

    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
    expect(
      screen.getByText(/Alex Earle Ltd\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Providing reliable tech since 2019/i)
    ).toBeInTheDocument();
  });

  it("shows the Social section heading", () => {
    render(<Footer />);

    expect(screen.getByText(/social/i)).toBeInTheDocument();
  });

  it("renders the social icon links", () => {
    render(<Footer />);
    const links = screen.getAllByRole("heading");
    expect(links).toHaveLength(1);
  });
});

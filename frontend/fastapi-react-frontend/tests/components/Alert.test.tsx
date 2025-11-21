import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {Alert} from "../../src/components";

describe("Alert", () => {
  it("renders the alert text", () => {
    render(<Alert type="alert-success" text="All good!" />);

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(screen.getByText("All good!")).toBeInTheDocument();
  });

  it("applies the correct success class", () => {
    render(<Alert type="alert-success" text="Success" />);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("alert");
    expect(alert).toHaveClass("alert-success");
    expect(alert).toHaveClass("absolute", "top-10");
  });

  it("applies the correct info class", () => {
    render(<Alert type="alert-info" text="Info" />);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("alert-info");
  });

  it("applies the correct error class", () => {
    render(<Alert type="alert-error" text="Error" />);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("alert-error");
  });
});

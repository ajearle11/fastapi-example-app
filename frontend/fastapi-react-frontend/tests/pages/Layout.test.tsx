import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { Layout } from "../../src/pages";

vi.mock("../src/components", () => ({
  Header: () => <header data-testid="header">Header</header>,
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

describe("Layout", () => {
  it("renders Header, Footer and outlet content", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<Layout />}>
            <Route
              index
              element={<div data-testid="content">Main Content</div>}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();

    expect(screen.getByTestId("footer")).toBeInTheDocument();

    expect(screen.getByTestId("content")).toBeInTheDocument();
  });
});

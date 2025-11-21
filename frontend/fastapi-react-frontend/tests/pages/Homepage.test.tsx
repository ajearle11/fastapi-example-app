import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import { Homepage } from "../../src/pages";

// Mock the child components so we don't depend on their internals here
vi.mock("../src/components", () => ({
  AddUserForm: () => <div data-testid="add-user-form">AddUserForm</div>,
  UserList: () => <div data-testid="user-list">UserList</div>,
}));

describe("Homepage", () => {
  it("renders the AddUserForm and heading", () => {
    renderWithProviders(<Homepage />);

    // Our mocked AddUserForm
    expect(screen.getByTestId("add-user-form")).toBeInTheDocument();
    // The heading text
    expect(screen.getByText(/current users/i)).toBeInTheDocument();
  });

  it("renders the UserList component", () => {
    renderWithProviders(<Homepage />);

    expect(screen.getByTestId("user-list")).toBeInTheDocument();
  });
});

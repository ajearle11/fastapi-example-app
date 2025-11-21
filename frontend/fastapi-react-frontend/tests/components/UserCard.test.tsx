import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserCard } from "../../src/components";
import type { TUser } from "../../src/types";

const mockGetRandomAvatar = vi
  .fn()
  .mockReturnValue("https://example.com/avatar.png");
const mockFormatDate = vi.fn().mockReturnValue("20 Nov 2025");

vi.mock("../../../src/utils/helpers", () => ({
  getRandomAvatar: mockGetRandomAvatar,
  formatDate: mockFormatDate,
}));

vi.mock("../../src/components/Modal", () => ({
  __esModule: true,
  default: ({ user }: { user: TUser }) => (
    <div data-testid="modal">Modal for {user.firstName}</div>
  ),
}));

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

const user: TUser = {
  id: 1,
  firstName: "Alice",
  lastName: "Smith",
  dateOfBirth: "1995-01-02",
  age: 30,
};

describe("UserCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows deleting overlay when isPending is true", () => {
    const mutate = vi.fn();

    renderWithRouter(<UserCard user={user} mutate={mutate} isPending={true} />);

    expect(screen.getByText(/deleting user/i)).toBeInTheDocument();
  });

  it("shows the modal when delete button is clicked", () => {
    const mutate = vi.fn();

    renderWithRouter(
      <UserCard user={user} mutate={mutate} isPending={false} />
    );

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();

    const deleteButton = screen.getByRole("button", { name: "🗑️" });
    fireEvent.click(deleteButton);

    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText(/Modal for Alice/)).toBeInTheDocument();
  });
});

// tests/components/UserList.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserList } from "../../src/components";
import type { TUser } from "../../src/types";

// --- Mocks ---
const { mockApiFetch } = vi.hoisted(() => {
  return { mockApiFetch: vi.fn() };
});

vi.mock("../../src/utils/api/apiClient", () => ({
  __esModule: true,
  default: mockApiFetch,   // <-- use the same mock instance
}));

// Stub UserCard so we don’t depend on its implementation
vi.mock("../../src/components/UserCard", () => ({
  __esModule: true,
  default: ({
    user,
    mutate,
  }: {
    user: TUser;
    mutate: (id?: number) => void;
  }) => (
    <div data-testid={`user-card-${user.id}`}>
      <span>{user.firstName}</span>
      <button onClick={() => mutate(user.id)}>Delete {user.id}</button>
    </div>
  ),
}));

function renderWithClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <UserList />
    </QueryClientProvider>
  );
}

const users: TUser[] = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Smith",
    dateOfBirth: "1995-01-02",
    age: 30,
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Jones",
    dateOfBirth: "1990-05-10",
    age: 35,
  },
];

beforeEach(() => {
  vi.clearAllMocks();
});

describe("UserList", () => {
  it("renders users returned from the API", async () => {
    mockApiFetch.mockResolvedValueOnce(users);

    renderWithClient();

    expect(await screen.findByTestId("user-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("user-card-2")).toBeInTheDocument();

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("shows error message when loading users fails", async () => {
    mockApiFetch.mockRejectedValueOnce(new Error("Boom"));

    renderWithClient();

    expect(await screen.findByText(/error loading users/i)).toBeInTheDocument();
  });

  it("shows success alert after successful delete", async () => {
    mockApiFetch
      .mockResolvedValueOnce(users)        // initial GET /users
      .mockResolvedValueOnce(null)         // DELETE /users/1
      .mockResolvedValueOnce(users.slice(1)); // refetch after delete

    renderWithClient();

    const deleteButton = await screen.findByRole("button", { name: /delete 1/i });
    fireEvent.click(deleteButton);

    expect(
      await screen.findByText(/successfully deleted user/i)
    ).toBeInTheDocument();
  });

  it("shows error alert after failed delete", async () => {
    mockApiFetch
      .mockResolvedValueOnce(users) // initial GET /users
      .mockRejectedValueOnce(new Error("Delete failed")); // DELETE /users/1 fails

    renderWithClient();

    const deleteButton = await screen.findByRole("button", { name: /delete 1/i });
    fireEvent.click(deleteButton);

    expect(
      await screen.findByText(/failed to deleted user/i)
    ).toBeInTheDocument();
  });
});

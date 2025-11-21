import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {AddUserForm} from "../../src/components/";

const mockWorkOutAge = vi.fn().mockReturnValue(0);
vi.mock("../../../src/utils/helpers", () => ({
  workOutAge: mockWorkOutAge,
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
      <AddUserForm />
    </QueryClientProvider>
  );
}

let fetchSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  vi.clearAllMocks();
  fetchSpy = vi
    .spyOn(globalThis, "fetch")
    .mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue({
        id: 1,
        firstName: "Alice",
        lastName: "Smith",
        dateOfBirth: "1995-01-02",
        age: 30,
      }),
    } as any);
});

afterEach(() => {
  fetchSpy.mockRestore();
});

describe("AddUserForm", () => {
  it("renders heading, inputs and submit button", () => {
    renderWithClient();

    expect(screen.getByTestId("add-user-form")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/age/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("shows validation error when fields are missing or invalid", () => {
    renderWithClient();

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    expect(
      screen.getByText(
        /all fields must have a value and names can be no longer than 30 characters/i
      )
    ).toBeInTheDocument();
  });

  it("submits valid data and shows success message", async () => {
    mockWorkOutAge.mockReturnValue(30); // age we expect after date change

    renderWithClient();

    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    const dateInput = screen.getByTestId("date-input") as HTMLInputElement;

    fireEvent.change(firstNameInput, { target: { value: "Alice" } });
    fireEvent.change(lastNameInput, { target: { value: "Smith" } });
    fireEvent.change(dateInput, { target: { value: "1995-01-02" } });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    expect(fetchSpy).toHaveBeenCalledWith(
      "http://localhost:8000/users",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
    
    expect(await screen.findByText(/user created!/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/error creating user: try again!/i)
    ).not.toBeInTheDocument();
  });
});

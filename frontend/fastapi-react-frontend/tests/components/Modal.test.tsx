import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../../src/components";
import type { TUser } from "../../src/types";

describe("Modal", () => {
  const user: TUser = {
    id: 1,
    firstName: "Alice",
    lastName: "Smith",
    dateOfBirth: "1995-01-02",
    age: 30,
  };

  it("renders modal content with user name", () => {
    const mutate = vi.fn();
    const setShowModal = vi.fn();

    render(<Modal mutate={mutate} setShowModal={setShowModal} user={user} />);

    expect(screen.getByText(/delete user\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(/are you sure that you want to delete alice smith\?/i)
    ).toBeInTheDocument();
  });

  it("closes modal when X button is clicked", () => {
    const mutate = vi.fn();
    const setShowModal = vi.fn();

    render(<Modal mutate={mutate} setShowModal={setShowModal} user={user} />);

    const closeIconButton = screen.getByRole("button", { name: "❌" });
    fireEvent.click(closeIconButton);

    expect(setShowModal).toHaveBeenCalledWith(false);
  });

  it("closes modal when Close button is clicked", () => {
    const mutate = vi.fn();
    const setShowModal = vi.fn();

    render(<Modal mutate={mutate} setShowModal={setShowModal} user={user} />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(setShowModal).toHaveBeenCalledWith(false);
  });

  it("calls mutate with user id and closes modal on Confirm", () => {
    const mutate = vi.fn();
    const setShowModal = vi.fn();

    render(<Modal mutate={mutate} setShowModal={setShowModal} user={user} />);

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmButton);

    expect(mutate).toHaveBeenCalledWith(user.id);
    expect(setShowModal).toHaveBeenCalledWith(false);
  });
});

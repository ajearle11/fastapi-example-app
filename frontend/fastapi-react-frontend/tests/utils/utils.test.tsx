import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getRandomAvatar,
  workOutAge,
  formatDate,
} from "../../src/utils/helpers";
import apiFetch from "../../src/utils/api/apiClient";

describe("getRandomAvatar", () => {
  it("returns default avatar when id is undefined", () => {
    const url = getRandomAvatar();
    expect(url).toBe(
      "https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp"
    );
  });

  it("returns correct avatar based on last digit of id", () => {
    expect(getRandomAvatar(10)).toBe(
      "https://img.daisyui.com/images/profile/demo/batperson@192.webp"
    );
    expect(getRandomAvatar(1)).toBe(
      "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
    );
    expect(getRandomAvatar(4)).toBe(
      "https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp"
    );
    expect(getRandomAvatar(9)).toBe(
      "https://img.daisyui.com/images/profile/demo/distracted1@192.webp"
    );
  });
});

describe("workOutAge", () => {
  const fixedNow = new Date("2025-11-21T00:00:00Z"); // freeze time for deterministic tests

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(fixedNow);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calculates age when birthday already happened this year", () => {
    const age = workOutAge("2000-01-01");
    expect(age).toBe(25);
  });

  it("calculates age when birthday has not yet happened this year", () => {
    const age = workOutAge("2000-12-31");
    expect(age).toBe(24);
  });

  it("calculates age correctly on birthday", () => {
    const age = workOutAge("2000-11-21");
    expect(age).toBe(25);
  });
});

describe("formatDate", () => {
  it("formats ISO date string as DD Mon YYYY in en-GB", () => {
    const formatted = formatDate("2025-11-20");
    expect(formatted).toBe("20 Nov 2025");
  });

  it("handles another date correctly", () => {
    const formatted = formatDate("1990-01-02");
    expect(formatted).toBe("02 Jan 1990");
  });
});

describe("apiFetch", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls fetch with correct URL and options and returns JSON data", async () => {
    const mockResponseData = { message: "ok" };

    const mockFetch = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(mockResponseData),
      } as any);

    const result = await apiFetch<{ message: string }>("/test-endpoint", {
      method: "POST",
      body: JSON.stringify({ foo: "bar" }),
    });

    expect(mockFetch).toHaveBeenCalledWith("http://localhost:8000/test-endpoint", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ foo: "bar" }),
    });

    expect(result).toEqual(mockResponseData);
  });

  it("returns null for 204 No Content", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 204,
      json: vi.fn(), 
    } as any);

    const result = await apiFetch<null>("/no-content");

    expect(result).toBeNull();
  });

  it("throws an error when response is not ok", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn(),
    } as any);

    await expect(apiFetch("/error-endpoint")).rejects.toThrow("Error: 500");
  });
});
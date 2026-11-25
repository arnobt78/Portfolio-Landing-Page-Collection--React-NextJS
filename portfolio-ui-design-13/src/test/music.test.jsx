// @vitest-environment jsdom
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import MusicPlayer from "../components/MusicPlayer";

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); });

describe("music player", () => {
  it("does not intercept arrow keys outside its control", () => {
    render(<><input aria-label="Form input" /><MusicPlayer /></>);
    const event = new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true, cancelable: true });
    screen.getByLabelText("Form input").dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
    const playerEvent = new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true, cancelable: true });
    screen.getByRole("button", { name: "Play music" }).dispatchEvent(playerEvent);
    expect(playerEvent.defaultPrevented).toBe(true);
  });
  it("reports blocked playback and remains paused", async () => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockRejectedValue(new Error("blocked"));
    render(<MusicPlayer />);
    fireEvent.click(screen.getByRole("button", { name: "Play music" }));
    await act(async () => { await vi.advanceTimersByTimeAsync(250); });
    expect(screen.getByRole("status").textContent).toContain("could not be played");
    expect(screen.getByRole("button", { name: "Play music" })).toBeTruthy();
  });
  it("reflects an external pause so the next click resumes", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    const { container } = render(<MusicPlayer />);
    fireEvent.click(screen.getByRole("button", { name: "Play music" }));
    await act(async () => { await vi.advanceTimersByTimeAsync(250); });
    const audio = container.querySelector("audio");
    fireEvent.play(audio);
    expect(screen.getByRole("button", { name: "Pause music" })).toBeTruthy();
    fireEvent.pause(audio);
    expect(screen.getByRole("button", { name: "Play music" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Play music" }));
    await act(async () => { await vi.advanceTimersByTimeAsync(250); });
    expect(play).toHaveBeenCalledTimes(2);
  });
  it("stops failed media, preserves the error, and reloads on retry", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    const load = vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => {});
    const { container } = render(<MusicPlayer />);
    const audio = container.querySelector("audio");
    Object.defineProperty(audio, "error", { value: { code: 4 }, configurable: true });
    fireEvent.error(audio);
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    fireEvent.pause(audio);
    expect(screen.getByRole("status").textContent).toContain("could not be played");
    fireEvent.click(screen.getByRole("button", { name: "Play music" }));
    await act(async () => { await vi.advanceTimersByTimeAsync(250); });
    expect(load).toHaveBeenCalledTimes(1);
    expect(play).toHaveBeenCalledTimes(1);
  });
  it("shuffles once on a double click without starting paused audio", () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    vi.spyOn(Math, "random").mockReturnValue(0.4);
    const { container } = render(<MusicPlayer />);
    const button = screen.getByRole("button", { name: "Play music" });
    fireEvent.click(button); fireEvent.click(button);
    expect(container.querySelector("audio").getAttribute("src")).toContain("blue.mp3");
    expect(play).not.toHaveBeenCalled();
  });
});

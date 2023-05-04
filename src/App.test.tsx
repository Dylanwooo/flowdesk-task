import React from "react";
import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import { useDataSource } from "./hooks";
import App from "./App";
import { act } from "react-dom/test-utils";

describe("Market data", () => {
  it("renders the title correctly", () => {
    render(<App />);
    expect(screen.getByText("Public market data")).toBeInTheDocument();
  });

  it("should use the hooks correctly", () => {
    render(<App />);
    const { result } = renderHook(() => useDataSource());

    expect(result.current.loading).toBeFalsy();

    act(() => result.current.fetchDataSource("BTCUSDT"));

    // expect the data list should be rendered
    expect(
      document.getElementsByClassName("ant-table-tbody")[0].childElementCount
    ).toBeGreaterThan(0);

    expect(screen.getByText(/Price/i)).toBeInTheDocument();
  });
});

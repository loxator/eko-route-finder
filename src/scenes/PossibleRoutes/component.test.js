import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PossibleRoutes from "./component";

describe("PossibleRoutes", () => {
  test("renders PossibleRoutes component correctly", () => {
    const { getByTestId } = render(<PossibleRoutes />);
    expect(getByTestId("routes__label__paths")).toBeDefined();
    expect(getByTestId("routes__label__source")).toBeDefined();
    expect(getByTestId("routes__label__target")).toBeDefined();
    expect(getByTestId("routes__input__paths")).toBeDefined();
    expect(getByTestId("routes__input__source")).toBeDefined();
    expect(getByTestId("routes__input__target")).toBeDefined();
    expect(getByTestId("routes__button__calculate")).toBeDefined();
    //expect(getByTestId("routes__text__result").textContent).toBe("");
  });

  describe("Correct test result", () => {
    test("shows the result correctly for paths from A to E", async () => {
      const { getByTestId, container } = render(<PossibleRoutes />);
      await fireEvent.change(
        container.querySelector('[data-testid="routes__input__paths"]'),
        { target: { value: "AB1,AC4,AD10,CD4,CF2,DE1,EB3,EA2,FD1" } }
      );
      await fireEvent.change(
        container.querySelector('[data-testid="routes__input__source"]'),
        { target: { value: "A" } }
      );
      await fireEvent.change(
        container.querySelector('[data-testid="routes__input__target"]'),
        { target: { value: "E" } }
      );
      await fireEvent.click(
        container.querySelector('[data-testid="routes__button__calculate"]'),
        { stopPropagation: () => null, preventDefault: () => null }
      );
      expect(getByTestId("routes__text__result").textContent).toBe(
        "Routes found: 3ADEACDEACFDE"
      );
    });
    test("shows the result correctly for path from E to D", async () => {
      const { getByTestId, container } = render(<PossibleRoutes />);
      await fireEvent.change(
        container.querySelector('[data-testid="routes__input__paths"]'),
        { target: { value: "AB1,AC4,AD10,CD4,CF2,DE1,EB3,EA2,FD1" } }
      );
      await fireEvent.change(
        container.querySelector('[data-testid="routes__input__source"]'),
        { target: { value: "E" } }
      );
      await fireEvent.change(
        container.querySelector('[data-testid="routes__input__target"]'),
        { target: { value: "D" } }
      );
      await fireEvent.click(
        container.querySelector('[data-testid="routes__button__calculate"]'),
        { stopPropagation: () => null, preventDefault: () => null }
      );
      expect(getByTestId("routes__text__result").textContent).toBe(
        "Routes found: 3EADEACDEACFD"
      );
    });
    test("should display error if source path does not exist", async () => {
      const { getByTestId, container } = render(<PossibleRoutes />);
      await fireEvent.change(
        container.querySelector('[data-testid="routes__input__paths"]'),
        { target: { value: "AB1,AC4,AD10,CD4,CF2,DE1,EB3,EA2,FD1" } }
      );
      await fireEvent.change(
        container.querySelector('[data-testid="routes__input__source"]'),
        { target: { value: "Z" } }
      );
      await fireEvent.change(
        container.querySelector('[data-testid="routes__input__target"]'),
        { target: { value: "D" } }
      );
      await fireEvent.click(
        container.querySelector('[data-testid="routes__button__calculate"]'),
        { stopPropagation: () => null, preventDefault: () => null }
      );
      expect(getByTestId("routes__text__error").textContent).toBe(
        "The start route does not exist"
      );
    });
    test("should display error if end path does not exist", async () => {
      const { getByTestId, container } = render(<PossibleRoutes />);
      await fireEvent.change(
        container.querySelector('[data-testid="routes__input__paths"]'),
        { target: { value: "AB1,AC4,AD10,CD4,CF2,DE1,EB3,EA2,FD1" } }
      );
      await fireEvent.change(
        container.querySelector('[data-testid="routes__input__source"]'),
        { target: { value: "A" } }
      );
      await fireEvent.change(
        container.querySelector('[data-testid="routes__input__target"]'),
        { target: { value: "Z" } }
      );
      await fireEvent.click(
        container.querySelector('[data-testid="routes__button__calculate"]'),
        { stopPropagation: () => null, preventDefault: () => null }
      );
      expect(getByTestId("routes__text__error").textContent).toBe(
        "The end route does not exist"
      );
    });
  });
});

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PossibleRoutes from "./component";

const componentToBeRendered = (
  <Router>
    <PossibleRoutes />
  </Router>
);
describe("PossibleRoutes", () => {
  test("renders PossibleRoutes component correctly", () => {
    const { getByTestId } = render(componentToBeRendered);
    expect(getByTestId("routes__label__paths")).toBeDefined();
    expect(getByTestId("routes__label__source")).toBeDefined();
    expect(getByTestId("routes__label__target")).toBeDefined();
    expect(getByTestId("routes__input__paths")).toBeDefined();
    expect(getByTestId("routes__input__source")).toBeDefined();
    expect(getByTestId("routes__input__target")).toBeDefined();
    expect(getByTestId("routes__input__stops")).toBeDefined();
    expect(getByTestId("routes__input__cost")).toBeDefined();
    expect(getByTestId("routes__button__calculate")).toBeDefined();
  });

  describe("Correct test result", () => {
    test("shows the result correctly for paths from A to E", async () => {
      const { getByTestId, container } = render(componentToBeRendered);
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
        "Routes found: 3ADE - 11ACDE - 9ACFDE - 8"
      );
    });
    test("shows the result correctly for path from E to D", async () => {
      const { getByTestId, container } = render(componentToBeRendered);
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
        "Routes found: 3EAD - 12EACD - 10EACFD - 9"
      );
    });
    test("shows the result correctly for path from E to D with maximum 1 stop", async () => {
      const { getByTestId, container } = render(componentToBeRendered);
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
      await fireEvent.change(
        container.querySelector('[data-testid="routes__input__stops"]'),
        { target: { value: "1" } }
      );
      await fireEvent.click(
        container.querySelector('[data-testid="routes__button__calculate"]'),
        { stopPropagation: () => null, preventDefault: () => null }
      );
      expect(getByTestId("routes__text__result").textContent).toBe(
        "Routes found: 1EAD - 12"
      );
    });
    test("shows the result correctly for path from E to D with maximum 9 delivery cost", async () => {
      const { getByTestId, container } = render(componentToBeRendered);
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
      await fireEvent.change(
        container.querySelector('[data-testid="routes__input__stops"]'),
        { target: { value: "0" } }
      );
      await fireEvent.change(
        container.querySelector('[data-testid="routes__input__cost"]'),
        { target: { value: "9" } }
      );
      await fireEvent.click(
        container.querySelector('[data-testid="routes__button__calculate"]'),
        { stopPropagation: () => null, preventDefault: () => null }
      );
      expect(getByTestId("routes__text__result").textContent).toBe(
        "Routes found: 1EACFD - 9"
      );
    });
    test("should display error if source path does not exist", async () => {
      const { getByTestId, container } = render(componentToBeRendered);
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
      const { getByTestId, container } = render(componentToBeRendered);
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

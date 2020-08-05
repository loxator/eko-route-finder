import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TotalDeliveryCost from "./component";

describe("TotalDeliveryCost", () => {
  test("renders TotalDeliveryCost component correctly", () => {
    const { getByTestId } = render(<TotalDeliveryCost />);
    expect(getByTestId("app__label__paths")).toBeDefined();
    expect(getByTestId("app__label__routes")).toBeDefined();
    expect(getByTestId("app__button__calculate")).toBeDefined();
    expect(getByTestId("app__text__result").textContent).toBe("");
  });

  describe("Correct test result", () => {
    test("shows the result correctly for A-B-E", async () => {
      const { getByTestId, container } = render(<TotalDeliveryCost />);
      await fireEvent.change(
        container.querySelector('[data-testid="app__input__paths"]'),
        { target: { value: "AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1" } }
      );
      await fireEvent.change(
        container.querySelector('[data-testid="app__input__routes"]'),
        { target: { value: "A-B-E" } }
      );
      await fireEvent.click(
        container.querySelector('[data-testid="app__button__calculate"]'),
        { stopPropagation: () => null, preventDefault: () => null }
      );
      expect(getByTestId("app__text__result").textContent).toBe("4");
    });
    test("shows the result correctly for A-D", async () => {
      const { getByTestId, container } = render(<TotalDeliveryCost />);
      await fireEvent.change(
        container.querySelector('[data-testid="app__input__paths"]'),
        { target: { value: "AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1" } }
      );
      await fireEvent.change(
        container.querySelector('[data-testid="app__input__routes"]'),
        { target: { value: "A-D" } }
      );
      await fireEvent.click(
        container.querySelector('[data-testid="app__button__calculate"]'),
        { stopPropagation: () => null, preventDefault: () => null }
      );
      expect(getByTestId("app__text__result").textContent).toBe("10");
    });
    test("shows the result correctly for E-A-C-F", async () => {
      const { getByTestId, container } = render(<TotalDeliveryCost />);
      await fireEvent.change(
        container.querySelector('[data-testid="app__input__paths"]'),
        { target: { value: "AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1" } }
      );
      await fireEvent.change(
        container.querySelector('[data-testid="app__input__routes"]'),
        { target: { value: "E-A-C-F" } }
      );
      await fireEvent.click(
        container.querySelector('[data-testid="app__button__calculate"]'),
        { stopPropagation: () => null, preventDefault: () => null }
      );
      expect(getByTestId("app__text__result").textContent).toBe("8");
    });
    test("shows the result correctly for A-D-F", async () => {
      const { getByTestId, container } = render(<TotalDeliveryCost />);
      await fireEvent.change(
        container.querySelector('[data-testid="app__input__paths"]'),
        { target: { value: "AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1" } }
      );
      await fireEvent.change(
        container.querySelector('[data-testid="app__input__routes"]'),
        { target: { value: "A-D-F" } }
      );
      await fireEvent.click(
        container.querySelector('[data-testid="app__button__calculate"]'),
        { stopPropagation: () => null, preventDefault: () => null }
      );
      expect(getByTestId("app__text__result").textContent).toBe(
        "No Such Route"
      );
    });
  });
});

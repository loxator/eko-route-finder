import { convertStringToPathObject, computeTotalDeliveryCost } from "./helpers";

describe("Testing convertStringToPathObject", () => {
  const pathArray = [
    "AB1",
    "AC4",
    "AD10",
    "BE3",
    "CD4",
    "CF2",
    "DE1",
    "EB3",
    "EA2",
    "FD1",
  ];

  const pathObject = {
    AB: 1,
    AC: 4,
    AD: 10,
    BE: 3,
    CD: 4,
    CF: 2,
    DE: 1,
    EB: 3,
    EA: 2,
    FD: 1,
  };
  test("should return object in correct form", () => {
    const mockconvertStringToPathObject = jest
      .fn()
      .mockImplementation(convertStringToPathObject);
    mockconvertStringToPathObject(pathArray);
    expect(mockconvertStringToPathObject).toHaveBeenCalled();

    const result = mockconvertStringToPathObject.mock.results[0].value;
    expect(JSON.stringify(result)).toBe(JSON.stringify(pathObject));
  });
});

describe("Testing computeTotalDeliveryCost", () => {
  const pathArray = [
    "AB1",
    "AC4",
    "AD10",
    "BE3",
    "CD4",
    "CF2",
    "DE1",
    "EB3",
    "EA2",
    "FD1",
  ];

  const routeArray = ["A", "B", "E"];
  test("should return the correct delivery cost for a given route", () => {
    const mockcomputeTotalDeliveryCost = jest
      .fn()
      .mockImplementation(computeTotalDeliveryCost);
    mockcomputeTotalDeliveryCost(routeArray, pathArray);
    expect(mockcomputeTotalDeliveryCost).toHaveBeenCalled();

    const result = mockcomputeTotalDeliveryCost.mock.results[0].value;
    expect(result).toBe(4);
  });
});

export const convertStringToPathObject = (pathArray) => {
  const pathObject = {};
  for (let value of pathArray) {
    pathObject[value.charAt(0) + value.charAt(1)] = parseInt(
      value.slice(2),
      10
    );
  }

  return pathObject;
};

export const computeTotalDeliveryCost = (routeArray, pathArray) => {
  const pathObject = convertStringToPathObject(pathArray);

  let totalDeliveryCost = 0;
  try {
    for (let i = 0; i < routeArray.length - 1; i++) {
      let key = routeArray[i] + routeArray[i + 1];
      if (key in pathObject) {
        totalDeliveryCost += pathObject[key];
      } else return "No Such Route";
    }
  } catch (error) {
    console.log("ERROR ---- " + error);
  }

  return totalDeliveryCost;
};

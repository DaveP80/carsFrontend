import { classic1, classic2, classic3, classic4 } from "../assets";

export function carImage() {
  function getRandomElementFromArray(array) {
    if (array.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
  return getRandomElementFromArray([classic1, classic2, classic3, classic4]);
}

export function compareObjects(obj1, obj2) {
  let a = JSON.stringify(obj1);
  let b = JSON.stringify(obj2);
  return a === b;
}

export const carmakers = [
  "audi",
  "amc",
  "acura",
  "bmw",
  "buick",
  "cadillac",
  "capri",
  "chevrolet",
  "chevy",
  "chrysler",
  "datsun",
  "dodge",
  "fiat",
  "ford",
  "honda",
  "international",
  "jeep",
  "mazda",
  "mercedes",
  "mercedes-benz",
  "mercury",
  "nissan",
  "oldsmobile",
  "opel",
  "peugeot",
  "plymouth",
  "pontiac",
  "renault",
  "saab",
  "subaru",
  "toyota",
  "toyouta",
  "triumph",
  "volkswagen",
  "volvo",
  "vw",
];

export const selectColor = [
  "Aqua",
  "Blue",
  "Bronze",
  "Brown",
  "Silver",
  "Burgundy",
  "Champagne",
  "Red",
  "Gray",
  "Green",
  "Charcoal",
  "Beige",
  "White",
  "Copper",
  "Black",
  "Crimson",
  "Gold",
  "Indigo",
  "Lime",
  "Magenta",
  "Maroon",
  "Navy",
  "Pink",
  "Olive",
  "Orange",
  "Purple",
  "Teal",
  "Turquoise",
  "Violet",
  "Yellow",
];

export const origin = ["usa", "europe", "japan"];

export function validateForm(obj) {
  return ["make", "model", "mpg", "horsepower", "model_year", "origin"].every(
    (item) =>
      obj[item] !== "" ||
      obj[item] !== null ||
      obj[item] !== "undefined" ||
      obj[item] !== 0
  );
}

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

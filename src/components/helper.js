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
    return a === b
}
//return engagement count if count greater than 1
export function isPopular(id, data) {
    try {
        let result = data.find(item => item.id == id);
        if (+result.count> 1) return +result.count;
    } catch (e) {
        return null
    }
}

export const carmakers = [
    "volkswagen",
    "international",
    "chevrolet",
    "audi",
    "nissan",
    "chevy",
    "fiat",
    "toyota",
    "datsun",
    "peugeot",
    "saab",
    "capri",
    "jeep",
    "renault",
    "chrysler",
    "ford",
    "vw",
    "toyouta",
    "cadillac",
    "mazda",
    "buick",
    "mercedes",
    "opel",
    "amc",
    "oldsmobile",
    "mercedes-benz",
    "bmw",
    "volvo",
    "pontiac",
    "honda",
    "mercury",
    "plymouth",
    "subaru",
    "triumph",
    "dodge"
];

export const selectColor = [
    "Black", "White", "Silver", "Gray", "Red", "Blue", "Brown", "Beige", "Green", "Gold", "Yellow", "Orange", "Purple", "Pink", "Bronze", "Copper", "Champagne", "Magenta", "Indigo", "Teal", "Turquoise", "Lime", "Olive", "Aqua", "Maroon", "Navy", "Charcoal", "Burgundy", "Violet", "Crimson"
];


export const origin = ["usa", "europe", "japan"];

export function validateForm(obj) {
   return [
        "make",
        "model",
        "mpg",
        "horsepower",
        "model_year",
        "origin"
    ].every(
        (item) => obj[item] !== "" || obj[item] !== null || obj[item] !== 'undefined' || obj[item] !== 0
    )
} 

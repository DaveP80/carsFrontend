export function formatDate(args) {
    const date = new Date(args);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
}

export function generateDates() {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 90; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const formattedDate = date.toISOString().slice(0, 10);
        dates.push(formattedDate);
    }
    return dates;
}

export function compareObjects(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
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

export const validateForm = [
    "make",
    "model",
    "horsepower",
    "model_year",
    "origin"
];

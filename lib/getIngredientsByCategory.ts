export default function getIngredientsByCategory(category: string) {
  switch (category) {
    case "Meat":
      return [
        "Beef",
        "Pork",
        "Chicken",
        "Lamb",
        "Turkey",
        "Bacon",
        "Sausage",
        "Ham",
        "Venison",
        "Duck",
      ];
    case "Poultry":
      return [
        "Chicken",
        "Turkey",
        "Duck",
        "Goose",
        "Quail",
        "Cornish Hen",
        "Pheasant",
        "Guinea Fowl",
        "Emu",
        "Ostrich",
      ];
    case "Seafood":
      return [
        "Salmon",
        "Shrimp",
        "Tuna",
        "Cod",
        "Crab",
        "Lobster",
        "Scallops",
        "Mussels",
        "Clams",
        "Sardines",
      ];
    case "Dairy":
      return [
        "Milk",
        "Cheese",
        "Butter",
        "Yogurt",
        "Eggs",
        "Cream",
        "Sour Cream",
        "Cottage Cheese",
        "Whipped Cream",
        "Cream Cheese",
      ];
    case "Fruits":
      return [
        "Apples",
        "Bananas",
        "Oranges",
        "Grapes",
        "Strawberries",
        "Blueberries",
        "Pineapple",
        "Watermelon",
        "Mango",
        "Kiwi",
      ];
    case "Vegetables":
      return [
        "Carrots",
        "Broccoli",
        "Tomatoes",
        "Spinach",
        "Potatoes",
        "Cabbage",
        "Bell Peppers",
        "Cucumbers",
        "Onions",
        "Zucchini",
      ];
    case "Grains":
      return [
        "Rice",
        "Wheat",
        "Oats",
        "Quinoa",
        "Barley",
        "Corn",
        "Buckwheat",
        "Millet",
        "Rye",
        "Farro",
      ];
    case "Legumes":
      return [
        "Lentils",
        "Chickpeas",
        "Black Beans",
        "Kidney Beans",
        "Soybeans",
        "Pinto Beans",
        "Green Peas",
        "Lima Beans",
        "Navy Beans",
        "Mung Beans",
      ];
    case "Nuts and Seeds":
      return [
        "Almonds",
        "Walnuts",
        "Peanuts",
        "Cashews",
        "Pistachios",
        "Flaxseeds",
        "Chia Seeds",
        "Sunflower Seeds",
        "Pumpkin Seeds",
        "Sesame Seeds",
      ];
    case "Herbs & Spices":
      return [
        "Basil",
        "Cinnamon",
        "Garlic",
        "Rosemary",
        "Thyme",
        "Oregano",
        "Cumin",
        "Paprika",
        "Ginger",
        "Coriander",
      ];
    default:
      return [];
  }
}

export const categories = [
  "Meat",
  "Poultry",
  "Seafood",
  "Dairy",
  "Fruits",
  "Vegetables",
  "Grains",
  "Legumes",
  "Nuts and Seeds",
  "Herbs & Spices",
];

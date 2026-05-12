export type FoodCategory = "protein" | "carb" | "fat" | "veg" | "dairy" | "fruit";

export type FridgeItem = {
  id: number;
  name: string;
  category: FoodCategory;
  protein: number;
  calories: number;
  servings: number;
  expiresInDays: number;
  storageTip: string;
};

export type Meal = {
  day: string;
  title: string;
  ingredients: string[];
  protein: number;
  calories: number;
  priority: "Ät först" | "Preppa" | "Frys in";
};

export const starterInventory: FridgeItem[] = [
  {
    id: 1,
    name: "Kycklingfilé",
    category: "protein",
    protein: 32,
    calories: 180,
    servings: 4,
    expiresInDays: 2,
    storageTip: "Tillaga eller frys in inom 48 timmar.",
  },
  {
    id: 2,
    name: "Grekisk yoghurt",
    category: "dairy",
    protein: 18,
    calories: 140,
    servings: 5,
    expiresInDays: 5,
    storageTip: "Perfekt som proteinbas till frukost och såser.",
  },
  {
    id: 3,
    name: "Ägg",
    category: "protein",
    protein: 13,
    calories: 155,
    servings: 6,
    expiresInDays: 9,
    storageTip: "Förvara i kartongen för jämn temperatur.",
  },
  {
    id: 4,
    name: "Kokt ris",
    category: "carb",
    protein: 4,
    calories: 210,
    servings: 3,
    expiresInDays: 1,
    storageTip: "Ät idag eller gör matlådor direkt.",
  },
  {
    id: 5,
    name: "Broccoli",
    category: "veg",
    protein: 3,
    calories: 55,
    servings: 4,
    expiresInDays: 4,
    storageTip: "Ånga lätt och kyl ner för längre hållbarhet.",
  },
  {
    id: 6,
    name: "Avokado",
    category: "fat",
    protein: 3,
    calories: 240,
    servings: 2,
    expiresInDays: 3,
    storageTip: "Lägg mogen avokado i kylen för att bromsa mognaden.",
  },
  {
    id: 7,
    name: "Blåbär",
    category: "fruit",
    protein: 1,
    calories: 85,
    servings: 3,
    expiresInDays: 6,
    storageTip: "Skölj först när de ska ätas.",
  },
];

const dayNames = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];
const mealTitles = [
  "Protein bowl med krispiga grönsaker",
  "Snabb omelett med krämig topping",
  "Meal-prep låda med hög proteinandel",
  "Yoghurt-skål med frukt och extra crunch",
  "Varm sallad med smarta rester",
  "Kycklingwrap med avokadokräm",
  "Restfest med frys-rekommendation",
];

export const getExpiryStatus = (days: number) => {
  if (days <= 1) return "Akut";
  if (days <= 3) return "Snart";
  return "Stabil";
};

export const getTotals = (items: FridgeItem[]) =>
  items.reduce(
    (total, item) => ({
      protein: total.protein + item.protein * item.servings,
      calories: total.calories + item.calories * item.servings,
      servings: total.servings + item.servings,
    }),
    { protein: 0, calories: 0, servings: 0 },
  );

export const buildMealPlan = (items: FridgeItem[]): Meal[] => {
  const sortedItems = [...items].sort((a, b) => a.expiresInDays - b.expiresInDays || b.protein - a.protein);
  const proteinItems = sortedItems.filter((item) => item.category === "protein" || item.category === "dairy");
  const supportItems = sortedItems.filter((item) => item.category !== "protein" && item.category !== "dairy");

  return dayNames.map((day, index) => {
    const main = proteinItems[index % Math.max(proteinItems.length, 1)] ?? sortedItems[index % sortedItems.length];
    const support = supportItems[index % Math.max(supportItems.length, 1)] ?? sortedItems[(index + 1) % sortedItems.length];
    const extra = sortedItems[(index + 2) % sortedItems.length];
    const selected = [main, support, extra].filter(Boolean);
    const protein = selected.reduce((sum, item) => sum + item.protein, 0);
    const calories = selected.reduce((sum, item) => sum + item.calories, 0);

    return {
      day,
      title: mealTitles[index],
      ingredients: selected.map((item) => item.name),
      protein,
      calories,
      priority: main.expiresInDays <= 2 ? "Ät först" : index > 4 ? "Frys in" : "Preppa",
    };
  });
};

export const mockScanResults: FridgeItem[] = [
  {
    id: 101,
    name: "Laxfilé",
    category: "protein",
    protein: 25,
    calories: 210,
    servings: 3,
    expiresInDays: 2,
    storageTip: "Planera middag tidigt i veckan eller frys in portionsvis.",
  },
  {
    id: 102,
    name: "Keso",
    category: "dairy",
    protein: 20,
    calories: 160,
    servings: 4,
    expiresInDays: 6,
    storageTip: "Bra mellanmål med bär eller som topping på bowls.",
  },
  {
    id: 103,
    name: "Spenat",
    category: "veg",
    protein: 2,
    calories: 25,
    servings: 3,
    expiresInDays: 1,
    storageTip: "Använd direkt i omelett eller mixa ner i smoothie.",
  },
];

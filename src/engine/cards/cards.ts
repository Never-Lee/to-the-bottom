import type { CardSchema } from "./CardSchema";

export const cards: Record<string, CardSchema> = {
  passenger: {
    id: "passenger",
    name: "Passenger",
    type: "PASSENGER",
    cost: 1,
    points: 1,
    effects: [],
  },
};
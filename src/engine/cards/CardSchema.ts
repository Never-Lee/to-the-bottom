export type CardId = string;

export type CardType = "PASSENGER" | "ACTION" | "REACTION";

export type CardSchema = {
  id: CardId;
  name: string;
  type: CardType;
  cost: number;
  points: number;
  effects: CardEffect[];
};

export type CardEffect = {
  trigger: string;
  effect: string;
};
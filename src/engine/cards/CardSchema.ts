import type { PlayerId } from "../core/GameState";

export type CardId = string;

export type CardColor = "BLUE" | "RED" | "GREEN" | "YELLOW" | "GRAY";

export type CardType = "PASSENGER" | "ACTION" | "REACTION";

export type EffectActivation = "PASSIVE" | "EXHAUST" | "REACTION" | "AUTOMATIC";

export type EffectTiming =
  | "OWN_TURN_BEFORE_DRAW"
  | "OWN_TURN_ACTION_WINDOW"
  | "OPPONENT_TURN_REACTION_WINDOW"
  | "ALWAYS";

export type CardSchema = {
  id: CardId;
  name: string;
  color: CardColor;
  type: CardType;
  cost: number;
  points: number;
  effects: CardEffect[];
};

export type CardEffect = {
  id: string;
  trigger: string;
  timing: EffectTiming;
  activation: EffectActivation;
  optional: boolean;
  steps: EffectStep[];
};

export type EffectStep = {
  effect: string;
  target?: string;
};

export type EffectContext = {
  ownerId: PlayerId;
  sourceCardId: CardId;
};
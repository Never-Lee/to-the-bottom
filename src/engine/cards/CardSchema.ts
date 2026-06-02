import type { PlayerId } from "../core/GameState";

export type CardId = string;

export type CardColor = "BLUE" | "RED" | "GREEN" | "PURPLE" | "BEIGE";

export type EffectActivation = "PASSIVE" | "EXHAUST" | "REACTION" | "AUTOMATIC";

export type EffectTiming =
| "OWN_TURN_DRAW_PHASE"
  | "OWN_TURN_ACTION_WINDOW"
  | "OPPONENT_TURN_REACTION_WINDOW"
  | "ALWAYS";

export type EffectKeyword =
  | "SKIP_DRAW_PHASE"
  | "JETTISON_SELF"
  | "MODIFY_DRAW_COUNT"
  | "SHUFFLE_SELECTED_HAND_CARDS_INTO_DECK"
  | "DRAW_SAME_AMOUNT"
  | "JETTISON_FROM_OPPONENT_DECK"
  | "JETTISON_SELECTED_HAND_CARDS"

export type CardSchema = {
  id: CardId;
  name: string;
  color: CardColor;
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
  requirements?: ActivationRequirement[];
};

export type EffectStep = {
  effect: EffectKeyword;
  target?: string;
  value?: number;
  inputKey?: string;
};

export type EffectContext = {
  actorId: PlayerId;
  sourceCardId: CardId;
};

export type EffectInput = {
  selectedCardIds?: CardId[];
  targetPlayerId?: PlayerId;

};
export type ActivationRequirement = {
  type: "MIN_HAND_CARDS";
  value: number;
};
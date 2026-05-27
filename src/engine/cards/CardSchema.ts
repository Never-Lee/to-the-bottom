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
  | "MODIFY_DRAW_COUNT";

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
};

export type EffectStep = {
  effect: EffectKeyword;
  target?: string;
  value?: number;
};

export type EffectContext = {
  ownerId: PlayerId;
  sourceCardId: CardId;
};
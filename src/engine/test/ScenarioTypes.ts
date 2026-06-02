import type { GameAction } from "../actions/ActionTypes";
import type { CardId } from "../cards/CardSchema";
import type { GameState, PlayerId } from "../core/GameState";

export type ExpectedPlayerState = {
  hand?: CardId[];
  board?: CardId[];
  water?: CardId[];
  points?: number;
  deck?: CardId[];
};

export type BaseScenario = {
  name: string;
  state: GameState;
  expectedEvents: string[];
  expectedState: {
    P1?: ExpectedPlayerState;
    P2?: ExpectedPlayerState;
  };
};

export type EffectScenario = BaseScenario & {
  kind: "effect";
  effect: {
    cardId: CardId;
    effectIndex: number;
    actorId: PlayerId;
  };
};

export type ActionScenario = BaseScenario & {
  kind: "action";
  action: GameAction;
};

export type Scenario = EffectScenario | ActionScenario;
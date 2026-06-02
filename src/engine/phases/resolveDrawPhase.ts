import type { GameState } from "../core/GameState";
import type { GameEvent } from "../events/EventTypes";
import { getBaseDrawCount } from "./getBaseDrawCount";
import { getPassiveEffectsForTrigger } from "../effects/getPassiveEffectsForTrigger";

export function resolveDrawPhase(state: GameState): {
  state: GameState;
  events: GameEvent[];
} {
  const player = state.players[state.activePlayerId];

let drawCount = getBaseDrawCount(
  state.chapter,
  state.drawTurnIndex
  
);

let skipDrawPhase = false;



const passiveEffects = getPassiveEffectsForTrigger(
  state,
  state.activePlayerId,
  "DRAW_PHASE"
);

for (const effect of passiveEffects) {
  for (const step of effect.steps) {
    if (step.effect === "MODIFY_DRAW_COUNT") {
      drawCount += step.value ?? 0;
    }

    if (step.effect === "SKIP_DRAW_PHASE") {
      skipDrawPhase = true;
    }
  }
}
if (skipDrawPhase) {
  drawCount = 0;
}

drawCount = Math.max(0, drawCount);

  const drawnCards = player.deck.slice(0, drawCount);
  const remainingDeck = player.deck.slice(drawCount);

  const updatedPlayer = {
    ...player,
    deck: remainingDeck,
    hand: [...player.hand, ...drawnCards],
  };

  const updatedState: GameState = {
    ...state,
    drawTurnIndex: state.drawTurnIndex + 1,
    players: {
      ...state.players,
      [state.activePlayerId]: updatedPlayer,
    },
  };

  const events: GameEvent[] = drawnCards.map((cardId) => ({
    type: "CARD_DRAWN",
    playerId: state.activePlayerId,
    cardId,
    from: "DECK",
    to: "HAND",
  }));

  return {
    state: updatedState,
    events,
  };
}
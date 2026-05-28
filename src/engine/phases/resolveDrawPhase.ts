import type { GameState } from "../core/GameState";
import type { GameEvent } from "../events/EventTypes";
import { getBaseDrawCount } from "./getBaseDrawCount";
import { getCard } from "../cards/cardRegistry";

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



for (const cardId of player.board) {
  const card = getCard(cardId);

  for (const effect of card.effects) {
    if (
      effect.trigger === "DRAW_PHASE" &&
      effect.timing === "OWN_TURN_DRAW_PHASE" &&
      effect.activation === "PASSIVE"
    ) {
      for (const step of effect.steps) {
        if (step.effect === "MODIFY_DRAW_COUNT") {
          drawCount += step.value ?? 0;
        }

        if (step.effect === "SKIP_DRAW_PHASE") {
          drawCount = 0;  skipDrawPhase = true;
}
      }
      if (skipDrawPhase) {
  drawCount = 0;
}
    }
  }
}
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
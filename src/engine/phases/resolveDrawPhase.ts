import type { GameState } from "../core/GameState";
import type { GameEvent } from "../events/EventTypes";
import { getBaseDrawCount } from "./getBaseDrawCount";

export function resolveDrawPhase(state: GameState): {
  state: GameState;
  events: GameEvent[];
} {
  const player = state.players[state.activePlayerId];

  const drawCount = getBaseDrawCount(
    state.chapter,
    state.drawTurnIndex
  );

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
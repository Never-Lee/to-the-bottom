import type { GameAction } from "../actions/ActionTypes";
import type { GameState } from "../core/GameState";
import type { GameEvent } from "../events/EventTypes";

export function resolveAction(
  state: GameState,
  action: GameAction
): {
  state: GameState;
  events: GameEvent[];
} {
  switch (action.type) {
    case "DRAW_CARD": {
      const player = state.players[action.playerId];
      const drawnCard = player.deck[0];

      if (!drawnCard) {
        return { state, events: [] };
      }

      const updatedPlayer = {
        ...player,
        deck: player.deck.slice(1),
        hand: [...player.hand, drawnCard],
      };

      return {
        state: {
          ...state,
          players: {
            ...state.players,
            [action.playerId]: updatedPlayer,
          },
        },
        events: [
          {
            type: "CARD_DRAWN",
            playerId: action.playerId,
            cardId: drawnCard,
            from: "DECK",
            to: "HAND",
          },
        ],
      };
    }

    case "PLAY_CARD": {
      const player = state.players[action.playerId];

      if (!player.hand.includes(action.cardId)) {
        return { state, events: [] };
      }

      const updatedPlayer = {
        ...player,
        hand: player.hand.filter((cardId) => cardId !== action.cardId),
        board: [...player.board, action.cardId],
      };

      return {
        state: {
          ...state,
          players: {
            ...state.players,
            [action.playerId]: updatedPlayer,
          },
        },
        events: [
          {
            type: "CARD_PLAYED",
            playerId: action.playerId,
            cardId: action.cardId,
            from: "HAND",
            to: "BOARD",
          },
        ],
      };
    }

    case "JETTISON_CARD": {
  const player = state.players[action.playerId];

  if (!player.board.includes(action.cardId)) {
    return { state, events: [] };
  }

  const pointsGained = 1;

  const updatedPlayer = {
    ...player,
    board: player.board.filter((cardId) => cardId !== action.cardId),
    water: [...player.water, action.cardId],
    points: player.points + pointsGained,
  };

  return {
    state: {
      ...state,
      players: {
        ...state.players,
        [action.playerId]: updatedPlayer,
      },
    },
    events: [
      {
        type: "CARD_JETTISONED",
        playerId: action.playerId,
        cardId: action.cardId,
        from: "BOARD",
        to: "WATER",
        pointsGained,
      },
    ],
  };
}

    default:
      return { state, events: [] };
  }
}

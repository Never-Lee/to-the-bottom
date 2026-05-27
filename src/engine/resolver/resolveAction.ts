import type { GameAction } from "../actions/ActionTypes";
import type { GameState } from "../core/GameState";
import type { GameEvent } from "../events/EventTypes";
import { getCard } from "../cards/cardRegistry";
import { resolveDrawPhase } from "../phases/resolveDrawPhase";

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
    return {
      state,
      events: [
        {
          type: "ACTION_REJECTED",
          playerId: action.playerId,
          reason: "Card is not in hand",
        },
      ],
    };
  }

  const card = getCard(action.cardId);

  if (player.points < card.cost) {
    return {
      state,
      events: [
        {
          type: "ACTION_REJECTED",
          playerId: action.playerId,
          reason: "Not enough points",
        },
      ],
    };
  }

  const updatedPlayer = {
    ...player,
    hand: player.hand.filter((cardId) => cardId !== action.cardId),
    board: [...player.board, action.cardId],
    points: player.points - card.cost,
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

  if (!player.hand.includes(action.cardId)) {
    return {
  state,
  events: [
    {
      type: "ACTION_REJECTED",
      playerId: action.playerId,
      reason: "Card is not in hand",
    },
  ],
};
  }

const card = getCard(action.cardId);

const pointsGained = card.points;
  const updatedPlayer = {
    ...player,
    hand: player.hand.filter((cardId) => cardId !== action.cardId),
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
        from: "HAND",
        to: "WATER",
        pointsGained,
      },
    ],
  };
}
case "DRAW_PHASE": {
  if (action.playerId !== state.activePlayerId) {
    return {
      state,
      events: [
        {
          type: "ACTION_REJECTED",
          playerId: action.playerId,
          reason: "Only active player can resolve draw phase",
        },
      ],
    };
  }

  return resolveDrawPhase(state);
}
    default:
      return { state, events: [] };
  }
}

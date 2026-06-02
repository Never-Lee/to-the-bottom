import type { GameAction } from "../actions/ActionTypes";
import type { GameState } from "../core/GameState";
import type { GameEvent } from "../events/EventTypes";
import { getCard } from "../cards/cardRegistry";
import { resolveEffect } from "./resolveEffect";
import { resolveDrawPhase } from "../phases/resolveDrawPhase";
import { checkRequirements } from "../effects/checkRequirements";

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

case "ACTIVATE_CARD": {
  const player = state.players[action.playerId];

  if (!player.board.includes(action.cardId)) {
    return {
      state,
      events: [
        {
          type: "ACTION_REJECTED",
          playerId: action.playerId,
          reason: "Card is not on board",
        },
      ],
    };
  }
  if (player.exhaustedCards.includes(action.cardId)) {
  return {
    state,
    events: [
      {
        type: "ACTION_REJECTED",
        playerId: action.playerId,
        reason: "Card is exhausted",
      },
    ],
  };
}

  const card = getCard(action.cardId);

  const effect = card.effects.find(
    (effect) =>
      effect.activation === "EXHAUST" &&
      effect.timing === "OWN_TURN_ACTION_WINDOW"
  );

  if (!effect) {
    return {
      state,
      events: [
        {
          type: "ACTION_REJECTED",
          playerId: action.playerId,
          reason: "Card has no activatable action effect",
        },
      ],
    };
  }
if (!checkRequirements(state, effect, {
  actorId: action.playerId,
  sourceCardId: action.cardId,
})) {
  return {
    state,
    events: [
      {
        type: "ACTION_REJECTED",
        playerId: action.playerId,
        reason: "Activation requirements not met",
      },
    ],
  };
}
const exhaustedPlayer = {
  ...player,
  exhaustedCards: [...player.exhaustedCards, action.cardId],
};

const exhaustedState: GameState = {
  ...state,
  players: {
    ...state.players,
    [action.playerId]: exhaustedPlayer,
  },
};
  return resolveEffect(
    exhaustedState,
    effect,
    {
      actorId: action.playerId,
      sourceCardId: action.cardId,
    },
    action.input
  );
}
case "READY_PHASE": {
  const player = state.players[action.playerId];

  const readiedCardIds = player.exhaustedCards;

  const updatedPlayer = {
    ...player,
    exhaustedCards: [],
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
        type: "CARDS_READIED",
        playerId: action.playerId,
        cardIds: readiedCardIds,
      },
    ],
  };
}
case "END_TURN": {
  if (action.playerId !== state.activePlayerId) {
    return {
      state,
      events: [
        {
          type: "ACTION_REJECTED",
          playerId: action.playerId,
          reason: "Only active player can end turn",
        },
      ],
    };
  }

  const nextPlayerId = state.activePlayerId === "P1" ? "P2" : "P1";

  return {
    state: {
      ...state,
      activePlayerId: nextPlayerId,
      turnNumber: state.turnNumber + 1,
    },
    events: [
      {
        type: "TURN_ENDED",
        playerId: action.playerId,
      },
      {
        type: "TURN_STARTED",
        playerId: nextPlayerId,
      },
    ],
  };
}
    default:
      return { state, events: [] };
  }
}

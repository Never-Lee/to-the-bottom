import type {
  CardEffect,
  EffectContext,
  EffectInput,
} from "../cards/CardSchema";
import type { GameState } from "../core/GameState";
import type { GameEvent } from "../events/EventTypes";

export function resolveEffect(
  state: GameState,
  effect: CardEffect,
  context: EffectContext,
  input?: EffectInput
): {
  state: GameState;
  events: GameEvent[];
} {
  let currentState = state;
  const events: GameEvent[] = [];

  for (const step of effect.steps) {
    switch (step.effect) {
      case "SKIP_DRAW_PHASE": {
        events.push({
          type: "DRAW_PHASE_SKIPPED",
          reason: effect.id,
        });
        break;
      }

      case "MOVE_SELF_TO_DECK_BOTTOM": {
  const player = currentState.players[context.actorId];

  if (!player.board.includes(context.sourceCardId)) {
    events.push({
      type: "ACTION_REJECTED",
      playerId: context.actorId,
      reason: "Source card is not on board",
    });
    break;
  }

  const updatedPlayer = {
    ...player,
    board: player.board.filter(
      (cardId) => cardId !== context.sourceCardId
    ),
    deck: [...player.deck, context.sourceCardId],
    exhaustedCards: player.exhaustedCards.filter(
      (cardId) => cardId !== context.sourceCardId
    ),
  };

  currentState = {
    ...currentState,
    players: {
      ...currentState.players,
      [context.actorId]: updatedPlayer,
    },
  };

  events.push({
    type: "CARD_MOVED",
    playerId: context.actorId,
    cardId: context.sourceCardId,
    from: "BOARD",
    to: "DECK_BOTTOM",
  });

  break;
}
      
case "START_SINKING_PHASE": {
  const rebuiltPlayers = { ...currentState.players };

  const setupDrawEvents: GameEvent[] = [];

  for (const playerId of ["P1", "P2"] as const) {
    const player = currentState.players[playerId];

    const rebuiltDeck = [
      ...player.hand,
      ...player.deck,
      ...player.water,
    ];

    const setupHand = rebuiltDeck.slice(0, 5);
    const remainingDeck = rebuiltDeck.slice(5);

    rebuiltPlayers[playerId] = {
      ...player,
      hand: setupHand,
      deck: remainingDeck,
      water: [],
    };

    for (const cardId of setupHand) {
      setupDrawEvents.push({
        type: "CARD_DRAWN",
        playerId,
        cardId,
        from: "DECK",
        to: "HAND",
      });
    }
  }

  currentState = {
    ...currentState,
    chapter: "SINKING",
    drawTurnIndex: 0,
    activePlayerId: context.actorId,
    players: rebuiltPlayers,
  };

  events.push({
    type: "SINKING_STARTED",
    actorId: context.actorId,
  });

  events.push(...setupDrawEvents);

  events.push({
    type: "SINKING_SETUP_COMPLETED",
  });

  break;
}
      case "JETTISON_SELF": {
        const player = currentState.players[context.actorId];

        if (!player.board.includes(context.sourceCardId)) {
          events.push({
            type: "ACTION_REJECTED",
            playerId: context.actorId,
            reason: "Source card is not on board",
          });
          break;
        }
        

        const updatedPlayer = {
          ...player,
          board: player.board.filter(
            (cardId) => cardId !== context.sourceCardId
          ),
          water: [...player.water, context.sourceCardId],
        };

        currentState = {
          ...currentState,
          players: {
            ...currentState.players,
            [context.actorId]: updatedPlayer,
          },
        };

        events.push({
          type: "CARD_JETTISONED",
          playerId: context.actorId,
          cardId: context.sourceCardId,
          from: "BOARD",
          to: "WATER",
          pointsGained: 0,
        });

        break;
      }

      case "SHUFFLE_SELECTED_HAND_CARDS_INTO_DECK": {
        const selectedCardIds = input?.selectedCardIds ?? [];
        const player = currentState.players[context.actorId];

        const selectedCardsInHand = selectedCardIds.filter((cardId) =>
          player.hand.includes(cardId)
        );

        const updatedPlayer = {
          ...player,
          hand: player.hand.filter(
            (cardId) => !selectedCardsInHand.includes(cardId)
          ),
          deck: [...player.deck, ...selectedCardsInHand],
        };

        currentState = {
          ...currentState,
          players: {
            ...currentState.players,
            [context.actorId]: updatedPlayer,
          },
        };

        events.push({
          type: "CARDS_SHUFFLED_INTO_DECK",
          playerId: context.actorId,
          cardIds: selectedCardsInHand,
        });

        break;
      }

      case "DRAW_SAME_AMOUNT": {
        const selectedCardIds = input?.selectedCardIds ?? [];
        const amount = selectedCardIds.length;

        const player = currentState.players[context.actorId];

        const drawnCards = player.deck.slice(0, amount);
        const remainingDeck = player.deck.slice(amount);

        const updatedPlayer = {
          ...player,
          deck: remainingDeck,
          hand: [...player.hand, ...drawnCards],
        };

        currentState = {
          ...currentState,
          players: {
            ...currentState.players,
            [context.actorId]: updatedPlayer,
          },
        };

        for (const cardId of drawnCards) {
          events.push({
            type: "CARD_DRAWN",
            playerId: context.actorId,
            cardId,
            from: "DECK",
            to: "HAND",
          });
        }

        break;
      }

      case "MODIFY_DRAW_COUNT": {
        events.push({
          type: "EFFECT_STEP_NOT_IMPLEMENTED",
          effect: step.effect,
        });
        break;
      }

      default: {
        events.push({
          type: "EFFECT_STEP_NOT_IMPLEMENTED",
          effect: step.effect,
        });
        
        break;
        
      }
      case "JETTISON_FROM_OPPONENT_DECK": {
  const targetPlayerId = input?.targetPlayerId;

  if (!targetPlayerId) {
    events.push({
      type: "ACTION_REJECTED",
      playerId: context.actorId,
      reason: "No target player selected",
    });
    break;
  }
  

  const targetPlayer = currentState.players[targetPlayerId];
  const amount = step.value ?? 0;

  const jettisonedCards = targetPlayer.deck.slice(0, amount);
  const remainingDeck = targetPlayer.deck.slice(amount);

  const updatedTargetPlayer = {
    ...targetPlayer,
    deck: remainingDeck,
    water: [...targetPlayer.water, ...jettisonedCards],
  };

  currentState = {
    ...currentState,
    players: {
      ...currentState.players,
      [targetPlayerId]: updatedTargetPlayer,
    },
  };

  for (const cardId of jettisonedCards) {
    events.push({
      type: "CARD_JETTISONED",
      playerId: targetPlayerId,
      cardId,
      from: "DECK",
      to: "WATER",
      pointsGained: 0,
    });
  }

  break;
}
case "JETTISON_SELECTED_HAND_CARDS": {
  const selectedCardIds = input?.selectedCardIds ?? [];
  const amount = step.value ?? selectedCardIds.length;

  const player = currentState.players[context.actorId];

  const selectedCardsInHand = selectedCardIds
    .filter((cardId) => player.hand.includes(cardId))
    .slice(0, amount);

  const updatedPlayer = {
    ...player,
    hand: player.hand.filter(
      (cardId) => !selectedCardsInHand.includes(cardId)
    ),
    water: [...player.water, ...selectedCardsInHand],
  };

  currentState = {
    ...currentState,
    players: {
      ...currentState.players,
      [context.actorId]: updatedPlayer,
    },
  };

  for (const cardId of selectedCardsInHand) {
    events.push({
      type: "CARD_JETTISONED",
      playerId: context.actorId,
      cardId,
      from: "HAND",
      to: "WATER",
      pointsGained: 0,
    });
  }

  break;
}
    }
  }
  

  return {
    state: currentState,
    events,
  };
}
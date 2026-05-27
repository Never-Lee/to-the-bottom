import type { GameState } from "../core/GameState";
import type { GameEvent } from "../events/EventTypes";
import type {
  CardEffect,
  EffectContext,
} from "../cards/CardSchema";

export function resolveEffect(
  state: GameState,
  effect: CardEffect,
  context: EffectContext
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

      case "JETTISON_SELF": {
  const player = currentState.players[context.ownerId];

  if (!player.board.includes(context.sourceCardId)) {
    events.push({
      type: "ACTION_REJECTED",
      playerId: context.ownerId,
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
      [context.ownerId]: updatedPlayer,
    },
  };

  events.push({
    type: "CARD_JETTISONED",
    playerId: context.ownerId,
    cardId: context.sourceCardId,
    from: "BOARD",
    to: "WATER",
    pointsGained: 0,
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
    }
  }

  return {
    state: currentState,
    events,
  };
}
import type { CardEffect } from "../cards/CardSchema";
import type { GameState } from "../core/GameState";
import type { EffectContext } from "../cards/CardSchema";

export function checkRequirements(
  state: GameState,
  effect: CardEffect,
  context: EffectContext
): boolean {
  if (!effect.requirements) {
    return true;
  }

  const player = state.players[context.actorId];

  for (const requirement of effect.requirements) {
    switch (requirement.type) {
      case "MIN_HAND_CARDS": {
        if (player.hand.length < requirement.value) {
          return false;
        }
        break;
      }
    }
  }

  return true;
}
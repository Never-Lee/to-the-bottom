import { getCard } from "../cards/cardRegistry";
import type { CardEffect } from "../cards/CardSchema";
import type { GameState, PlayerId } from "../core/GameState";

export function getPassiveEffectsForTrigger(
  state: GameState,
  playerId: PlayerId,
  trigger: string
): CardEffect[] {
  const player = state.players[playerId];

  const effects: CardEffect[] = [];

  for (const cardId of player.board) {
    const card = getCard(cardId);

    for (const effect of card.effects) {
      if (
        effect.activation === "PASSIVE" &&
        effect.trigger === trigger
      ) {
        effects.push(effect);
      }
    }
  }

  return effects;
}
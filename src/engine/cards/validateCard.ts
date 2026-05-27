import type { CardSchema } from "./CardSchema";

export function validateCard(card: CardSchema): void {
  if (!card.id) {
    throw new Error("Card is missing id");
  }

  if (!card.name) {
    throw new Error(`Card ${card.id} is missing name`);
  }

  if (card.cost < 0) {
    throw new Error(`Card ${card.id} has invalid cost`);
  }

  if (card.points < 0) {
    throw new Error(`Card ${card.id} has invalid points`);
  }

  if (!Array.isArray(card.effects)) {
    throw new Error(`Card ${card.id} effects must be an array`);
  }

  for (const effect of card.effects) {
    if (!effect.id) {
      throw new Error(`Card ${card.id} has effect without id`);
    }

    if (!effect.trigger) {
      throw new Error(
        `Card ${card.id} has effect without trigger`
      );
    }

    if (!Array.isArray(effect.steps)) {
      throw new Error(
        `Card ${card.id} effect ${effect.id} has invalid steps`
      );
    }

    for (const step of effect.steps) {
      if (!step.effect) {
        throw new Error(
          `Card ${card.id} effect ${effect.id} has step without effect`
        );
      }
    }
  }
}
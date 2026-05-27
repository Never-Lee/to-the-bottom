import type { CardSchema, CardId } from "./CardSchema";
import { cards } from "./cards";

const registry: Record<CardId, CardSchema> = cards;

export function getCard(cardId: CardId): CardSchema {
  const card = registry[cardId];

  if (!card) {
    throw new Error(`Card not found: ${cardId}`);
  }

  return card;
}

export function getAllCards(): CardSchema[] {
  return Object.values(registry);
}
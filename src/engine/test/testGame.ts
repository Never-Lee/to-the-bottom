import { createInitialGameState } from "../core/GameState";
import { cards } from "../cards/cards";
import { resolveEffect } from "../resolver/resolveEffect";

const initialState = createInitialGameState();

const anchor = cards.anchor;
const anchorEffect = anchor.effects[0];

const result = resolveEffect(
  initialState,
  anchorEffect,
  {
    ownerId: "P1",
    sourceCardId: "anchor",
  }
);
console.log("ANCHOR EFFECT EVENTS");
console.dir(result.events, { depth: null });

console.log("STATE AFTER ANCHOR EFFECT");
console.dir(result.state, { depth: null });
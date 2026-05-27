import { cards } from "../cards/cards";
import { resolveEffect } from "../resolver/resolveEffect";
import { createTestState } from "./testUtils";

const initialState = createTestState({
  P1: {
    board: ["anchor"],
  },
});

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
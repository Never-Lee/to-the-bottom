import { createInitialGameState } from "../core/GameState";
import { resolveAction } from "../resolver/resolveAction";

const initialState = createInitialGameState();

  const drawResult = resolveAction(initialState, {
  type: "DRAW_CARD",
  playerId: "P1",
});

const jettisonResult = resolveAction(drawResult.state, {
  type: "JETTISON_CARD",
  playerId: "P1",
  cardId: "passenger",
});

console.log("INITIAL STATE");
console.dir(initialState, { depth: null });

console.log("AFTER DRAW");
console.dir(drawResult.state, { depth: null });

console.log("DRAW EVENTS");
console.dir(drawResult.events, { depth: null });

console.log("AFTER JETTISON");
console.dir(jettisonResult.state, { depth: null });

console.log("JETTISON EVENTS");
console.dir(jettisonResult.events, { depth: null });
import { createInitialGameState } from "../core/GameState";
import { resolveAction } from "../resolver/resolveAction";

const initialState = createInitialGameState();

const drawResult = resolveAction(initialState, {
  type: "DRAW_CARD",
  playerId: "P1",
});

const playResult = resolveAction(drawResult.state, {
  type: "PLAY_CARD",
  playerId: "P1",
  cardId: "passenger",
});

console.log("INITIAL STATE", initialState);
console.log("AFTER DRAW", drawResult.state);
console.log("DRAW EVENTS", drawResult.events);
console.log("AFTER PLAY", playResult.state);
console.log("PLAY EVENTS", playResult.events);

const jettisonResult = resolveAction(playResult.state, {
  type: "JETTISON_CARD",
  playerId: "P1",
  cardId: "passenger",
});

console.log("AFTER JETTISON", jettisonResult.state);
console.log("JETTISON EVENTS", jettisonResult.events);
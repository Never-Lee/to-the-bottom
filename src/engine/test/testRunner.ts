import { getCard } from "../cards/cardRegistry";
import { resolveAction } from "../resolver/resolveAction";
import { resolveEffect } from "../resolver/resolveEffect";
import { scenarios } from "./scenarios";

function arraysEqual(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function playerStateMatches(
  actual: {
    hand: string[];
    board: string[];
    water: string[];
    deck: string[];
    exhaustedCards: string[];
    points: number;
  },
  expected: {
    hand?: string[];
    board?: string[];
    water?: string[];
    deck?: string[];
    exhaustedCards?: string[];
    points?: number;
  }
): boolean {
  return (
    (!expected.hand || arraysEqual(actual.hand, expected.hand)) &&
    (!expected.board || arraysEqual(actual.board, expected.board)) &&
    (!expected.water || arraysEqual(actual.water, expected.water)) &&
    (!expected.deck || arraysEqual(actual.deck, expected.deck)) &&
    (!expected.exhaustedCards ||
      arraysEqual(actual.exhaustedCards, expected.exhaustedCards)) &&
    (expected.points === undefined || actual.points === expected.points)
  );
}

for (const scenario of scenarios) {
  const result =
    scenario.kind === "effect"
      ? resolveEffect(
          scenario.state,
          getCard(scenario.effect.cardId).effects[scenario.effect.effectIndex],
          {
            actorId: scenario.effect.actorId,
            sourceCardId: scenario.effect.cardId,
          }
        )
      : resolveAction(scenario.state, scenario.action);

  const eventTypes = result.events.map((event) => event.type);
  const eventsPass = arraysEqual(eventTypes, scenario.expectedEvents);
  const gameStatePass =
  (scenario.expectedState.activePlayerId === undefined ||
    result.state.activePlayerId === scenario.expectedState.activePlayerId) &&
  (scenario.expectedState.turnNumber === undefined ||
    result.state.turnNumber === scenario.expectedState.turnNumber) &&
  (scenario.expectedState.chapter === undefined ||
    result.state.chapter === scenario.expectedState.chapter) &&
  (scenario.expectedState.drawTurnIndex === undefined ||
    result.state.drawTurnIndex === scenario.expectedState.drawTurnIndex);
  const p1 = result.state.players.P1;
 const expectedP1 = scenario.expectedState.P1 ?? {};
 const expectedP2 = scenario.expectedState.P2 ?? {};

 const statePass =
  playerStateMatches(result.state.players.P1, expectedP1) &&
  playerStateMatches(result.state.players.P2, expectedP2);

  const passed = eventsPass && statePass && gameStatePass;
  
  console.log(`\n${passed ? "PASS" : "FAIL"}: ${scenario.name}`);

  if (!passed) {
console.log("Expected events:", scenario.expectedEvents);
console.log("Actual events:", eventTypes);

console.log("Expected game state:", {
  activePlayerId: scenario.expectedState.activePlayerId,
  turnNumber: scenario.expectedState.turnNumber,
  chapter: scenario.expectedState.chapter,
  drawTurnIndex: scenario.expectedState.drawTurnIndex,
});

console.log("Actual game state:", {
  activePlayerId: result.state.activePlayerId,
  turnNumber: result.state.turnNumber,
  chapter: result.state.chapter,
  drawTurnIndex: result.state.drawTurnIndex,
});

console.log("Expected P1:", expectedP1);
console.log("Actual P1:", {
  hand: p1.hand,
  board: p1.board,
  water: p1.water,
  points: p1.points,
  deck: p1.deck,
  exhaustedCards: p1.exhaustedCards,
});
  }
}
import { getCard } from "../cards/cardRegistry";
import { resolveAction } from "../resolver/resolveAction";
import { resolveEffect } from "../resolver/resolveEffect";
import { scenarios } from "./scenarios";

function arraysEqual(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

for (const scenario of scenarios) {
  const result =
    scenario.kind === "effect"
      ? resolveEffect(
          scenario.state,
          getCard(scenario.effect.cardId).effects[scenario.effect.effectIndex],
          {
            ownerId: scenario.effect.ownerId,
            sourceCardId: scenario.effect.cardId,
          }
        )
      : resolveAction(scenario.state, scenario.action);

  const eventTypes = result.events.map((event) => event.type);
  const eventsPass = arraysEqual(eventTypes, scenario.expectedEvents);

  const p1 = result.state.players.P1;
  const expectedP1 = scenario.expectedState.P1 ?? {};

  const statePass =
    (!expectedP1.hand || arraysEqual(p1.hand, expectedP1.hand)) &&
    (!expectedP1.board || arraysEqual(p1.board, expectedP1.board)) &&
    (!expectedP1.water || arraysEqual(p1.water, expectedP1.water)) &&
    (expectedP1.points === undefined || p1.points === expectedP1.points) &&
    (!expectedP1.deck || arraysEqual(p1.deck, expectedP1.deck));

  const passed = eventsPass && statePass;

  console.log(`\n${passed ? "PASS" : "FAIL"}: ${scenario.name}`);

  if (!passed) {
    console.log("Expected events:", scenario.expectedEvents);
    console.log("Actual events:", eventTypes);

    console.log("Expected P1:", expectedP1);
    console.log("Actual P1:", {
      hand: p1.hand,
      board: p1.board,
      water: p1.water,
      points: p1.points,
      deck: p1.deck,
    });
  }
}
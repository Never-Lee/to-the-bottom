import { resolveEffect } from "../resolver/resolveEffect";
import { getScenarioEffect, scenarios } from "./scenarios";

function arraysEqual(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

for (const scenario of scenarios) {
  const effect = getScenarioEffect(scenario);

  const result = resolveEffect(scenario.state, effect, {
    ownerId: scenario.effect.ownerId,
    sourceCardId: scenario.effect.cardId,
  });

  const eventTypes = result.events.map((event) => event.type);

  const eventsPass = arraysEqual(eventTypes, scenario.expectedEvents);

  const p1 = result.state.players.P1;
  const expectedP1 = scenario.expectedState.P1;

  const statePass =
    arraysEqual(p1.board, expectedP1.board) &&
    arraysEqual(p1.water, expectedP1.water) &&
    p1.points === expectedP1.points;

  const passed = eventsPass && statePass;

  console.log(`\n${passed ? "PASS" : "FAIL"}: ${scenario.name}`);

  if (!passed) {
    console.log("Expected events:", scenario.expectedEvents);
    console.log("Actual events:", eventTypes);

    console.log("Expected P1:", expectedP1);
    console.log("Actual P1:", {
      board: p1.board,
      water: p1.water,
      points: p1.points,
    });
  }
}
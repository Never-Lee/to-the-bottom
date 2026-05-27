import type { CardSchema } from "./CardSchema";

export const cards: Record<string, CardSchema> = {
  passenger: {
  id: "passenger",
  name: "Passenger",
  color: "BLUE",
  type: "PASSENGER",
  cost: 1,
  points: 1,
  effects: [],
},

anchor: {
  id: "anchor",
  name: "Anchor",
  color: "BLUE",
  type: "ACTION",
  cost: 0,
  points: 0,
  effects: [
    {
      id: "anchor_skip_draw_and_jettison_self",
      trigger: "BEFORE_DRAW_PHASE",
      timing: "OWN_TURN_BEFORE_DRAW",
      activation: "EXHAUST",
      optional: true,
      steps: [
        {
          effect: "SKIP_DRAW_PHASE",
        },
        {
          effect: "JETTISON_SELF",
          target: "SELF",
        },
      ],
    },
  ],
},
}
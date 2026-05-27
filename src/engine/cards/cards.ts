import type { CardSchema } from "./CardSchema";

export const cards: Record<string, CardSchema> = {
  passenger: {
  id: "passenger",
  name: "Passenger",
  color: "BEIGE",
  cost: 1,
  points: 1,
  effects: [],
},

anchor: {
  id: "anchor",
  name: "Anchor",
  color: "BLUE",
  cost: 0,
  points: 0,
  effects: [
    {
      id: "anchor_skip_draw",
      trigger: "DRAW_PHASE",
      timing: "OWN_TURN_DRAW_PHASE",
      activation: "PASSIVE",
      optional: false,
      steps: [
        {
          effect: "SKIP_DRAW_PHASE",
        },
      ],
    },
    {
      id: "anchor_jettison_self",
      trigger: "ACTION_PHASE",
      timing: "OWN_TURN_ACTION_WINDOW",
      activation: "EXHAUST",
      optional: true,
      steps: [
        {
          effect: "JETTISON_SELF",
          target: "SELF",
        },
      ],
    },
  ],
},
}
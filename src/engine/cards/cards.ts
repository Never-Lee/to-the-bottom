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

fisherman: {
  id: "fisherman",
  name: "Fisherman",
  color: "GREEN",
  cost: 2,
  points: 2,
  effects: [
    {
      id: "fisherman_modify_draw",
      trigger: "DRAW_PHASE",
      timing: "OWN_TURN_DRAW_PHASE",
      activation: "PASSIVE",
      optional: false,
      steps: [
        {
          effect: "MODIFY_DRAW_COUNT",
          target: "SELF",
          value: 1,
        },
      ],
    },
  ],
},

stoker: {
  id: "stoker",
  name: "Stoker",
  color: "GREEN",
  cost: 5,
  points: 5,
  effects: [
    {
      id: "stoker_modify_draw",
      trigger: "DRAW_PHASE",
      timing: "OWN_TURN_DRAW_PHASE",
      activation: "PASSIVE",
      optional: false,
      steps: [
        {
          effect: "MODIFY_DRAW_COUNT",
          target: "SELF",
          value: -1,
        },
      ],
    },
  ],
},

captain: {
  id: "captain",
  name: "Captain",
  color: "PURPLE",
  cost: 9,
  points: 9,
  effects: [
    {
      id: "captain_shuffle_hand_and_draw",
      trigger: "ACTION_PHASE",
      timing: "OWN_TURN_ACTION_WINDOW",
      activation: "EXHAUST",
      optional: true,
      steps: [
        {
          effect: "SHUFFLE_SELECTED_HAND_CARDS_INTO_DECK",
          target: "SELF",
          inputKey: "selectedCardIds",
        },
        {
          effect: "DRAW_SAME_AMOUNT",
          target: "SELF",
          inputKey: "selectedCardIds",
        },
      ],
    },
  ],
},
torpedo: {
  id: "torpedo",
  name: "Torpedo",
  color: "RED",
  cost: 12,
  points: 12,
  effects: [
    {
      id: "torpedo_jettison_deck_and_hand",
      trigger: "ACTION_PHASE",
      timing: "OWN_TURN_ACTION_WINDOW",
      activation: "EXHAUST",
      optional: true,
      requirements: [
  {
    type: "MIN_HAND_CARDS",
    value: 1,
  },
],
      steps: [
        {
          effect: "JETTISON_FROM_OPPONENT_DECK",
          target: "OPPONENT",
          value: 3,
        },
        {
          effect: "JETTISON_SELECTED_HAND_CARDS",
          target: "SELF",
          inputKey: "selectedCardIds",
          value: 1,
        },
      ],
    },
  ],
},
iceberg: {
  id: "iceberg",
  name: "Iceberg",
  color: "BEIGE",
  cost: 20,
  points: 10,
  effects: [
    {
      id: "iceberg_start_sinking",
      trigger: "ON_BUY",
      timing: "OWN_TURN_ACTION_WINDOW",
      activation: "AUTOMATIC",
      optional: false,
      steps: [
        {
          effect: "START_SINKING_PHASE",
        },
      ],
    },
  ],
},
jack: {
  id: "jack",
  name: "Jack",
  color: "BEIGE",
  cost: 0,
  points: 0,
  effects: [
    {
      id: "jack_move_self_to_deck_bottom",
      trigger: "ACTION_PHASE",
      timing: "OWN_TURN_ACTION_WINDOW",
      activation: "EXHAUST",
      optional: true,
      steps: [
        {
          effect: "MOVE_SELF_TO_DECK_BOTTOM",
          target: "SELF",
        },
      ],
    },
  ],
},
};


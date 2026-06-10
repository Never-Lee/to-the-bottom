import { createTestState } from "./testUtils";
import type { Scenario } from "./ScenarioTypes";

export const scenarios: Scenario[] = [
  {
   name: "Anchor can jettison itself during action phase",
    kind: "effect",
    state: createTestState({
      P1: {
        board: ["anchor"],
      },
    }),
    effect: {
      cardId: "anchor",
      effectIndex: 1,
      actorId: "P1" as const,
    },
    expectedEvents: ["CARD_JETTISONED"],
    expectedState: {
      P1: {
        board: [],
        water: ["anchor"],
        points: 0,
      },
    },
  },

  {
    name: "Player can play Passenger by spending points",
    kind: "action",
    state: createTestState({
      P1: {
        hand: ["passenger"],
        points: 1,
      },
    }),
    action: {
      type: "PLAY_CARD" as const,
      playerId: "P1" as const,
      cardId: "passenger",
    },
    expectedEvents: ["CARD_PLAYED"],
    expectedState: {
      P1: {
        board: ["passenger"],
        hand: [],
        points: 0,
      },
    },
  },
  {
    kind: "action",
    name: "Player draws 3 cards at start of CRUISE",
    state: createTestState({
      P1: {
        deck: [
          "passenger",
          "anchor",
          "fisherman",
        ],
      },
    }),
    action: {
      type: "DRAW_PHASE" as const,
      playerId: "P1" as const,
    },
    expectedEvents: [
      "CARD_DRAWN",
      "CARD_DRAWN",
      "CARD_DRAWN",
    ],
    expectedState: {
      P1: {
        hand: [
          "passenger",
          "anchor",
          "fisherman",
        ],
        deck: [],
      },
    },
  },
{
  kind: "action",
  name: "Fisherman forces player to draw one extra card",
  state: createTestState({
    P1: {
      board: ["fisherman"],
      deck: [
        "passenger",
        "anchor",
        "passenger",
        "anchor",
      ],
    },
  }),
  action: {
    type: "DRAW_PHASE" as const,
    playerId: "P1" as const,
  },
  expectedEvents: [
    "CARD_DRAWN",
    "CARD_DRAWN",
    "CARD_DRAWN",
    "CARD_DRAWN",
  ],
  expectedState: {
    P1: {
      board: ["fisherman"],
      hand: [
        "passenger",
        "anchor",
        "passenger",
        "anchor",
      ],
      deck: [],
    },
  },
},
{
  kind: "action",
  name: "Anchor prevents drawing during draw phase",
  state: createTestState({
    P1: {
      board: ["anchor"],
      deck: [
        "passenger",
        "fisherman",
        "passenger",
      ],
    },
  }),
  action: {
    type: "DRAW_PHASE" as const,
    playerId: "P1" as const,
  },
  expectedEvents: [],
  expectedState: {
    P1: {
      board: ["anchor"],
      hand: [],
      deck: [
        "passenger",
        "fisherman",
        "passenger",
      ],
    },
  },
},
{
  kind: "action",
  name: "Anchor overrides Fisherman draw bonus",
  state: createTestState({
    P1: {
      board: ["anchor", "fisherman"],
      deck: [
        "passenger",
        "anchor",
        "passenger",
        "anchor",
      ],
    },
  }),
  action: {
    type: "DRAW_PHASE" as const,
    playerId: "P1" as const,
  },
  expectedEvents: [],
  expectedState: {
    P1: {
      board: ["anchor", "fisherman"],
      hand: [],
      deck: [
        "passenger",
        "anchor",
        "passenger",
        "anchor",
      ],
    },
  },
},
{
  kind: "action",
  name: "Stoker forces player to draw one fewer card",
  state: createTestState({
    P1: {
      board: ["stoker"],
      deck: [
        "passenger",
        "anchor",
        "fisherman",
      ],
    },
  }),
  action: {
    type: "DRAW_PHASE" as const,
    playerId: "P1" as const,
  },
  expectedEvents: [
    "CARD_DRAWN",
    "CARD_DRAWN",
  ],
  expectedState: {
    P1: {
      board: ["stoker"],
      hand: [
        "passenger",
        "anchor",
      ],
      deck: [
        "fisherman",
      ],
    },
  },
},
{
  kind: "action",
  name: "Fisherman modifies third CRUISE draw from 5 to 6",
  state: createTestState({
    drawTurnIndex: 2,
    P1: {
      board: ["fisherman"],
      deck: [
        "passenger",
        "anchor",
        "fisherman",
        "stoker",
        "passenger",
        "anchor",
      ],
    },
  }),
  action: {
    type: "DRAW_PHASE" as const,
    playerId: "P1" as const,
  },
  expectedEvents: [
    "CARD_DRAWN",
    "CARD_DRAWN",
    "CARD_DRAWN",
    "CARD_DRAWN",
    "CARD_DRAWN",
    "CARD_DRAWN",
  ],
  expectedState: {
    P1: {
      board: ["fisherman"],
      hand: [
        "passenger",
        "anchor",
        "fisherman",
        "stoker",
        "passenger",
        "anchor",
      ],
      deck: [],
    },
  },
},
{
  kind: "action",
  name: "Captain shuffles selected hand cards into deck and draws same amount",
  state: createTestState({
    P1: {
      board: ["captain"],
      hand: ["passenger", "anchor"],
      deck: ["fisherman", "stoker"],
    },
  }),
  action: {
    type: "ACTIVATE_CARD" as const,
    playerId: "P1" as const,
    cardId: "captain",
    input: {
      selectedCardIds: ["passenger", "anchor"],
    },
  },
  expectedEvents: [
    "CARDS_SHUFFLED_INTO_DECK",
    "CARD_DRAWN",
    "CARD_DRAWN",
  ],
  expectedState: {
    P1: {
      board: ["captain"],
      hand: ["fisherman", "stoker"],
      deck: ["passenger", "anchor"],
    },
  },
},
{
  kind: "action",
  name: "Torpedo jettisons opponent deck cards and one card from hand",
  state: createTestState({
    P1: {
      board: ["torpedo"],
      hand: ["passenger"],
    },
    P2: {
      deck: [
        "anchor",
        "fisherman",
        "stoker",
        "captain",
      ],
    },
  }),
  action: {
    type: "ACTIVATE_CARD" as const,
    playerId: "P1" as const,
    cardId: "torpedo",
    input: {
      targetPlayerId: "P2",
      selectedCardIds: ["passenger"],
    },
  },
  expectedEvents: [
    "CARD_JETTISONED",
    "CARD_JETTISONED",
    "CARD_JETTISONED",
    "CARD_JETTISONED",
  ],
  expectedState: {
    P1: {
      board: ["torpedo"],
      hand: [],
      water: ["passenger"],
    },
    P2: {
      deck: ["captain"],
      water: [
        "anchor",
        "fisherman",
        "stoker",
      ],
    },
  },
},
{
  kind: "action",
  name: "Torpedo cannot activate without cards in hand",
  state: createTestState({
    P1: {
      board: ["torpedo"],
      hand: [],
    },
    P2: {
      deck: [
        "anchor",
        "fisherman",
        "stoker",
      ],
    },
  }),
  action: {
    type: "ACTIVATE_CARD" as const,
    playerId: "P1" as const,
    cardId: "torpedo",
    input: {
      targetPlayerId: "P2",
      selectedCardIds: [],
    },
  },
  expectedEvents: [
    "ACTION_REJECTED",
  ],
  expectedState: {
    P1: {
      board: ["torpedo"],
      hand: [],
      water: [],
    },
    P2: {
      deck: [
        "anchor",
        "fisherman",
        "stoker",
      ],
      water: [],
    },
  },
},
{
  kind: "action",
  name: "Torpedo partially resolves when opponent deck has fewer than 3 cards",
  state: createTestState({
    P1: {
      board: ["torpedo"],
      hand: ["passenger"],
    },
    P2: {
      deck: [
        "anchor",
        "fisherman",
      ],
    },
  }),
  action: {
    type: "ACTIVATE_CARD" as const,
    playerId: "P1" as const,
    cardId: "torpedo",
    input: {
      targetPlayerId: "P2",
      selectedCardIds: ["passenger"],
    },
  },
  expectedEvents: [
    "CARD_JETTISONED",
    "CARD_JETTISONED",
    "CARD_JETTISONED",
  ],
  expectedState: {
    P1: {
      hand: [],
      water: ["passenger"],
    },
    P2: {
      deck: [],
      water: [
        "anchor",
        "fisherman",
      ],
    },
  },
},
{
  kind: "action",
  name: "Exhausted Captain cannot be activated",
  state: createTestState({
    P1: {
      board: ["captain"],
      exhaustedCards: ["captain"],
      hand: ["passenger"],
      deck: ["anchor"],
    },
  }),
  action: {
    type: "ACTIVATE_CARD" as const,
    playerId: "P1" as const,
    cardId: "captain",
    input: {
      selectedCardIds: ["passenger"],
    },
  },
  expectedEvents: ["ACTION_REJECTED"],
  expectedState: {
    P1: {
      board: ["captain"],
      exhaustedCards: ["captain"],
      hand: ["passenger"],
      deck: ["anchor"],
    },
  },
},
{
  kind: "action",
  name: "Ready phase readies exhausted cards",
  state: createTestState({
    P1: {
      board: ["captain"],
      exhaustedCards: ["captain"],
    },
  }),
  action: {
    type: "READY_PHASE" as const,
    playerId: "P1" as const,
  },
  expectedEvents: ["CARDS_READIED"],
  expectedState: {
    P1: {
      board: ["captain"],
      exhaustedCards: [],
    },
  },
},
{
  kind: "action",
  name: "End turn switches active player",
  state: createTestState({
    activePlayerId: "P1",
    turnNumber: 1,
  }),
  action: {
    type: "END_TURN" as const,
    playerId: "P1" as const,
  },
  expectedEvents: ["TURN_ENDED", "TURN_STARTED"],
  expectedState: {
    activePlayerId: "P2",
    turnNumber: 2,
  },
},
{
  kind: "effect",
  name: "Iceberg starts Sinking phase and rebuilds decks",
  state: createTestState({
    activePlayerId: "P1",
    chapter: "CRUISE",
    drawTurnIndex: 7,
    P1: {
      hand: ["passenger"],
      deck: ["anchor"],
      water: ["fisherman"],
      board: ["iceberg"],
    },
    P2: {
      hand: ["stoker"],
      deck: ["captain"],
      water: ["torpedo"],
      board: ["fisherman"],
    },
  }),
  effect: {
    cardId: "iceberg",
    effectIndex: 0,
    actorId: "P1" as const,
  },
  expectedEvents: [
    "SINKING_STARTED",
    "CARD_DRAWN",
    "CARD_DRAWN",
    "CARD_DRAWN",
    "CARD_DRAWN",
    "CARD_DRAWN",
    "CARD_DRAWN",
    "SINKING_SETUP_COMPLETED",
  ],
  expectedState: {
    activePlayerId: "P1",
    chapter: "SINKING",
    drawTurnIndex: 0,
    P1: {
      hand: [
        "passenger",
        "anchor",
        "fisherman",
      ],
      deck: [],
      water: [],
      board: ["iceberg"],
    },
    P2: {
      hand: [
        "stoker",
        "captain",
        "torpedo",
      ],
      deck: [],
      water: [],
      board: ["fisherman"],
    },
  },
},
{
  kind: "action",
  name: "Player buys Captain from shop into water",
  state: createTestState({
    shop: ["captain"],
    P1: {
      points: 12,
    },
  }),
  action: {
    type: "BUY_CARD" as const,
    playerId: "P1" as const,
    cardId: "captain",
  },
  expectedEvents: ["CARD_BOUGHT"],
  expectedState: {
    P1: {
      points: 3,
      water: ["captain"],
    },
  },
},
{
  kind: "action",
  name: "Buying Iceberg starts Sinking phase",
  state: createTestState({
    activePlayerId: "P1",
    chapter: "CRUISE",
    drawTurnIndex: 4,
    shop: ["iceberg"],
    P1: {
      points: 20,
      hand: ["passenger"],
      deck: ["anchor"],
      water: ["fisherman"],
      board: [],
    },
    P2: {
      hand: ["stoker"],
      deck: ["captain"],
      water: ["torpedo"],
      board: ["fisherman"],
    },
  }),
  action: {
    type: "BUY_CARD" as const,
    playerId: "P1" as const,
    cardId: "iceberg",
  },
  expectedEvents: [
    "CARD_BOUGHT",
    "SINKING_STARTED",
    "CARD_DRAWN",
    "CARD_DRAWN",
    "CARD_DRAWN",
    "CARD_DRAWN",
    "CARD_DRAWN",
    "CARD_DRAWN",
    "CARD_DRAWN",
    "SINKING_SETUP_COMPLETED",
  ],
  expectedState: {
    activePlayerId: "P1",
    chapter: "SINKING",
    drawTurnIndex: 0,
    P1: {
      points: 0,
      hand: [
        "passenger",
        "anchor",
        "fisherman",
        "iceberg",
      ],
      deck: [],
      water: [],
      board: [],
    },
    P2: {
      hand: [
        "stoker",
        "captain",
        "torpedo",
      ],
      deck: [],
      water: [],
      board: ["fisherman"],
    },
  },
},
{
  kind: "action",
  name: "Jack moves himself to bottom of deck",
  state: createTestState({
    P1: {
      board: ["jack"],
      deck: ["passenger", "anchor"],
    },
  }),
  action: {
    type: "ACTIVATE_CARD" as const,
    playerId: "P1" as const,
    cardId: "jack",
  },
  expectedEvents: ["CARD_MOVED"],
  expectedState: {
    P1: {
      board: [],
      deck: ["passenger", "anchor", "jack"],
      exhaustedCards: [],
    },
  },
},
{
  kind: "action",
  name: "Janitor makes each player move selected board card to deck bottom",
  state: createTestState({
    P1: {
      board: ["janitor", "passenger"],
      deck: [],
    },
    P2: {
      board: ["fisherman"],
      deck: [],
    },
  }),
  action: {
    type: "ACTIVATE_CARD" as const,
    playerId: "P1" as const,
    cardId: "janitor",
    input: {
      selectedCardsByPlayerId: {
        P1: "passenger",
        P2: "fisherman",
      },
    },
  },
  expectedEvents: [
    "CARD_MOVED",
    "CARD_MOVED",
  ],
  expectedState: {
    P1: {
      board: ["janitor"],
      deck: ["passenger"],
      exhaustedCards: ["janitor"],
    },
    P2: {
      board: [],
      deck: ["fisherman"],
    },
  },
},
{
  kind: "action",
  name: "Polka Dancer draws one card",
  state: createTestState({
    P1: {
      board: ["polkaDancer"],
      deck: ["passenger", "anchor"],
    },
  }),
  action: {
    type: "ACTIVATE_CARD" as const,
    playerId: "P1" as const,
    cardId: "polkaDancer",
  },
  expectedEvents: ["CARD_DRAWN"],
  expectedState: {
    P1: {
      board: ["polkaDancer"],
      hand: ["passenger"],
      deck: ["anchor"],
      exhaustedCards: ["polkaDancer"],
    },
  },
},
{
  kind: "action",
  name: "Singer gains 3 points",
  state: createTestState({
    P1: {
      board: ["singer"],
      points: 2,
    },
  }),
  action: {
    type: "ACTIVATE_CARD" as const,
    playerId: "P1" as const,
    cardId: "singer",
  },
  expectedEvents: ["POINTS_GAINED"],
  expectedState: {
    P1: {
      points: 5,
      board: ["singer"],
      exhaustedCards: ["singer"],
    },
  },
},
{
  kind: "action",
  name: "Beggar returns selected opponent board cards to their hands",
  state: createTestState({
    P1: {
      board: ["beggar"],
    },
    P2: {
      board: ["fisherman", "stoker"],
      hand: [],
    },
  }),
  action: {
    type: "ACTIVATE_CARD" as const,
    playerId: "P1" as const,
    cardId: "beggar",
    input: {
      selectedCardsByPlayerId: {
        P2: "stoker",
      },
    },
  },
  expectedEvents: ["CARD_MOVED"],
  expectedState: {
    P1: {
      board: ["beggar"],
      exhaustedCards: ["beggar"],
    },
    P2: {
      board: ["fisherman"],
      hand: ["stoker"],
    },
  },
},
];


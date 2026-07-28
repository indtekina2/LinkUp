const users = [
  {
    id: "user_001",
    username: "indtekina",
    password: "1234",

    conversations: [
      "conversation_001",
      "conversation_002",
      "conversation_003",
      "conversation_004",
    ],
  },

  // other people
  {
    id: "user_002",
    username: "Noor",
  },
  {
    id: "user_003",
    username: "Indtekina",
  },
  {
    id: "user_006",
    username: "Arnab",
  },
];

const conversations = [
  // Private conversation between indtekina and noor
  {
    id: "conversation_001",

    isGroup: false,

    name: null,

    participants: ["user_001", "user_002"],

    messages: [
      {
        sender: "user_001",
        message: "Hey Noor, how are you?",
        timestamp: "2026-07-28T10:00:00Z",
      },
      {
        sender: "user_002",
        message: "I'm good! What about you?",
        timestamp: "2026-07-28T10:02:00Z",
      },
      {
        sender: "user_001",
        message: "I'm doing great 😄",
        timestamp: "2026-07-28T10:03:00Z",
      },
      {
        sender: "user_002",
        message: "That's nice to hear!",
        timestamp: "2026-07-28T10:04:00Z",
      },
    ],
  },

  // Group conversation
  {
    id: "conversation_002",

    isGroup: true,

    name: "College Friends",

    participants: ["user_001", "user_002", "user_003"],

    messages: [
      {
        sender: "user_003",
        message: "Are you guys coming to college tomorrow?",
        timestamp: "2026-07-28T11:00:00Z",
      },
      {
        sender: "user_001",
        message: "Yeah, I'll be there.",
        timestamp: "2026-07-28T11:02:00Z",
      },
      {
        sender: "user_002",
        message: "Same here.",
        timestamp: "2026-07-28T11:03:00Z",
      },
      {
        sender: "user_003",
        message: "Cool. Let's meet after class.",
        timestamp: "2026-07-28T11:05:00Z",
      },
    ],
  },

  // Private conversation
  {
    id: "conversation_004",

    isGroup: false,

    name: null,

    participants: ["user_001", "user_006"],

    messages: [
      {
        sender: "user_006",
        message: "Hey! Did you finish that project?",
        timestamp: "2026-07-28T16:00:00Z",
      },
      {
        sender: "user_001",
        message: "Almost. Just need to fix a few bugs.",
        timestamp: "2026-07-28T16:02:00Z",
      },
    ],
  },
];

export { users, conversations };
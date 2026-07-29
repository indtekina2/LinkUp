const users = [
  // Current user
  {
    id: "user_001",
    username: "indtekina",
    password: "1234",
    currentUser: true,
    conversations: [
      "conversation_001",
      "conversation_002",
      "conversation_003",
      "conversation_004",
      "conversation_005",
      "conversation_006",
      "conversation_007",
      "conversation_008",
      "conversation_009",
      "conversation_010",
    ],
  },

  // Other users
  {
    currentUser: false,
    id: "user_002",
    username: "Noor",
    conversations: [
      "conversation_001",
      "conversation_002",
      "conversation_005",
      "conversation_008",
    ],
  },
  {
    currentUser: false,
    id: "user_003",
    username: "Indtekina",
    conversations: ["conversation_002", "conversation_006", "conversation_009"],
  },
  {
    currentUser: false,
    id: "user_004",
    username: "Rohit",
    conversations: ["conversation_003", "conversation_007", "conversation_010"],
  },
  {
    currentUser: false,
    id: "user_005",
    username: "Priya",
    conversations: ["conversation_003", "conversation_005", "conversation_008"],
  },
  {
    currentUser: false,
    id: "user_006",
    username: "Arnab",
    conversations: ["conversation_004", "conversation_006", "conversation_009"],
  },
  {
    currentUser: false,
    id: "user_007",
    username: "Sarah",
    conversations: ["conversation_005", "conversation_007", "conversation_010"],
  },
  {
    currentUser: false,
    id: "user_008",
    username: "Mike",
    conversations: ["conversation_004", "conversation_006", "conversation_008"],
  },
  {
    currentUser: false,
    id: "user_009",
    username: "Emma",
    conversations: ["conversation_001", "conversation_007", "conversation_009"],
  },
  {
    currentUser: false,
    id: "user_010",
    username: "David",
    conversations: ["conversation_002", "conversation_003", "conversation_010"],
  },
  {
    currentUser: false,
    id: "user_011",
    username: "Lisa",
    conversations: ["conversation_005", "conversation_008", "conversation_009"],
  },
  {
    currentUser: false,
    id: "user_012",
    username: "James",
    conversations: ["conversation_001", "conversation_006", "conversation_007"],
  },
  {
    currentUser: false,
    id: "user_013",
    username: "Maria",
    conversations: ["conversation_004", "conversation_008", "conversation_010"],
  },
  {
    currentUser: false,
    id: "user_014",
    username: "Tom",
    conversations: ["conversation_002", "conversation_005", "conversation_009"],
  },
  {
    currentUser: false,
    id: "user_015",
    username: "Anna",
    conversations: ["conversation_003", "conversation_006", "conversation_010"],
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
      {
        sender: "user_001",
        message: "Want to grab coffee later?",
        timestamp: "2026-07-28T10:05:00Z",
      },
      {
        sender: "user_002",
        message: "Sure! Where should we meet?",
        timestamp: "2026-07-28T10:06:00Z",
      },
      {
        sender: "user_001",
        message: "How about Starbucks near campus?",
        timestamp: "2026-07-28T10:08:00Z",
      },
      {
        sender: "user_002",
        message: "Perfect! See you there at 3pm?",
        timestamp: "2026-07-28T10:09:00Z",
      },
      {
        sender: "user_001",
        message: "See you at 3! 👋",
        timestamp: "2026-07-28T10:10:00Z",
      },
    ],
  },

  // Group conversation - College Friends
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
      {
        sender: "user_001",
        message: "What time does class end?",
        timestamp: "2026-07-28T11:06:00Z",
      },
      {
        sender: "user_003",
        message: "At 4pm as usual.",
        timestamp: "2026-07-28T11:07:00Z",
      },
      {
        sender: "user_002",
        message: "Should we grab dinner together?",
        timestamp: "2026-07-28T11:08:00Z",
      },
      {
        sender: "user_001",
        message: "Great idea! Any suggestions?",
        timestamp: "2026-07-28T11:09:00Z",
      },
      {
        sender: "user_003",
        message: "There's a new Italian place nearby.",
        timestamp: "2026-07-28T11:10:00Z",
      },
    ],
  },

  // Private conversation - Rohit
  {
    id: "conversation_003",
    isGroup: false,
    name: null,
    participants: ["user_001", "user_004"],
    messages: [
      {
        sender: "user_004",
        message: "Hey! Did you review my code?",
        timestamp: "2026-07-28T09:00:00Z",
      },
      {
        sender: "user_001",
        message: "Yes, I left some comments. Looks good overall.",
        timestamp: "2026-07-28T09:05:00Z",
      },
      {
        sender: "user_004",
        message: "Thanks! I'll fix those issues today.",
        timestamp: "2026-07-28T09:06:00Z",
      },
      {
        sender: "user_001",
        message: "Great. Let me know when you push the changes.",
        timestamp: "2026-07-28T09:07:00Z",
      },
    ],
  },

  // Private conversation - Arnab
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
      {
        sender: "user_006",
        message: "Need any help?",
        timestamp: "2026-07-28T16:03:00Z",
      },
      {
        sender: "user_001",
        message:
          "I could use a second pair of eyes on the authentication module.",
        timestamp: "2026-07-28T16:05:00Z",
      },
      {
        sender: "user_006",
        message: "Send it over. I'll take a look.",
        timestamp: "2026-07-28T16:06:00Z",
      },
    ],
  },

  // Group conversation - Work Team
  {
    id: "conversation_005",
    isGroup: true,
    name: "Work Team",
    participants: ["user_001", "user_002", "user_005", "user_007"],
    messages: [
      {
        sender: "user_005",
        message: "Daily standup in 10 minutes!",
        timestamp: "2026-07-28T09:50:00Z",
      },
      {
        sender: "user_001",
        message: "On my way to the meeting room.",
        timestamp: "2026-07-28T09:52:00Z",
      },
      {
        sender: "user_007",
        message: "I'll join virtually. Can someone share the link?",
        timestamp: "2026-07-28T09:53:00Z",
      },
      {
        sender: "user_002",
        message: "Here's the link: https://meet.google.com/xxx",
        timestamp: "2026-07-28T09:54:00Z",
      },
      {
        sender: "user_005",
        message: "Thanks! I'll update the team on the client feedback.",
        timestamp: "2026-07-28T09:55:00Z",
      },
    ],
  },

  // Group conversation - Gaming Squad
  {
    id: "conversation_006",
    isGroup: true,
    name: "Gaming Squad",
    participants: ["user_001", "user_003", "user_006", "user_008"],
    messages: [
      {
        sender: "user_006",
        message: "Anyone online for Valorant?",
        timestamp: "2026-07-28T20:00:00Z",
      },
      {
        sender: "user_003",
        message: "I'm in! Give me 5 minutes.",
        timestamp: "2026-07-28T20:01:00Z",
      },
      {
        sender: "user_008",
        message: "Count me in too.",
        timestamp: "2026-07-28T20:02:00Z",
      },
      {
        sender: "user_001",
        message: "I'll join after dinner. 30 mins?",
        timestamp: "2026-07-28T20:03:00Z",
      },
      {
        sender: "user_006",
        message: "Sure, we'll warm up with some practice matches.",
        timestamp: "2026-07-28T20:04:00Z",
      },
      {
        sender: "user_003",
        message: "What rank are you guys now?",
        timestamp: "2026-07-28T20:05:00Z",
      },
      {
        sender: "user_008",
        message: "I just hit Diamond 2!",
        timestamp: "2026-07-28T20:06:00Z",
      },
    ],
  },

  // Private conversation - Sarah
  {
    id: "conversation_007",
    isGroup: false,
    name: null,
    participants: ["user_001", "user_007"],
    messages: [
      {
        sender: "user_007",
        message: "Are you coming to the party on Saturday?",
        timestamp: "2026-07-28T14:00:00Z",
      },
      {
        sender: "user_001",
        message: "I'm not sure yet. What time?",
        timestamp: "2026-07-28T14:02:00Z",
      },
      {
        sender: "user_007",
        message: "Starts at 8pm at my place.",
        timestamp: "2026-07-28T14:03:00Z",
      },
      {
        sender: "user_001",
        message: "I'll try to make it! 😊",
        timestamp: "2026-07-28T14:04:00Z",
      },
      {
        sender: "user_007",
        message: "Awesome! Bring some snacks if you can.",
        timestamp: "2026-07-28T14:05:00Z",
      },
    ],
  },

  // Group conversation - Study Group
  {
    id: "conversation_008",
    isGroup: true,
    name: "Study Group",
    participants: ["user_001", "user_002", "user_005", "user_008", "user_011"],
    messages: [
      {
        sender: "user_011",
        message: "Who's up for a study session this weekend?",
        timestamp: "2026-07-28T13:00:00Z",
      },
      {
        sender: "user_002",
        message: "I'm in! Need to prepare for the exam.",
        timestamp: "2026-07-28T13:01:00Z",
      },
      {
        sender: "user_005",
        message: "Me too. Where should we meet?",
        timestamp: "2026-07-28T13:02:00Z",
      },
      {
        sender: "user_008",
        message: "Library is usually quiet on Sundays.",
        timestamp: "2026-07-28T13:03:00Z",
      },
      {
        sender: "user_001",
        message: "I'll join too. What time?",
        timestamp: "2026-07-28T13:04:00Z",
      },
      {
        sender: "user_011",
        message: "How about 10am?",
        timestamp: "2026-07-28T13:05:00Z",
      },
      {
        sender: "user_002",
        message: "10am sounds good. See you all there!",
        timestamp: "2026-07-28T13:06:00Z",
      },
    ],
  },

  // Group conversation - Fitness Buddies
  {
    id: "conversation_009",
    isGroup: true,
    name: "Fitness Buddies",
    participants: ["user_001", "user_003", "user_006", "user_009", "user_011"],
    messages: [
      {
        sender: "user_009",
        message: "Morning workout at 6am tomorrow?",
        timestamp: "2026-07-28T21:00:00Z",
      },
      {
        sender: "user_003",
        message: "I'll be there!",
        timestamp: "2026-07-28T21:01:00Z",
      },
      {
        sender: "user_006",
        message: "Me too! Need to stay consistent.",
        timestamp: "2026-07-28T21:02:00Z",
      },
      {
        sender: "user_011",
        message: "I'll skip tomorrow, feeling sick 😷",
        timestamp: "2026-07-28T21:03:00Z",
      },
      {
        sender: "user_001",
        message: "Get well soon! We'll do an extra set for you.",
        timestamp: "2026-07-28T21:04:00Z",
      },
      {
        sender: "user_009",
        message: "Same routine? Cardio and strength?",
        timestamp: "2026-07-28T21:05:00Z",
      },
      {
        sender: "user_003",
        message: "Yeah, let's push ourselves today! 💪",
        timestamp: "2026-07-28T21:06:00Z",
      },
    ],
  },

  // Private conversation - David
  {
    id: "conversation_010",
    isGroup: false,
    name: null,
    participants: ["user_001", "user_010"],
    messages: [
      {
        sender: "user_010",
        message: "Got the tickets for the concert!",
        timestamp: "2026-07-28T18:00:00Z",
      },
      {
        sender: "user_001",
        message: "Awesome! Which section?",
        timestamp: "2026-07-28T18:02:00Z",
      },
      {
        sender: "user_010",
        message: "Section A, row 5. Great seats!",
        timestamp: "2026-07-28T18:03:00Z",
      },
      {
        sender: "user_001",
        message: "Perfect! Thanks for arranging this.",
        timestamp: "2026-07-28T18:04:00Z",
      },
      {
        sender: "user_010",
        message: "No problem! Can't wait for next month.",
        timestamp: "2026-07-28T18:05:00Z",
      },
    ],
  },

  // Additional conversation - Movie Club
  {
    id: "conversation_011",
    isGroup: true,
    name: "Movie Club",
    participants: ["user_001", "user_004", "user_007", "user_010", "user_015"],
    messages: [
      {
        sender: "user_015",
        message: "Who wants to watch the new Marvel movie this weekend?",
        timestamp: "2026-07-28T15:00:00Z",
      },
      {
        sender: "user_004",
        message: "I'm down! Which day?",
        timestamp: "2026-07-28T15:01:00Z",
      },
      {
        sender: "user_007",
        message: "Saturday works for me.",
        timestamp: "2026-07-28T15:02:00Z",
      },
      {
        sender: "user_010",
        message: "I can do Saturday too.",
        timestamp: "2026-07-28T15:03:00Z",
      },
      {
        sender: "user_001",
        message: "I'm in! What showtime?",
        timestamp: "2026-07-28T15:04:00Z",
      },
      {
        sender: "user_015",
        message: "How about 7pm showing?",
        timestamp: "2026-07-28T15:05:00Z",
      },
      {
        sender: "user_004",
        message: "Perfect. I'll book the tickets.",
        timestamp: "2026-07-28T15:06:00Z",
      },
    ],
  },

  // Private conversation - Lisa
  {
    id: "conversation_012",
    isGroup: false,
    name: null,
    participants: ["user_001", "user_011"],
    messages: [
      {
        sender: "user_011",
        message: "Can you help me with the React project?",
        timestamp: "2026-07-28T12:00:00Z",
      },
      {
        sender: "user_001",
        message: "Sure! What seems to be the issue?",
        timestamp: "2026-07-28T12:02:00Z",
      },
      {
        sender: "user_011",
        message: "The state management is getting messy.",
        timestamp: "2026-07-28T12:03:00Z",
      },
      {
        sender: "user_001",
        message: "I recommend using Redux or Context API.",
        timestamp: "2026-07-28T12:04:00Z",
      },
      {
        sender: "user_011",
        message: "I was thinking of Redux. Can we pair program?",
        timestamp: "2026-07-28T12:05:00Z",
      },
      {
        sender: "user_001",
        message: "Sure! Let's do it tomorrow afternoon.",
        timestamp: "2026-07-28T12:06:00Z",
      },
    ],
  },

  // Group conversation - Travel Group
  {
    id: "conversation_013",
    isGroup: true,
    name: "Travel Group",
    participants: ["user_001", "user_005", "user_009", "user_012", "user_014"],
    messages: [
      {
        sender: "user_014",
        message: "Where should we go for the summer trip?",
        timestamp: "2026-07-28T19:00:00Z",
      },
      {
        sender: "user_005",
        message: "What about Thailand?",
        timestamp: "2026-07-28T19:02:00Z",
      },
      {
        sender: "user_009",
        message: "I was thinking Bali!",
        timestamp: "2026-07-28T19:03:00Z",
      },
      {
        sender: "user_012",
        message: "Both are great. I'm down for either.",
        timestamp: "2026-07-28T19:04:00Z",
      },
      {
        sender: "user_001",
        message: "Let's do a poll. I'll set one up.",
        timestamp: "2026-07-28T19:05:00Z",
      },
      {
        sender: "user_014",
        message: "Budget? 2-3 weeks?",
        timestamp: "2026-07-28T19:06:00Z",
      },
      {
        sender: "user_005",
        message: "Let's plan for 10 days. That seems reasonable.",
        timestamp: "2026-07-28T19:07:00Z",
      },
      {
        sender: "user_001",
        message: "I'll research flight prices and share.",
        timestamp: "2026-07-28T19:08:00Z",
      },
    ],
  },

  // Private conversation - James
  {
    id: "conversation_014",
    isGroup: false,
    name: null,
    participants: ["user_001", "user_012"],
    messages: [
      {
        sender: "user_012",
        message: "Hey! Borrowed your book. It's amazing!",
        timestamp: "2026-07-28T08:00:00Z",
      },
      {
        sender: "user_001",
        message: "Glad you're enjoying it! Which chapter are you on?",
        timestamp: "2026-07-28T08:02:00Z",
      },
      {
        sender: "user_012",
        message: "Chapter 12. The plot is getting intense!",
        timestamp: "2026-07-28T08:03:00Z",
      },
      {
        sender: "user_001",
        message: "Just wait till you reach Chapter 15! 😱",
        timestamp: "2026-07-28T08:04:00Z",
      },
      {
        sender: "user_012",
        message: "I'll try to finish it by this week.",
        timestamp: "2026-07-28T08:05:00Z",
      },
    ],
  },

  // Group conversation - Book Club
  {
    id: "conversation_015",
    isGroup: true,
    name: "Book Club",
    participants: ["user_001", "user_009", "user_011", "user_012", "user_015"],
    messages: [
      {
        sender: "user_015",
        message: "Meeting this Sunday to discuss the book.",
        timestamp: "2026-07-28T17:00:00Z",
      },
      {
        sender: "user_009",
        message: "I finished it last night. Mind blown!",
        timestamp: "2026-07-28T17:01:00Z",
      },
      {
        sender: "user_011",
        message: "I'm almost done. Just 2 chapters left.",
        timestamp: "2026-07-28T17:02:00Z",
      },
      {
        sender: "user_012",
        message: "The ending was unexpected!",
        timestamp: "2026-07-28T17:03:00Z",
      },
      {
        sender: "user_001",
        message: "Agreed! Can't wait to hear everyone's thoughts.",
        timestamp: "2026-07-28T17:04:00Z",
      },
      {
        sender: "user_015",
        message: "Let's meet at the library cafe at 2pm.",
        timestamp: "2026-07-28T17:05:00Z",
      },
    ],
  },
];

export { users, conversations };

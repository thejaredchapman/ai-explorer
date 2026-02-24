// ── Concept Cards (Level 1) ──
export const conceptCards = [
  {
    id: 1,
    icon: "🔌",
    label: "What is an API?",
    side: "api",
    title: "Application Programming Interface",
    text: "An API is how an app talks to a service. A developer writes specific code to call endpoints like POST /payments or GET /users/{id} using SDKs or HTTP requests. Think of it as plumbing — the foundational pipes connecting software systems.",
    analogy: "Like a restaurant menu — you pick a specific dish (endpoint), place your order (request), and get exactly what's listed (response)."
  },
  {
    id: 2,
    icon: "🤖",
    label: "What is MCP?",
    side: "mcp",
    title: "Model Context Protocol",
    text: "MCP is an open standard for connecting AI applications to external systems. Like USB-C for AI — it provides a standardized way for AI models to discover and use tools, data sources, and workflows without custom integration code.",
    analogy: "Like a universal translator — an AI agent walks into any room and instantly understands what tools are available and how to use them."
  },
  {
    id: 3,
    icon: "📋",
    label: "API Contracts",
    side: "api",
    title: "Contract-Driven",
    text: "APIs use rigid contracts: specific endpoints, request shapes, and response formats defined upfront. The developer controls the request, the service controls the response. Everything is deterministic and predictable.",
    analogy: "Like a vending machine — you press B7, you always get the same snack. No surprises."
  },
  {
    id: 4,
    icon: "🔍",
    label: "MCP Discovery",
    side: "mcp",
    title: "Automatic Discovery",
    text: "MCP has discovery built-in. An AI agent connects to an MCP Hub (server), calls tools/list, and automatically receives a catalog of every available tool with descriptions and input schemas. No hardcoded endpoints needed.",
    analogy: "Like walking into a hardware store where every tool has a clear label explaining exactly what it does and how to use it."
  },
  {
    id: 5,
    icon: "👨‍💻",
    label: "Who Uses APIs?",
    side: "api",
    title: "Built by & for Developers",
    text: "APIs are for human developers. A developer reads documentation, writes integration code, handles errors, and maintains the connection. APIs answer: 'How do I call this service?'",
    analogy: "A developer is a skilled electrician manually wiring each connection."
  },
  {
    id: 6,
    icon: "🧠",
    label: "Who Uses MCP?",
    side: "mcp",
    title: "Built for AI Models & Agents",
    text: "MCP is designed for AI models and agent runtimes. The LLM itself discovers tools, understands schemas, calls functions correctly, and processes results. MCP answers: 'How does an agent safely use tools without custom glue code?'",
    analogy: "The AI is like a self-directed contractor who surveys the job site and picks the right tools automatically."
  },
  {
    id: 7,
    icon: "🏗️",
    label: "API Architecture",
    side: "api",
    title: "Client → Endpoint → Service",
    text: "API architecture is direct: your app makes HTTP requests to specific URL endpoints. You need to know the base URL, authentication method, request format, and handle the response parsing yourself. Each service has its own API.",
    analogy: "Like having a separate phone number for every business you want to contact."
  },
  {
    id: 8,
    icon: "🌐",
    label: "MCP Architecture",
    side: "mcp",
    title: "Host → Client → Server",
    text: "MCP uses a three-part architecture: an MCP Host (like Claude Desktop) creates MCP Clients that each connect to MCP Servers. Servers expose tools, resources, and prompts through a standardized JSON-RPC protocol. One host can connect to many servers simultaneously.",
    analogy: "Like a smart home hub — one central system that talks to all your devices using a standard protocol."
  },
];

// ── Sort Challenge Traits (Level 2) ──
export const sortTraits = [
  { text: "Control Request Shape", bucket: "api", detail: "Developers define exactly what the request looks like" },
  { text: "Model-Friendly Descriptions", bucket: "mcp", detail: "Tool descriptions are written for AI models to understand" },
  { text: "Deterministic Execution", bucket: "api", detail: "Same input always produces the same output path" },
  { text: "Built-In Tool Discovery", bucket: "mcp", detail: "Agents automatically discover available tools via tools/list" },
  { text: "Integrate with Code (SDK/HTTP)", bucket: "api", detail: "Developers write code using SDKs or raw HTTP calls" },
  { text: "Multi-Tool, Multi-Agent Workflows", bucket: "mcp", detail: "Multiple agents can use multiple tools through one protocol" },
  { text: "Service Controls Response Shape", bucket: "api", detail: "The API service decides the response format" },
  { text: "Emphasis on Context + Tool Use", bucket: "mcp", detail: "Designed around providing context to language models" },
  { text: "Fixed Endpoint URLs", bucket: "api", detail: "Each operation has a specific URL like /api/v1/users" },
  { text: "Standardized Tooling for AI", bucket: "mcp", detail: "One protocol to connect AI to any external system" },
  { text: "REST / GraphQL / gRPC", bucket: "api", detail: "Common API paradigms with specific design patterns" },
  { text: "JSON-RPC 2.0 Protocol", bucket: "mcp", detail: "MCP uses JSON-RPC 2.0 for all client-server communication" },
];

// ── Flow Steps (Level 3) ──
export const apiFlowSteps = [
  { label: "Developer", icon: "👨‍💻", desc: "A human developer starts the process" },
  { label: "Code", icon: "💻", desc: "Writes integration code with SDK/HTTP" },
  { label: "Endpoint", icon: "🎯", desc: "Calls a specific URL endpoint" },
  { label: "Service", icon: "⚙️", desc: "The service processes and responds" },
];

export const mcpFlowSteps = [
  { label: "LLM", icon: "🧠", desc: "An AI model initiates the process" },
  { label: "MCP Hub", icon: "🌐", desc: "Connects to an MCP Server" },
  { label: "Discover & Use", icon: "🔍", desc: "Discovers tools, reads schemas, calls them" },
  { label: "Tools", icon: "🔧", desc: "External tools execute and return results" },
];

// ── Scenario Matching (Level 4) ──
export const scenarios = [
  {
    id: 1,
    scenario: "A mobile banking app needs to process a credit card payment through Stripe.",
    answer: "api",
    explanation: "This is a classic API use case. The developer integrates the Stripe SDK, calls POST /v1/charges with specific parameters, and handles the deterministic response. It's app-to-service communication."
  },
  {
    id: 2,
    scenario: "An AI coding assistant needs to read files, search code, and run terminal commands in your project.",
    answer: "mcp",
    explanation: "This is MCP territory. The AI agent connects to an MCP server (like a filesystem server), discovers available tools like read_file and run_command, and uses them as needed — no hardcoded integrations."
  },
  {
    id: 3,
    scenario: "A web application fetches a list of products from a database to display on a storefront.",
    answer: "api",
    explanation: "The frontend calls GET /api/products with specific query parameters. This is deterministic, developer-written integration code — classic API usage."
  },
  {
    id: 4,
    scenario: "Claude Desktop needs to access your Google Calendar, Slack messages, and GitHub issues simultaneously to plan your day.",
    answer: "mcp",
    explanation: "The AI host (Claude Desktop) connects to multiple MCP servers (Google Calendar, Slack, GitHub), discovers what tools and data each provides, and orchestrates across all of them with one standard protocol."
  },
  {
    id: 5,
    scenario: "A microservice sends an event to a message queue when a user signs up.",
    answer: "api",
    explanation: "This is service-to-service communication using a message queue API. The developer writes specific code to publish events in a defined format — standard API integration."
  },
  {
    id: 6,
    scenario: "An AI agent needs to analyze Sentry error logs and then create a fix in the codebase — but you haven't told it which tools exist.",
    answer: "mcp",
    explanation: "The agent discovers available MCP servers (Sentry, filesystem), learns their capabilities through tools/list, then autonomously chains tool calls. The key is: the agent discovers what's available rather than having it hardcoded."
  },
  {
    id: 7,
    scenario: "A weather widget on a website fetches the current temperature for the user's location.",
    answer: "api",
    explanation: "The widget calls a weather API endpoint like GET /weather?lat=37&lon=-122. It's a specific, coded integration with known endpoints and response formats."
  },
  {
    id: 8,
    scenario: "An enterprise chatbot connects to multiple internal databases across different departments so employees can ask questions about any data.",
    answer: "mcp",
    explanation: "MCP shines here — instead of building separate integrations for each database, each department runs an MCP server. The chatbot's AI discovers all available data sources and queries them through the standard protocol."
  },
];

// ── Architecture Interactive (Level 5) ──
export const apiArchitecture = {
  title: "API Architecture",
  nodes: [
    { id: "app", label: "Your App", icon: "📱", x: 10, y: 45, desc: "The application that needs data or functionality from an external service." },
    { id: "sdk", label: "SDK / HTTP", icon: "📦", x: 30, y: 45, desc: "You use an SDK library or raw HTTP requests (fetch, axios) to communicate." },
    { id: "endpoint", label: "POST /pay", icon: "🎯", x: 55, y: 25, desc: "A specific URL endpoint like POST /v1/payments. Each operation has its own URL." },
    { id: "endpoint2", label: "GET /users", icon: "🎯", x: 55, y: 65, desc: "Another endpoint like GET /v1/users/{id}. You must know each endpoint in advance." },
    { id: "service", label: "Service", icon: "⚙️", x: 80, y: 45, desc: "The backend service that processes your request and sends a response. It controls the response shape." },
  ],
  connections: [
    { from: "app", to: "sdk" },
    { from: "sdk", to: "endpoint" },
    { from: "sdk", to: "endpoint2" },
    { from: "endpoint", to: "service" },
    { from: "endpoint2", to: "service" },
  ]
};

export const mcpArchitecture = {
  title: "MCP Architecture",
  nodes: [
    { id: "host", label: "MCP Host", icon: "🏠", x: 5, y: 45, desc: "An AI application like Claude Desktop or VS Code that orchestrates MCP clients." },
    { id: "client1", label: "MCP Client", icon: "🔗", x: 28, y: 25, desc: "A client instance created by the host. Each client connects to one MCP server." },
    { id: "client2", label: "MCP Client", icon: "🔗", x: 28, y: 65, desc: "Another client instance. The host can create as many as needed." },
    { id: "server1", label: "Files Server", icon: "📁", x: 55, y: 15, desc: "An MCP server exposing filesystem tools. The client discovers read_file, write_file, etc. via tools/list." },
    { id: "server2", label: "GitHub Server", icon: "🐙", x: 55, y: 45, desc: "An MCP server exposing GitHub tools. The client discovers create_issue, list_prs, etc. automatically." },
    { id: "server3", label: "DB Server", icon: "🗄️", x: 55, y: 75, desc: "An MCP server exposing database tools. The client discovers query, list_tables, etc." },
    { id: "tools", label: "Tools / Resources", icon: "🔧", x: 82, y: 45, desc: "Each server exposes Tools (actions), Resources (data), and Prompts (templates) — all discoverable." },
  ],
  connections: [
    { from: "host", to: "client1" },
    { from: "host", to: "client2" },
    { from: "client1", to: "server1" },
    { from: "client1", to: "server2" },
    { from: "client2", to: "server3" },
    { from: "server1", to: "tools" },
    { from: "server2", to: "tools" },
    { from: "server3", to: "tools" },
  ]
};

// ── Protocol Deep Dive (Level 6) - Interactive Simulation ──
export const protocolSteps = {
  api: [
    {
      step: 1,
      title: "Read Documentation",
      actor: "Developer",
      desc: "Developer reads the API docs to learn endpoints, auth methods, request/response formats.",
      code: `// Developer reads docs and learns:\n// Base URL: https://api.stripe.com\n// Auth: Bearer token\n// Endpoint: POST /v1/charges`,
      visual: "📖 → 👨‍💻"
    },
    {
      step: 2,
      title: "Write Integration Code",
      actor: "Developer",
      desc: "Developer writes code to call the specific endpoint with the correct parameters.",
      code: `const response = await fetch(\n  'https://api.stripe.com/v1/charges',\n  {\n    method: 'POST',\n    headers: {\n      'Authorization': 'Bearer sk_test_...',\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({\n      amount: 2000,\n      currency: 'usd'\n    })\n  }\n);`,
      visual: "👨‍💻 → 💻"
    },
    {
      step: 3,
      title: "Send Request",
      actor: "App",
      desc: "The application sends the HTTP request to the exact endpoint URL.",
      code: `// HTTP Request:\n// POST https://api.stripe.com/v1/charges\n// Headers: Authorization, Content-Type\n// Body: { amount: 2000, currency: "usd" }`,
      visual: "💻 → 🌐 → ⚙️"
    },
    {
      step: 4,
      title: "Receive Response",
      actor: "Service",
      desc: "The service processes the request and returns a structured response.",
      code: `// HTTP Response (200 OK):\n{\n  "id": "ch_1abc",\n  "amount": 2000,\n  "currency": "usd",\n  "status": "succeeded"\n}`,
      visual: "⚙️ → 💻 ✅"
    }
  ],
  mcp: [
    {
      step: 1,
      title: "Initialize Connection",
      actor: "MCP Host",
      desc: "The AI application connects to an MCP server and negotiates capabilities through a handshake.",
      code: `// Client sends:\n{\n  "method": "initialize",\n  "params": {\n    "protocolVersion": "2025-06-18",\n    "capabilities": { "tools": {} },\n    "clientInfo": {\n      "name": "claude-desktop"\n    }\n  }\n}`,
      visual: "🏠 → 🤝 → 🌐"
    },
    {
      step: 2,
      title: "Discover Tools",
      actor: "MCP Client",
      desc: "The client asks the server what tools are available. No hardcoded knowledge needed!",
      code: `// Client sends: { "method": "tools/list" }\n// Server responds:\n{\n  "tools": [\n    {\n      "name": "get_weather",\n      "description": "Get weather for a location",\n      "inputSchema": {\n        "type": "object",\n        "properties": {\n          "location": { "type": "string" }\n        }\n      }\n    }\n  ]\n}`,
      visual: "🔗 → 📋 → 🔧🔧🔧"
    },
    {
      step: 3,
      title: "AI Selects & Calls Tool",
      actor: "LLM",
      desc: "The AI model reads the tool descriptions, decides which to use based on context, and makes the call.",
      code: `// LLM decides to use get_weather\n// Client sends:\n{\n  "method": "tools/call",\n  "params": {\n    "name": "get_weather",\n    "arguments": {\n      "location": "San Francisco"\n    }\n  }\n}`,
      visual: "🧠 → 🎯 → 🔧"
    },
    {
      step: 4,
      title: "Receive & Process Results",
      actor: "MCP Server",
      desc: "The server executes the tool and returns structured content. The AI integrates the result into its response.",
      code: `// Server responds:\n{\n  "content": [\n    {\n      "type": "text",\n      "text": "Weather in San Francisco:\\n68°F, partly cloudy"\n    }\n  ]\n}\n// LLM uses this in its response to the user`,
      visual: "🔧 → 📦 → 🧠 → 💬"
    }
  ]
};

// ── Boss Quiz (Level 7) ──
export const quizQuestions = [
  {
    q: "Which analogy best describes what MCP is?",
    options: [
      "USB-C for AI — a universal standard connector",
      "A faster version of REST APIs",
      "A database query language",
      "A machine learning training framework"
    ],
    correct: 0,
    explanation: "Anthropic describes MCP as 'USB-C for AI' — just as USB-C provides a standardized way to connect devices, MCP provides a standardized way to connect AI applications to external tools and data sources."
  },
  {
    q: "An API answers which fundamental question?",
    options: [
      "How does an agent discover tools?",
      "How do I call this service?",
      "How do models communicate with each other?",
      "How do I train a model?"
    ],
    correct: 1,
    explanation: "APIs answer 'How do I call this service?' They provide endpoints and contracts for developers to integrate with services programmatically."
  },
  {
    q: "What protocol does MCP use for client-server communication?",
    options: [
      "REST over HTTP",
      "GraphQL",
      "JSON-RPC 2.0",
      "gRPC with Protocol Buffers"
    ],
    correct: 2,
    explanation: "MCP uses JSON-RPC 2.0 as its underlying protocol for all communication between MCP clients and servers, including tool discovery, execution, and notifications."
  },
  {
    q: "What are the three core primitives that MCP servers expose?",
    options: [
      "GET, POST, PUT",
      "Tools, Resources, Prompts",
      "Request, Response, Error",
      "Input, Output, Schema"
    ],
    correct: 1,
    explanation: "MCP servers expose three core primitives: Tools (executable functions), Resources (contextual data like files or DB schemas), and Prompts (reusable interaction templates)."
  },
  {
    q: "How does an AI agent learn what tools are available in MCP?",
    options: [
      "A developer hardcodes the tool list",
      "It reads API documentation",
      "It calls tools/list to auto-discover available tools",
      "It guesses based on the server name"
    ],
    correct: 2,
    explanation: "In MCP, agents call tools/list on the server to automatically discover all available tools, their descriptions, and input schemas. This is built-in discovery — no hardcoding needed."
  },
  {
    q: "Which is NOT a core trait of traditional APIs?",
    options: [
      "Deterministic execution",
      "Developer writes integration code",
      "Automatic tool discovery",
      "Fixed endpoint URLs"
    ],
    correct: 2,
    explanation: "Automatic tool discovery is a core MCP feature, not an API feature. With APIs, developers must read documentation and manually code integrations to specific endpoints."
  },
  {
    q: "What MCP transport is used for local processes on the same machine?",
    options: [
      "WebSocket",
      "Stdio (standard input/output)",
      "HTTP/2",
      "TCP sockets"
    ],
    correct: 1,
    explanation: "MCP supports Stdio transport for local process communication (no network overhead) and Streamable HTTP transport for remote servers. Stdio is optimal for local MCP servers."
  },
  {
    q: "What is the role of an MCP Host?",
    options: [
      "It stores the database",
      "It's the AI application that orchestrates MCP clients",
      "It serves API endpoints",
      "It trains the language model"
    ],
    correct: 1,
    explanation: "An MCP Host is the AI application (like Claude Desktop or VS Code) that coordinates and manages one or more MCP clients. Each client connects to an MCP server."
  },
  {
    q: "In a real-world scenario, why might you choose MCP over building separate API integrations?",
    options: [
      "APIs are deprecated",
      "MCP is faster than HTTP",
      "One standard protocol replaces N custom integrations",
      "MCP doesn't require a network"
    ],
    correct: 2,
    explanation: "MCP's main advantage is replacing N fragmented, custom API integrations with a single standardized protocol. Each data source runs an MCP server, and any AI app can connect to all of them using the same protocol."
  },
  {
    q: "Which of these is a real-world MCP use case mentioned by Anthropic?",
    options: [
      "Training a neural network on GPU clusters",
      "Claude Code generating a web app from a Figma design",
      "Compiling C++ code to WebAssembly",
      "Running SQL database migrations"
    ],
    correct: 1,
    explanation: "Anthropic highlights that Claude Code can generate an entire web app using a Figma design through MCP — the AI connects to a Figma MCP server, discovers the design tools, and uses them to build the application."
  },
];

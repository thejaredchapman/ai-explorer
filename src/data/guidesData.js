// ═══════════════════════════════════════
// Quick Start & How-To Guides Data
// Organized by Provider
// ═══════════════════════════════════════

export const providers = [
  { id: 'all', label: 'All Providers', icon: '📦', color: '#818cf8' },
  { id: 'anthropic', label: 'Anthropic', icon: '🟠', color: '#d97706', description: 'Claude models — excels at reasoning, coding, and long-context tasks.' },
  { id: 'openai', label: 'OpenAI', icon: '🟢', color: '#10a37f', description: 'GPT models — the most widely adopted LLM platform with a rich ecosystem.' },
  { id: 'google', label: 'Google Gemini', icon: '🔵', color: '#4285f4', description: 'Gemini models — strong multimodal capabilities with deep Google integration.' },
  { id: 'llama', label: 'Llama (Meta)', icon: '🦙', color: '#7c3aed', description: 'Open-source models you can run locally — full control, no API costs.' },
];

export const categories = [
  { id: 'beginner', label: 'Beginner', color: '#22c55e' },
  { id: 'intermediate', label: 'Intermediate', color: '#f59e0b' },
  { id: 'advanced', label: 'Advanced', color: '#ef4444' },
];

export const guidesData = {
  quickStart: {
    title: 'Quick Start',
    description: 'Get up and running in minutes. Clone, install, and run your first AI-powered script.',
    steps: [
      {
        label: 'Clone & navigate',
        code: 'git clone <your-repo-url>\ncd mcp_api/guides',
      },
      {
        label: 'Install dependencies',
        code: 'pip install -r requirements.txt',
      },
      {
        label: 'Set up API keys',
        code: 'cp .env.example .env\n# Edit .env and add your API keys:\n# ANTHROPIC_API_KEY=sk-ant-...\n# OPENAI_API_KEY=sk-...\n# GOOGLE_API_KEY=AIza...',
      },
      {
        label: 'Run your first guide',
        code: 'python anthropic_01_chatbot.py',
      },
    ],
  },

  guides: [
    // ═══════════════════════════════════════
    // ANTHROPIC (Claude) GUIDES
    // ═══════════════════════════════════════
    {
      id: 'anthropic-chatbot',
      number: 'A1',
      title: 'Build a Chatbot with Claude',
      file: 'anthropic_01_chatbot.py',
      category: 'beginner',
      provider: 'anthropic',
      model: 'Claude Sonnet 4',
      icon: '💬',
      color: '#d97706',
      description: 'Create a conversational chatbot with memory using the Anthropic SDK. Learn how Claude handles multi-turn conversations with system prompts and message history.',
      concepts: ['Anthropic SDK setup', 'System prompts', 'Conversation memory', 'Message formatting'],
      codePreview: `import anthropic

client = anthropic.Anthropic()
messages = []

while True:
    user_input = input("You: ")
    messages.append({"role": "user", "content": user_input})

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        system="You are a helpful coding assistant.",
        messages=messages,
    )

    assistant_msg = response.content[0].text
    messages.append({"role": "assistant", "content": assistant_msg})
    print(f"Claude: {assistant_msg}")`,
      runCommand: 'python anthropic_01_chatbot.py',
    },
    {
      id: 'anthropic-streaming',
      number: 'A2',
      title: 'Streaming Responses with Claude',
      file: 'anthropic_02_streaming.py',
      category: 'beginner',
      provider: 'anthropic',
      model: 'Claude Sonnet 4',
      icon: '⚡',
      color: '#d97706',
      description: 'Stream Claude responses token-by-token for real-time output. Reduces perceived latency and provides a ChatGPT-like typing experience.',
      concepts: ['Token streaming', 'Event handling', 'Perceived latency', 'Stream processing'],
      codePreview: `import anthropic

client = anthropic.Anthropic()

# Stream response token by token
with client.messages.stream(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Explain quantum computing"}],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)`,
      runCommand: 'python anthropic_02_streaming.py',
    },
    {
      id: 'anthropic-tools',
      number: 'A3',
      title: 'Tool Use & Function Calling with Claude',
      file: 'anthropic_03_tools.py',
      category: 'intermediate',
      provider: 'anthropic',
      model: 'Claude Sonnet 4',
      icon: '🔧',
      color: '#d97706',
      description: 'Give Claude the ability to call functions — web search, calculator, database lookups. Implements the full tool-use loop: Claude decides which tool to call, you execute it, and return results.',
      concepts: ['Tool definitions', 'Tool use loop', 'JSON schema', 'Function execution'],
      codePreview: `tools = [{
    "name": "get_weather",
    "description": "Get current weather for a city",
    "input_schema": {
        "type": "object",
        "properties": {
            "city": {"type": "string", "description": "City name"}
        },
        "required": ["city"]
    }
}]

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "What's the weather in Tokyo?"}],
)

# Check if Claude wants to use a tool
for block in response.content:
    if block.type == "tool_use":
        result = execute_tool(block.name, block.input)
        # Send result back to Claude for final answer`,
      runCommand: 'python anthropic_03_tools.py',
    },
    {
      id: 'anthropic-rag',
      number: 'A4',
      title: 'RAG: Document Q&A with Claude',
      file: 'anthropic_04_rag.py',
      category: 'intermediate',
      provider: 'anthropic',
      model: 'Claude Sonnet 4',
      icon: '📚',
      color: '#d97706',
      description: 'Build a Retrieval-Augmented Generation system with Claude. Split documents, embed them, store in a vector database, and retrieve relevant context for accurate answers.',
      concepts: ['Document chunking', 'Embeddings', 'Vector stores', 'Context injection', 'ChromaDB'],
      codePreview: `from langchain_anthropic import ChatAnthropic
from langchain_community.vectorstores import Chroma

# Split documents into chunks
chunks = text_splitter.split_documents(documents)

# Embed and store in vector database
vectorstore = Chroma.from_documents(chunks, embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# RAG chain: retrieve context -> augment prompt -> generate
llm = ChatAnthropic(model="claude-sonnet-4-20250514")
rag_chain = (
    {"context": retriever | format_docs,
     "question": RunnablePassthrough()}
    | rag_prompt | llm | StrOutputParser()
)`,
      runCommand: 'python anthropic_04_rag.py',
    },
    {
      id: 'anthropic-agents',
      number: 'A5',
      title: 'Building AI Agents with Claude',
      file: 'anthropic_05_agents.py',
      category: 'advanced',
      provider: 'anthropic',
      model: 'Claude Sonnet 4',
      icon: '🤖',
      color: '#d97706',
      description: 'Build an autonomous agent that plans, uses tools, and iterates to complete tasks. Uses the Anthropic Agent SDK for multi-step reasoning with web search and code execution.',
      concepts: ['Agent loops', 'Planning', 'Multi-step reasoning', 'Anthropic Agent SDK'],
      codePreview: `import anthropic

client = anthropic.Anthropic()
tools = [search_tool, calculator_tool, code_runner_tool]

# Agent loop: Claude decides actions until task is complete
messages = [{"role": "user", "content": "Research AI trends and summarize"}]

while True:
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=4096,
        tools=tools,
        messages=messages,
    )
    if response.stop_reason == "end_turn":
        break  # Task complete
    # Execute tool calls and continue the loop
    messages = handle_tool_calls(response, messages)`,
      runCommand: 'python anthropic_05_agents.py',
    },
    {
      id: 'anthropic-mcp',
      number: 'A6',
      title: 'Build an MCP Server for Claude',
      file: 'anthropic_06_mcp.py',
      category: 'advanced',
      provider: 'anthropic',
      model: 'Any Claude model',
      icon: '🔌',
      color: '#d97706',
      description: 'Create a Model Context Protocol server that exposes custom tools any MCP-compatible AI client can discover and use. The open standard for AI-tool interoperability.',
      concepts: ['MCP protocol', 'Tool registration', 'Server setup', 'Resource exposure'],
      codePreview: `from mcp.server import Server
from mcp.types import Tool

server = Server("my-mcp-server")

@server.tool()
async def search_database(query: str) -> str:
    """Search the knowledge base for information."""
    results = db.search(query)
    return format_results(results)

@server.tool()
async def create_ticket(title: str, body: str) -> str:
    """Create a support ticket."""
    ticket = tickets.create(title=title, body=body)
    return f"Created ticket #{ticket.id}"

# Any MCP client (Claude Desktop, Claude Code) can now
# discover and use these tools automatically
server.run()`,
      runCommand: 'python anthropic_06_mcp.py',
    },

    // ═══════════════════════════════════════
    // OPENAI (GPT) GUIDES
    // ═══════════════════════════════════════
    {
      id: 'openai-chatbot',
      number: 'O1',
      title: 'Build a Chatbot with GPT',
      file: 'openai_01_chatbot.py',
      category: 'beginner',
      provider: 'openai',
      model: 'GPT-4o',
      icon: '💬',
      color: '#10a37f',
      description: 'Create a conversational chatbot using the OpenAI SDK. Learn the Chat Completions API, message roles, and how to maintain conversation history.',
      concepts: ['OpenAI SDK setup', 'Chat Completions API', 'Message roles', 'Conversation history'],
      codePreview: `from openai import OpenAI

client = OpenAI()
messages = [{"role": "system", "content": "You are a helpful assistant."}]

while True:
    user_input = input("You: ")
    messages.append({"role": "user", "content": user_input})

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
    )

    reply = response.choices[0].message.content
    messages.append({"role": "assistant", "content": reply})
    print(f"GPT: {reply}")`,
      runCommand: 'python openai_01_chatbot.py',
    },
    {
      id: 'openai-functions',
      number: 'O2',
      title: 'Function Calling with GPT',
      file: 'openai_02_functions.py',
      category: 'intermediate',
      provider: 'openai',
      model: 'GPT-4o',
      icon: '🔧',
      color: '#10a37f',
      description: 'Give GPT the ability to call your functions. Define tool schemas, let the model decide when to call them, execute locally, and return results for the final answer.',
      concepts: ['Function definitions', 'Tool choice', 'Parallel tool calls', 'JSON mode'],
      codePreview: `tools = [{
    "type": "function",
    "function": {
        "name": "get_stock_price",
        "description": "Get the current stock price",
        "parameters": {
            "type": "object",
            "properties": {
                "symbol": {"type": "string", "description": "Stock ticker"}
            },
            "required": ["symbol"]
        }
    }
}]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    tools=tools,
    tool_choice="auto",  # GPT decides when to call tools
)

# Handle tool calls in the response
if response.choices[0].message.tool_calls:
    for call in response.choices[0].message.tool_calls:
        result = execute_function(call.function.name, call.function.arguments)`,
      runCommand: 'python openai_02_functions.py',
    },
    {
      id: 'openai-rag',
      number: 'O3',
      title: 'RAG with OpenAI Embeddings',
      file: 'openai_03_rag.py',
      category: 'intermediate',
      provider: 'openai',
      model: 'GPT-4o + text-embedding-3-small',
      icon: '📚',
      color: '#10a37f',
      description: 'Build a document Q&A system using OpenAI embeddings and GPT-4o. Uses text-embedding-3-small for fast, affordable embeddings with strong semantic search quality.',
      concepts: ['OpenAI embeddings', 'text-embedding-3-small', 'Vector search', 'Context window management'],
      codePreview: `from openai import OpenAI

client = OpenAI()

# Create embeddings for your documents
response = client.embeddings.create(
    model="text-embedding-3-small",
    input=["Document chunk 1", "Document chunk 2"],
)
embeddings = [item.embedding for item in response.data]

# Store in vector DB, retrieve relevant chunks
relevant_chunks = vector_search(query_embedding, stored_embeddings)

# Generate answer with retrieved context
answer = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": f"Context: {relevant_chunks}"},
        {"role": "user", "content": user_question},
    ],
)`,
      runCommand: 'python openai_03_rag.py',
    },
    {
      id: 'openai-assistants',
      number: 'O4',
      title: 'OpenAI Assistants API',
      file: 'openai_04_assistants.py',
      category: 'intermediate',
      provider: 'openai',
      model: 'GPT-4o',
      icon: '🧑‍💼',
      color: '#10a37f',
      description: 'Use the Assistants API for stateful, multi-turn conversations with built-in tools. OpenAI manages the thread history, file retrieval, and code execution for you.',
      concepts: ['Assistants API', 'Threads & Runs', 'File search', 'Code interpreter'],
      codePreview: `from openai import OpenAI

client = OpenAI()

# Create an assistant with tools
assistant = client.beta.assistants.create(
    name="Data Analyst",
    instructions="You analyze data and create visualizations.",
    model="gpt-4o",
    tools=[
        {"type": "code_interpreter"},
        {"type": "file_search"},
    ],
)

# Create a thread and send a message
thread = client.beta.threads.create()
client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="Analyze the sales data and find top trends",
)

# Run the assistant — it handles tool calls automatically
run = client.beta.threads.runs.create_and_poll(
    thread_id=thread.id,
    assistant_id=assistant.id,
)`,
      runCommand: 'python openai_04_assistants.py',
    },
    {
      id: 'openai-structured',
      number: 'O5',
      title: 'Structured Output with GPT',
      file: 'openai_05_structured.py',
      category: 'intermediate',
      provider: 'openai',
      model: 'GPT-4o',
      icon: '📋',
      color: '#10a37f',
      description: 'Extract structured JSON from natural language using GPT\'s native structured output mode. Guarantees valid JSON matching your schema every time.',
      concepts: ['Structured outputs', 'JSON mode', 'Pydantic integration', 'Schema enforcement'],
      codePreview: `from pydantic import BaseModel
from openai import OpenAI

client = OpenAI()

class MovieReview(BaseModel):
    title: str
    rating: float
    summary: str
    pros: list[str]
    cons: list[str]

response = client.beta.chat.completions.parse(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": "Review the movie Inception"},
    ],
    response_format=MovieReview,
)

review = response.choices[0].message.parsed
print(f"{review.title}: {review.rating}/10")`,
      runCommand: 'python openai_05_structured.py',
    },
    {
      id: 'openai-vision',
      number: 'O6',
      title: 'Vision & Image Analysis with GPT-4o',
      file: 'openai_06_vision.py',
      category: 'advanced',
      provider: 'openai',
      model: 'GPT-4o',
      icon: '👁️',
      color: '#10a37f',
      description: 'Analyze images, extract text from photos, compare visuals, and answer questions about what GPT-4o sees. Supports URLs and base64-encoded images.',
      concepts: ['Vision API', 'Image encoding', 'Visual Q&A', 'Multi-image comparison'],
      codePreview: `import base64
from openai import OpenAI

client = OpenAI()

# Encode image
with open("photo.jpg", "rb") as f:
    image_b64 = base64.b64encode(f.read()).decode()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "What's in this image?"},
            {"type": "image_url", "image_url": {
                "url": f"data:image/jpeg;base64,{image_b64}"
            }},
        ],
    }],
)
print(response.choices[0].message.content)`,
      runCommand: 'python openai_06_vision.py',
    },

    // ═══════════════════════════════════════
    // GOOGLE (Gemini) GUIDES
    // ═══════════════════════════════════════
    {
      id: 'gemini-chatbot',
      number: 'G1',
      title: 'Build a Chatbot with Gemini',
      file: 'gemini_01_chatbot.py',
      category: 'beginner',
      provider: 'google',
      model: 'Gemini 2.0 Flash',
      icon: '💬',
      color: '#4285f4',
      description: 'Create a conversational chatbot using the Google GenAI SDK. Gemini\'s chat interface manages conversation history automatically with a simple API.',
      concepts: ['Google GenAI SDK', 'Chat sessions', 'Multi-turn conversations', 'Safety settings'],
      codePreview: `import google.generativeai as genai

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")

# Start a chat session (history is managed automatically)
chat = model.start_chat(history=[])

while True:
    user_input = input("You: ")
    response = chat.send_message(user_input)
    print(f"Gemini: {response.text}")

    # Access full conversation history
    # chat.history contains all messages`,
      runCommand: 'python gemini_01_chatbot.py',
    },
    {
      id: 'gemini-multimodal',
      number: 'G2',
      title: 'Multimodal Input with Gemini',
      file: 'gemini_02_multimodal.py',
      category: 'intermediate',
      provider: 'google',
      model: 'Gemini 2.0 Flash',
      icon: '🖼️',
      color: '#4285f4',
      description: 'Send images, PDFs, audio, and video to Gemini for analysis. Gemini natively handles multiple modalities in a single request — no separate vision API needed.',
      concepts: ['Multimodal inputs', 'Image analysis', 'PDF processing', 'Audio transcription'],
      codePreview: `import google.generativeai as genai
from pathlib import Path

model = genai.GenerativeModel("gemini-2.0-flash")

# Analyze an image
image = genai.upload_file("photo.jpg")
response = model.generate_content([
    "Describe what you see in detail",
    image,
])
print(response.text)

# Process a PDF document
pdf = genai.upload_file("report.pdf")
response = model.generate_content([
    "Summarize the key findings in this report",
    pdf,
])`,
      runCommand: 'python gemini_02_multimodal.py',
    },
    {
      id: 'gemini-imagegen',
      number: 'G3',
      title: 'Image Generation with Gemini',
      file: 'gemini_03_imagegen.py',
      category: 'intermediate',
      provider: 'google',
      model: 'Gemini 2.0 Flash / Imagen',
      icon: '🎨',
      color: '#4285f4',
      description: 'Generate images from text descriptions using Gemini and Imagen. Includes prompt engineering tips for photorealistic, illustration, and artistic styles.',
      concepts: ['Text-to-image', 'Imagen model', 'Prompt engineering for images', 'Style control'],
      codePreview: `import google.generativeai as genai
from pathlib import Path

model = genai.GenerativeModel("gemini-2.0-flash-exp")

response = model.generate_content(
    "Generate an image: A futuristic cityscape at sunset "
    "with flying vehicles, cyberpunk style",
    generation_config=genai.GenerationConfig(
        response_mime_type="image/png",
    ),
)

# Save generated image
for part in response.candidates[0].content.parts:
    if hasattr(part, "inline_data"):
        Path("cityscape.png").write_bytes(part.inline_data.data)
        print("Image saved to cityscape.png")`,
      runCommand: 'python gemini_03_imagegen.py',
    },
    {
      id: 'gemini-functions',
      number: 'G4',
      title: 'Function Calling with Gemini',
      file: 'gemini_04_functions.py',
      category: 'intermediate',
      provider: 'google',
      model: 'Gemini 2.0 Flash',
      icon: '🔧',
      color: '#4285f4',
      description: 'Give Gemini the ability to call your functions. Define callable tools, let Gemini decide when to use them, and handle the execution loop.',
      concepts: ['Function declarations', 'Automatic function calling', 'Tool config', 'Grounding'],
      codePreview: `import google.generativeai as genai

def get_weather(city: str) -> dict:
    """Get weather for a city."""
    return {"temp": 72, "condition": "sunny", "city": city}

model = genai.GenerativeModel(
    "gemini-2.0-flash",
    tools=[get_weather],  # Pass Python functions directly
)

chat = model.start_chat(
    enable_automatic_function_calling=True,
)

# Gemini calls get_weather automatically when needed
response = chat.send_message("What's the weather in San Francisco?")
print(response.text)  # "It's 72F and sunny in San Francisco"`,
      runCommand: 'python gemini_04_functions.py',
    },
    {
      id: 'gemini-embeddings',
      number: 'G5',
      title: 'Embeddings & Search with Gemini',
      file: 'gemini_05_embeddings.py',
      category: 'intermediate',
      provider: 'google',
      model: 'text-embedding-004',
      icon: '📐',
      color: '#4285f4',
      description: 'Create text embeddings with Google\'s embedding model for semantic search, clustering, and classification. Build a searchable knowledge base with cosine similarity.',
      concepts: ['Google embeddings API', 'Semantic search', 'Cosine similarity', 'Document retrieval'],
      codePreview: `import google.generativeai as genai
import numpy as np

# Create embeddings
result = genai.embed_content(
    model="models/text-embedding-004",
    content=["Machine learning is powerful",
             "Deep learning uses neural networks"],
    task_type="retrieval_document",
)

# Search with query embedding
query_emb = genai.embed_content(
    model="models/text-embedding-004",
    content="How do neural networks work?",
    task_type="retrieval_query",
)

# Compute cosine similarity to find relevant documents
similarities = np.dot(result["embedding"], query_emb["embedding"])`,
      runCommand: 'python gemini_05_embeddings.py',
    },
    {
      id: 'gemini-grounding',
      number: 'G6',
      title: 'Grounded Search with Gemini',
      file: 'gemini_06_grounding.py',
      category: 'advanced',
      provider: 'google',
      model: 'Gemini 2.0 Flash',
      icon: '🔍',
      color: '#4285f4',
      description: 'Use Gemini with Google Search grounding for up-to-date, factual answers. Gemini automatically searches the web and cites sources in its responses.',
      concepts: ['Google Search grounding', 'Source citations', 'Factual accuracy', 'Real-time info'],
      codePreview: `import google.generativeai as genai

model = genai.GenerativeModel("gemini-2.0-flash")

# Enable Google Search grounding
response = model.generate_content(
    "What are the latest developments in AI this week?",
    tools="google_search_retrieval",
)

print(response.text)

# Access grounding metadata and sources
for chunk in response.candidates[0].grounding_metadata.chunks:
    print(f"Source: {chunk.web.uri}")
    print(f"Title: {chunk.web.title}")`,
      runCommand: 'python gemini_06_grounding.py',
    },

    // ═══════════════════════════════════════
    // LLAMA (Meta) GUIDES — Run Locally
    // ═══════════════════════════════════════
    {
      id: 'llama-setup',
      number: 'L1',
      title: 'Run Llama Locally with Ollama',
      file: 'llama_01_setup.py',
      category: 'beginner',
      provider: 'llama',
      model: 'Llama 3.3 70B',
      icon: '🦙',
      color: '#7c3aed',
      description: 'Set up and run Meta\'s Llama models on your own machine using Ollama. No API keys, no cloud costs — full privacy and control. Works on Mac, Linux, and Windows.',
      concepts: ['Ollama setup', 'Local model running', 'Model pulling', 'API compatibility'],
      codePreview: `# First, install Ollama: https://ollama.com
# Then pull a model:
# ollama pull llama3.3

import requests

# Ollama exposes an OpenAI-compatible API locally
response = requests.post(
    "http://localhost:11434/api/chat",
    json={
        "model": "llama3.3",
        "messages": [
            {"role": "user", "content": "Explain transformers"}
        ],
        "stream": False,
    },
)

print(response.json()["message"]["content"])`,
      runCommand: 'ollama pull llama3.3 && python llama_01_setup.py',
    },
    {
      id: 'llama-openai-compat',
      number: 'L2',
      title: 'Use Llama with OpenAI SDK',
      file: 'llama_02_openai_compat.py',
      category: 'beginner',
      provider: 'llama',
      model: 'Llama 3.3 70B',
      icon: '🔄',
      color: '#7c3aed',
      description: 'Use the OpenAI Python SDK to talk to local Llama models via Ollama. Switch between cloud and local models by changing one line — same code, zero cloud costs.',
      concepts: ['OpenAI compatibility', 'Base URL override', 'Provider switching', 'Cost elimination'],
      codePreview: `from openai import OpenAI

# Point OpenAI SDK at local Ollama server
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama",  # Required but unused
)

response = client.chat.completions.create(
    model="llama3.3",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Write a Python function to sort a list"},
    ],
)

print(response.choices[0].message.content)
# Same code works with OpenAI by changing base_url and api_key!`,
      runCommand: 'python llama_02_openai_compat.py',
    },
    {
      id: 'llama-rag',
      number: 'L3',
      title: 'Local RAG with Llama',
      file: 'llama_03_rag.py',
      category: 'intermediate',
      provider: 'llama',
      model: 'Llama 3.3 + nomic-embed-text',
      icon: '📚',
      color: '#7c3aed',
      description: 'Build a fully local RAG system — no data leaves your machine. Uses Llama for generation and nomic-embed-text for embeddings, both running via Ollama.',
      concepts: ['Local embeddings', 'Private RAG', 'Ollama embeddings', 'LangChain + Ollama'],
      codePreview: `from langchain_ollama import ChatOllama, OllamaEmbeddings
from langchain_community.vectorstores import Chroma

# All local — no API calls, no data leaves your machine
llm = ChatOllama(model="llama3.3")
embeddings = OllamaEmbeddings(model="nomic-embed-text")

# Embed and store documents locally
vectorstore = Chroma.from_documents(chunks, embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# RAG chain — 100% private
rag_chain = (
    {"context": retriever | format_docs,
     "question": RunnablePassthrough()}
    | rag_prompt | llm | StrOutputParser()
)
answer = rag_chain.invoke("What does the policy say about PTO?")`,
      runCommand: 'python llama_03_rag.py',
    },
    {
      id: 'llama-finetuning',
      number: 'L4',
      title: 'Fine-Tune Llama on Your Data',
      file: 'llama_04_finetune.py',
      category: 'advanced',
      provider: 'llama',
      model: 'Llama 3.2 8B',
      icon: '🎯',
      color: '#7c3aed',
      description: 'Fine-tune Llama on your own dataset using QLoRA for memory-efficient training. Customize the model\'s behavior, tone, and domain knowledge on a single GPU.',
      concepts: ['QLoRA fine-tuning', 'Training data format', 'Hugging Face PEFT', 'Model merging'],
      codePreview: `from transformers import AutoModelForCausalLM, TrainingArguments
from peft import LoraConfig, get_peft_model
from trl import SFTTrainer

# Load base model with 4-bit quantization
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.2-8B-Instruct",
    load_in_4bit=True,
)

# Configure LoRA adapters (only trains ~1% of parameters)
lora_config = LoraConfig(r=16, lora_alpha=32, target_modules=["q_proj", "v_proj"])
model = get_peft_model(model, lora_config)

# Train on your dataset
trainer = SFTTrainer(
    model=model,
    train_dataset=dataset,
    args=TrainingArguments(output_dir="./llama-finetuned", num_train_epochs=3),
)
trainer.train()`,
      runCommand: 'python llama_04_finetune.py',
    },
    {
      id: 'llama-agents',
      number: 'L5',
      title: 'Local AI Agents with Llama',
      file: 'llama_05_agents.py',
      category: 'advanced',
      provider: 'llama',
      model: 'Llama 3.3 70B',
      icon: '🤖',
      color: '#7c3aed',
      description: 'Build autonomous agents that run entirely on your hardware. Uses Llama\'s tool-calling capabilities through Ollama for private, cost-free agentic workflows.',
      concepts: ['Local agents', 'Ollama tool calling', 'LangChain agents', 'Private automation'],
      codePreview: `from langchain_ollama import ChatOllama
from langchain.agents import create_tool_calling_agent, AgentExecutor

# Local LLM with tool-calling support
llm = ChatOllama(model="llama3.3")

# Define tools the agent can use
tools = [search_files_tool, run_code_tool, write_file_tool]

# Create local agent
agent = create_tool_calling_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# Agent runs entirely on your machine
result = executor.invoke({
    "input": "Find all Python files with TODO comments and list them"
})`,
      runCommand: 'python llama_05_agents.py',
    },
    {
      id: 'llama-quantize',
      number: 'L6',
      title: 'Quantize & Optimize Models',
      file: 'llama_06_quantize.py',
      category: 'advanced',
      provider: 'llama',
      model: 'Any Llama model',
      icon: '⚡',
      color: '#7c3aed',
      description: 'Shrink model sizes by 50-75% with quantization while maintaining quality. Learn GGUF conversion, different quantization levels, and how to run large models on consumer hardware.',
      concepts: ['GGUF format', 'Quantization levels', 'llama.cpp', 'Memory optimization'],
      codePreview: `# Install llama-cpp-python for local inference
# pip install llama-cpp-python

from llama_cpp import Llama

# Load a quantized GGUF model — runs on CPU or GPU
llm = Llama(
    model_path="./models/llama-3.3-70b-Q4_K_M.gguf",
    n_ctx=4096,       # Context window
    n_gpu_layers=35,   # Offload layers to GPU
    verbose=False,
)

# Generate text with the quantized model
output = llm.create_chat_completion(
    messages=[{"role": "user", "content": "Explain quantum computing"}],
    max_tokens=512,
)
print(output["choices"][0]["message"]["content"])

# Q4_K_M: 70B model fits in ~40GB RAM (was 140GB at fp16)`,
      runCommand: 'python llama_06_quantize.py',
    },
  ],
};

export const providerColors = {
  anthropic: '#d97706',
  openai: '#10a37f',
  google: '#4285f4',
  llama: '#7c3aed',
};

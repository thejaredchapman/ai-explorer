// ═══════════════════════════════════════
// Prompt Engineering Techniques Data
// 18 techniques across 5 categories
// ═══════════════════════════════════════

export const quickTips = [
  {
    title: '1. Provide Context',
    tip: 'Give the AI the background information it needs. Be clear about the specific details, timeframe, and background of your request so it doesn\'t have to guess.',
    example: 'Instead of "Tell me about climate change," try "Explain three major impacts of climate change on agriculture in tropical regions, with examples from the past decade."',
  },
  {
    title: '2. Show Examples of What "Good" Looks Like',
    tip: 'Showing is better than telling. Providing a few examples helps the AI understand the exact pattern, style, or format you want much more clearly than just describing it.',
    example: 'Instead of just asking for a summary, provide a sample: "Here is an example of how to convert technical jargon into plain language... Now, please do the same for this new statement..."',
  },
  {
    title: '3. Specify Output Constraints',
    tip: 'Tell the AI exactly how you want the final answer formatted. Whether you want a list, specific sections, or a certain color palette, giving constraints makes the result immediately usable.',
    example: 'Instead of "Design a website," try "Create a modern single-page website with these specific sections: Hero, About, and Contact. Make the menu sticky and use a sunset color palette."',
  },
  {
    title: '4. Break Complex Tasks into Steps',
    tip: 'Don\'t ask for everything all at once. Breaking down a large request into a numbered list of clear, smaller steps helps guide the AI to give a much more thorough and methodical response.',
    example: '"Please analyze this sales data by taking these steps: 1. Identify top products, 2. Compare to the previous quarter, 3. Highlight trends, and 4. Suggest reasons for these trends."',
  },
  {
    title: '5. Ask It to Think First',
    tip: 'Give the AI space to "think" before it gives you the final answer. Asking it to carefully consider the factors and constraints beforehand leads to much better, more thoughtful results.',
    example: '"Before answering, please think through this problem carefully. Consider the different factors, potential constraints, and various approaches before recommending the best solution."',
  },
  {
    title: '6. Define the AI\'s Role',
    tip: 'Tell the AI who to act as. Giving it a specific role or persona helps tailor its tone, style, and vocabulary to perfectly match your needs and your intended audience.',
    example: '"Please explain how rainbows form from the perspective of an experienced science teacher speaking to a bright 10-year-old who is interested in science."',
  },
  {
    title: 'Secret Weapon: Ask the AI for Help',
    tip: 'When you aren\'t sure how to ask for something, let the AI help you write the prompt! It\'s an incredibly powerful way to figure out the right words for complex tasks.',
    example: '"I\'m trying to get you to help me with [my goal]. I\'m not sure how to phrase my request to get the best results. Can you help me craft an effective prompt for this?"',
  },
];

export const categories = [
  { id: 'all', label: 'All Techniques', color: '#818cf8' },
  { id: 'fundamentals', label: 'Fundamentals', color: '#22c55e', description: 'Basic prompting essentials' },
  { id: 'reasoning', label: 'Reasoning', color: '#f59e0b', description: 'Techniques for complex thinking' },
  { id: 'structuring', label: 'Structuring', color: '#3b82f6', description: 'Output formatting & organization' },
  { id: 'advanced', label: 'Advanced', color: '#a855f7', description: 'Sophisticated multi-step techniques' },
  { id: 'optimization', label: 'Optimization', color: '#ef4444', description: 'Tuning & improving results' },
];

export const difficultyLevels = [
  { id: 1, label: 'Beginner', color: '#22c55e' },
  { id: 2, label: 'Intermediate', color: '#f59e0b' },
  { id: 3, label: 'Advanced', color: '#ef4444' },
];

export const techniques = [
  // ═══════════════════════════════════════
  // FUNDAMENTALS
  // ═══════════════════════════════════════
  {
    id: 'clear-instructions',
    name: 'Clear Instructions',
    category: 'fundamentals',
    icon: '\u{1F3AF}',
    color: '#22c55e',
    difficulty: 1,
    description: 'The foundation of effective prompting. Write precise, unambiguous instructions that leave no room for misinterpretation. Specify exactly what you want, the format, length, style, and any constraints.',
    whenToUse: 'Every single prompt you write. This is the starting point for all other techniques.',
    keyPrinciple: 'Be specific about what you want — vague inputs produce vague outputs.',
    example: {
      bad: {
        prompt: 'Tell me about Python.',
        response: 'Python is a programming language created by Guido van Rossum. It is widely used for various purposes including web development, data science, automation...',
      },
      good: {
        prompt: 'List the top 5 Python libraries for data science. For each, give the name, a one-sentence description, and a common use case. Format as a numbered list.',
        response: '1. **pandas** — Data manipulation and analysis library. Use case: Cleaning and transforming CSV datasets.\n2. **NumPy** — Numerical computing with arrays. Use case: Matrix operations in machine learning.\n3. **scikit-learn** — Machine learning algorithms. Use case: Training classification models.\n4. **matplotlib** — Data visualization. Use case: Creating publication-quality charts.\n5. **TensorFlow** — Deep learning framework. Use case: Building neural networks.',
      },
    },
    codeExample: `# Clear instructions with constraints
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": """List the top 5 Python libraries for data science.

Requirements:
- Format as a numbered list
- For each: name, one-sentence description, common use case
- Keep descriptions under 15 words
- Order by popularity"""
    }],
)`,
    tips: [
      'Specify the output format explicitly (list, table, JSON, etc.)',
      'Include constraints like word count, tone, or audience level',
      'Break complex requests into numbered steps',
      'Use examples of desired output when the format matters',
    ],
    pitfalls: [
      'Being too vague — "tell me about X" produces unfocused responses',
      'Assuming the model knows your context or preferences',
      'Cramming too many unrelated requests into a single prompt',
    ],
    relatedTechniques: ['role-prompting', 'delimiters-markers'],
  },
  {
    id: 'role-prompting',
    name: 'Role Prompting',
    category: 'fundamentals',
    icon: '\u{1F3AD}',
    color: '#22c55e',
    difficulty: 1,
    description: 'Assign the model a specific expertise persona to frame its responses. By telling the model to act as an expert in a particular domain, you activate more relevant knowledge and appropriate communication style.',
    whenToUse: 'When you need domain-specific expertise, a particular communication style, or want to constrain the perspective of the response.',
    keyPrinciple: 'Setting a role frames the entire conversation and shapes the depth and style of responses.',
    example: {
      bad: {
        prompt: 'Is my code secure?',
        response: 'Without seeing your code, I can suggest some general security practices like input validation, using HTTPS, and keeping dependencies updated...',
      },
      good: {
        prompt: 'You are a senior application security engineer conducting a code review. Analyze the following Python Flask endpoint for OWASP Top 10 vulnerabilities. Rate each finding as Critical, High, Medium, or Low.',
        response: '**Security Review — Flask Endpoint**\n\n**CRITICAL: SQL Injection (A03:2021)**\nLine 12: `query = f"SELECT * FROM users WHERE id = {user_id}"` — Direct string interpolation in SQL query. Use parameterized queries.\n\n**HIGH: Missing Authentication (A07:2021)**\nNo @login_required decorator. Endpoint is publicly accessible...',
      },
    },
    codeExample: `# Role prompting via system message
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="""You are a senior application security engineer
with 15 years of experience. You conduct thorough code
reviews focused on OWASP Top 10 vulnerabilities.
Rate findings as Critical, High, Medium, or Low.
Always suggest specific fixes with code examples.""",
    messages=[{
        "role": "user",
        "content": f"Review this endpoint for security issues:\\n{code}"
    }],
)`,
    tips: [
      'Be specific about the role — "senior security engineer" beats "security expert"',
      'Include years of experience or credentials to set expertise level',
      'Combine role with clear output format instructions',
      'Use system messages for roles that persist across a conversation',
    ],
    pitfalls: [
      'Assigning conflicting roles (e.g., "be creative but strictly factual")',
      'Using roles to override safety guidelines — this does not work',
      'Forgetting that the role only flavors the response, it does not change capabilities',
    ],
    relatedTechniques: ['system-prompts', 'clear-instructions'],
  },
  {
    id: 'system-prompts',
    name: 'System Prompts',
    category: 'fundamentals',
    icon: '\u{2699}\u{FE0F}',
    color: '#22c55e',
    difficulty: 1,
    description: 'Set behavioral context and persistent instructions using the system message. System prompts define the model\'s persona, constraints, and ground rules for the entire conversation — separate from user messages.',
    whenToUse: 'When building applications where the model needs consistent behavior across all user interactions — chatbots, assistants, tools.',
    keyPrinciple: 'System prompts set the "rules of engagement" that persist across the entire conversation.',
    example: {
      bad: {
        prompt: 'Help me with my code. And remember to be concise and only use Python.',
        response: 'Sure! I\'d be happy to help. What code are you working on? I can assist with Python or other languages. Please share your code and let me know what you need!',
      },
      good: {
        prompt: '[System] You are a Python tutor for beginners. Rules: (1) Only use Python 3.12+. (2) Keep explanations under 3 sentences. (3) Always include a runnable code example. (4) If the user asks about another language, politely redirect to Python.\n\n[User] Help me sort a list.',
        response: 'Use the built-in `sorted()` function for a new sorted list, or `.sort()` to sort in place.\n\n```python\nnumbers = [3, 1, 4, 1, 5]\nsorted_nums = sorted(numbers)  # [1, 1, 3, 4, 5]\n```',
      },
    },
    codeExample: `# System prompt for a coding tutor application
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="""You are a Python tutor for beginners.

Rules:
1. Only use Python 3.12+ syntax
2. Keep explanations under 3 sentences
3. Always include a runnable code example
4. If asked about other languages, redirect to Python
5. Use type hints in all code examples
6. Never use print() without f-strings""",
    messages=[{
        "role": "user",
        "content": "Help me sort a list"
    }],
)`,
    tips: [
      'Keep system prompts focused — one clear set of rules',
      'Number your rules for clarity and easier debugging',
      'Test edge cases: what happens when users try to override your rules?',
      'Use system prompts for behavior, user messages for tasks',
    ],
    pitfalls: [
      'Making system prompts too long — the model may ignore later rules',
      'Contradicting system prompt rules in user messages',
      'Putting task-specific instructions in the system prompt instead of user messages',
    ],
    relatedTechniques: ['role-prompting', 'clear-instructions'],
  },
  {
    id: 'providing-context',
    name: 'Providing Context',
    category: 'fundamentals',
    icon: '\u{1F4D6}',
    color: '#22c55e',
    difficulty: 1,
    description: 'Give the model relevant background information it needs to produce accurate, tailored responses. Context includes documents, data, prior decisions, user preferences, or domain-specific knowledge the model wouldn\'t otherwise have.',
    whenToUse: 'When the model needs information beyond its training data — your specific codebase, company policies, recent events, or user-specific details.',
    keyPrinciple: 'Models can only work with what you give them — relevant context eliminates guessing.',
    example: {
      bad: {
        prompt: 'Write a function to calculate the discount.',
        response: 'Here\'s a generic discount function:\n```python\ndef calculate_discount(price, discount_percent):\n    return price * (1 - discount_percent / 100)\n```',
      },
      good: {
        prompt: 'Our e-commerce platform has these discount rules:\n- Gold members: 15% off orders over $100\n- Silver members: 10% off orders over $50\n- Stacking: coupon codes can stack with membership discounts up to 30% max\n\nWrite a Python function that applies these rules.',
        response: '```python\ndef calculate_discount(order_total: float, membership: str, coupon_pct: float = 0) -> float:\n    MAX_DISCOUNT = 0.30\n    membership_discounts = {"gold": (0.15, 100), "silver": (0.10, 50)}\n    \n    member_pct = 0\n    if membership in membership_discounts:\n        pct, threshold = membership_discounts[membership]\n        if order_total >= threshold:\n            member_pct = pct\n    \n    total_pct = min(member_pct + coupon_pct, MAX_DISCOUNT)\n    return round(order_total * (1 - total_pct), 2)\n```',
      },
    },
    codeExample: `# Providing context with your specific data
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    messages=[{
        "role": "user",
        "content": f"""Given our database schema:
{schema_definition}

And these business rules:
{business_rules}

Write a SQL query to find all customers who qualify
for the loyalty program upgrade this quarter."""
    }],
)`,
    tips: [
      'Put the most important context first — models pay more attention to it',
      'Use delimiters to separate context from instructions',
      'Only include relevant context — too much noise degrades performance',
      'Label your context sections (e.g., "Database Schema:", "Business Rules:")',
    ],
    pitfalls: [
      'Providing too much irrelevant context that confuses the model',
      'Assuming the model remembers context from previous conversations',
      'Forgetting to update context when your data changes',
    ],
    relatedTechniques: ['delimiters-markers', 'rag'],
  },

  // ═══════════════════════════════════════
  // REASONING
  // ═══════════════════════════════════════
  {
    id: 'chain-of-thought',
    name: 'Chain of Thought',
    category: 'reasoning',
    icon: '\u{1F517}',
    color: '#f59e0b',
    difficulty: 2,
    description: 'Ask the model to reason step-by-step through a problem before giving a final answer. This dramatically improves accuracy on math, logic, coding, and multi-step reasoning tasks by making the model "show its work."',
    whenToUse: 'For math problems, logical reasoning, multi-step analysis, debugging, and any task where the answer requires working through intermediate steps.',
    keyPrinciple: 'Explicit step-by-step reasoning reduces errors and reveals the model\'s thought process.',
    example: {
      bad: {
        prompt: 'A store has a 20% off sale. You have a $10 coupon. If an item costs $80, how much do you pay?',
        response: '$54',
      },
      good: {
        prompt: 'A store has a 20% off sale. You have a $10 coupon. If an item costs $80, how much do you pay? Think through this step by step.',
        response: 'Let me work through this step by step:\n\n1. Original price: $80\n2. 20% discount: $80 x 0.20 = $16\n3. Price after sale discount: $80 - $16 = $64\n4. Apply $10 coupon: $64 - $10 = $54\n\nYou would pay **$54**.',
      },
    },
    codeExample: `# Chain of thought for debugging
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    messages=[{
        "role": "user",
        "content": """This function should return the second largest
number but it has a bug. Think step by step:
1. Trace through the code with example input [3, 1, 4, 1, 5]
2. Identify where the logic fails
3. Explain the fix

def second_largest(nums):
    first = second = float('-inf')
    for n in nums:
        if n > first:
            first = n
        elif n > second:
            second = n
    return second"""
    }],
)`,
    tips: [
      'Use "Think step by step" or "Let\'s work through this" as a trigger phrase',
      'For complex problems, explicitly number the steps you want',
      'Chain of thought works best when the task genuinely requires reasoning',
      'You can ask the model to verify its answer after reasoning',
    ],
    pitfalls: [
      'Using CoT for simple factual lookups where reasoning is unnecessary',
      'Not specifying the format of the reasoning steps',
      'Accepting the reasoning without checking — CoT can produce convincing but wrong chains',
    ],
    relatedTechniques: ['zero-shot-cot', 'tree-of-thought', 'self-reflection'],
  },
  {
    id: 'few-shot',
    name: 'Few-Shot Prompting',
    category: 'reasoning',
    icon: '\u{1F4DA}',
    color: '#f59e0b',
    difficulty: 2,
    description: 'Teach the model by providing example input-output pairs before your actual request. The model learns the pattern from your examples and applies it to new inputs — no fine-tuning required.',
    whenToUse: 'When you need consistent formatting, classification tasks, custom transformations, or when the model doesn\'t produce the right format or style from instructions alone.',
    keyPrinciple: 'Examples are worth a thousand words of instruction — show, don\'t just tell.',
    example: {
      bad: {
        prompt: 'Classify this customer feedback as positive, negative, or neutral: "The delivery was fast but the packaging was damaged."',
        response: 'This feedback is mixed — positive about delivery speed but negative about packaging. I would classify it as neutral with both positive and negative elements.',
      },
      good: {
        prompt: 'Classify customer feedback. Respond with only the label.\n\nFeedback: "Love this product, works perfectly!"\nLabel: positive\n\nFeedback: "Arrived broken, very disappointed."\nLabel: negative\n\nFeedback: "It works as described, nothing special."\nLabel: neutral\n\nFeedback: "The delivery was fast but the packaging was damaged."\nLabel:',
        response: 'mixed',
      },
    },
    codeExample: `# Few-shot classification with examples
examples = [
    ("Love this product!", "positive"),
    ("Arrived broken.", "negative"),
    ("Works as described.", "neutral"),
    ("Fast delivery but damaged box.", "mixed"),
]

prompt = "Classify customer feedback. Respond with only the label.\\n\\n"
for text, label in examples:
    prompt += f'Feedback: "{text}"\\nLabel: {label}\\n\\n'
prompt += f'Feedback: "{new_feedback}"\\nLabel:'

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=10,
    messages=[{"role": "user", "content": prompt}],
)`,
    tips: [
      'Use 3-5 diverse examples that cover edge cases',
      'Keep examples consistent in format — the model mirrors your pattern exactly',
      'Order matters: put the most similar example last (closest to the actual task)',
      'Include "tricky" examples that demonstrate nuance in classification',
    ],
    pitfalls: [
      'Using too many examples wastes tokens and can confuse the model',
      'Biased example selection leads to biased outputs',
      'Inconsistent formatting between examples teaches inconsistency',
    ],
    relatedTechniques: ['clear-instructions', 'prompt-templates', 'structured-output'],
  },
  {
    id: 'zero-shot-cot',
    name: 'Zero-Shot CoT',
    category: 'reasoning',
    icon: '\u{1F4AD}',
    color: '#f59e0b',
    difficulty: 1,
    description: 'The simplest reasoning technique: just append "Let\'s think step by step" to your prompt. This single phrase activates chain-of-thought reasoning without needing to provide examples or structure the reasoning yourself.',
    whenToUse: 'Quick reasoning boost for math, logic puzzles, and analytical questions where you don\'t need to control the reasoning format.',
    keyPrinciple: '"Let\'s think step by step" is the cheapest way to improve reasoning accuracy.',
    example: {
      bad: {
        prompt: 'If it takes 5 machines 5 minutes to make 5 widgets, how long does it take 100 machines to make 100 widgets?',
        response: '100 minutes.',
      },
      good: {
        prompt: 'If it takes 5 machines 5 minutes to make 5 widgets, how long does it take 100 machines to make 100 widgets? Let\'s think step by step.',
        response: 'Let\'s think step by step:\n\n1. 5 machines make 5 widgets in 5 minutes\n2. That means each machine makes 1 widget in 5 minutes\n3. So 100 machines can each make 1 widget in 5 minutes\n4. 100 machines working simultaneously = 100 widgets in 5 minutes\n\nThe answer is **5 minutes**.',
      },
    },
    codeExample: `# Zero-shot CoT — just add the magic phrase
def ask_with_reasoning(question):
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"{question}\\n\\nLet's think step by step."
        }],
    )
    return response.content[0].text

# Works great for math, logic, and analysis
answer = ask_with_reasoning(
    "If it takes 5 machines 5 minutes to make 5 widgets, "
    "how long for 100 machines to make 100 widgets?"
)`,
    tips: [
      'Works best on reasoning-heavy tasks (math, logic, puzzles)',
      'Can combine with role prompting for domain-specific reasoning',
      'Try variations: "Think carefully", "Reason about this", "Walk me through your logic"',
      'Good as a default starting point before trying more complex techniques',
    ],
    pitfalls: [
      'Less effective than structured CoT for complex multi-step problems',
      'The model might reason correctly but still give a wrong final answer',
      'Adds token overhead — not ideal for simple factual queries',
    ],
    relatedTechniques: ['chain-of-thought', 'tree-of-thought'],
  },
  {
    id: 'tree-of-thought',
    name: 'Tree of Thought',
    category: 'reasoning',
    icon: '\u{1F333}',
    color: '#f59e0b',
    difficulty: 3,
    description: 'Explore multiple reasoning paths simultaneously, evaluate each branch, and select the most promising one. Unlike linear chain-of-thought, Tree of Thought considers alternative approaches and backtracks from dead ends.',
    whenToUse: 'For complex problems with multiple valid approaches — strategic planning, creative problem-solving, architectural decisions, and optimization tasks.',
    keyPrinciple: 'Exploring multiple paths before committing finds better solutions than following the first idea.',
    example: {
      bad: {
        prompt: 'How should I architect a real-time chat system?',
        response: 'Use WebSockets with Socket.IO, a Node.js backend, and MongoDB for message storage. Here\'s how to set it up...',
      },
      good: {
        prompt: 'I need to architect a real-time chat system. Consider 3 different approaches:\n\nFor each approach:\n1. Describe the architecture\n2. List pros and cons\n3. Rate scalability (1-10) and complexity (1-10)\n\nThen recommend the best approach for a team of 3 developers expecting 10K concurrent users.',
        response: '**Approach 1: WebSocket + Redis Pub/Sub**\nArchitecture: Socket.IO servers behind load balancer, Redis for message routing...\nPros: Low latency, proven pattern. Cons: Stateful connections complicate scaling.\nScalability: 8/10 | Complexity: 6/10\n\n**Approach 2: SSE + Message Queue**\nArchitecture: Server-Sent Events for delivery, RabbitMQ for routing...\n\n**Approach 3: Managed Service (Ably/Pusher)**\nArchitecture: Third-party WebSocket service, your API for business logic...\n\n**Recommendation**: For a team of 3 with 10K users, Approach 3...',
      },
    },
    codeExample: `# Tree of Thought: explore multiple solutions
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=4096,
    messages=[{
        "role": "user",
        "content": """Problem: Optimize this database query that takes 30s.

Explore 3 different optimization strategies:

For each strategy:
1. Describe the approach
2. Estimate performance improvement
3. List tradeoffs and risks
4. Rate implementation difficulty (1-5)

Then recommend the best strategy given we need
results within 2 seconds and can't change the schema.

Current query:
SELECT * FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE o.created_at > '2024-01-01'
ORDER BY o.total DESC
LIMIT 100"""
    }],
)`,
    tips: [
      'Explicitly ask for N different approaches/solutions',
      'Require evaluation criteria for comparing branches',
      'Include constraints that help narrow down the best path',
      'Works well with a "recommend the best" step at the end',
    ],
    pitfalls: [
      'Overkill for simple problems — adds significant token cost',
      'Can produce superficial analysis if you ask for too many branches',
      'The model may artificially differentiate branches that are very similar',
    ],
    relatedTechniques: ['chain-of-thought', 'self-reflection'],
  },

  // ═══════════════════════════════════════
  // STRUCTURING
  // ═══════════════════════════════════════
  {
    id: 'structured-output',
    name: 'Structured Output',
    category: 'structuring',
    icon: '\u{1F4CB}',
    color: '#3b82f6',
    difficulty: 2,
    description: 'Request responses in a specific structured format: JSON, XML, markdown tables, YAML, or custom schemas. Essential for building applications that parse model outputs programmatically.',
    whenToUse: 'When model output feeds into code — APIs, data pipelines, UI rendering. Any time you need to parse the response reliably.',
    keyPrinciple: 'Define the exact output schema and the model will conform to it.',
    example: {
      bad: {
        prompt: 'Extract the key info from this job posting.',
        response: 'This is a Senior Frontend Developer position at TechCorp. They\'re looking for someone with 5+ years of React experience. The salary range is $150K-$180K and it\'s a remote position based in the US.',
      },
      good: {
        prompt: 'Extract information from this job posting into the following JSON format:\n```json\n{\n  "title": "",\n  "company": "",\n  "experience_years": 0,\n  "skills": [],\n  "salary_min": 0,\n  "salary_max": 0,\n  "remote": true/false,\n  "location": ""\n}\n```\nRespond with only the JSON, no other text.',
        response: '```json\n{\n  "title": "Senior Frontend Developer",\n  "company": "TechCorp",\n  "experience_years": 5,\n  "skills": ["React", "TypeScript", "GraphQL", "CSS-in-JS"],\n  "salary_min": 150000,\n  "salary_max": 180000,\n  "remote": true,\n  "location": "US"\n}\n```',
      },
    },
    codeExample: `# Structured output with a JSON schema
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": """Extract job posting info as JSON:

Schema:
{
  "title": "string",
  "company": "string",
  "skills": ["string"],
  "salary_min": number,
  "salary_max": number,
  "remote": boolean
}

Respond with ONLY valid JSON, no markdown fences.

Job posting:
""" + job_posting_text
    }],
)

import json
data = json.loads(response.content[0].text)`,
    tips: [
      'Provide a complete example of the expected output shape',
      'Say "Respond with ONLY valid JSON" to prevent extra text',
      'Include data types in your schema (string, number, boolean)',
      'Use TypeScript/Pydantic types for complex schemas',
    ],
    pitfalls: [
      'Not specifying data types leads to inconsistent formats',
      'Forgetting to handle edge cases (null values, empty arrays)',
      'Large schemas may cause the model to miss fields — validate the output',
    ],
    relatedTechniques: ['prompt-templates', 'delimiters-markers', 'few-shot'],
  },
  {
    id: 'prompt-templates',
    name: 'Prompt Templates',
    category: 'structuring',
    icon: '\u{1F4DD}',
    color: '#3b82f6',
    difficulty: 2,
    description: 'Create reusable prompt patterns with variable placeholders that you fill in at runtime. Templates ensure consistency, reduce errors, and make prompt engineering maintainable across your application.',
    whenToUse: 'In production applications where the same prompt structure is used repeatedly with different inputs — content generation, analysis pipelines, chatbot responses.',
    keyPrinciple: 'Separate the prompt structure from the variable data for maintainable, testable prompts.',
    example: {
      bad: {
        prompt: 'Review my Python code and tell me what\'s wrong with it: [code here]',
        response: '(Inconsistent review format every time)',
      },
      good: {
        prompt: 'CODE REVIEW TEMPLATE\n\nLanguage: {language}\nFocus Area: {focus}\nCode:\n---\n{code}\n---\n\nProvide your review in this format:\n1. Summary (1 sentence)\n2. Issues found (bullet list with severity)\n3. Suggested fix (code block)\n4. Overall rating: /10',
        response: '1. **Summary**: The function has a SQL injection vulnerability and missing input validation.\n2. **Issues**:\n   - CRITICAL: SQL injection via string formatting\n   - MEDIUM: No input validation on user_id\n3. **Suggested fix**:\n```python\ncursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))\n```\n4. Overall rating: 4/10',
      },
    },
    codeExample: `# Reusable prompt template system
CODE_REVIEW_TEMPLATE = """You are a {language} code reviewer.
Focus area: {focus}

Review the following code:
---
{code}
---

Provide your review in this exact format:
1. Summary (1 sentence)
2. Issues found (bullet list with severity)
3. Suggested fix (code block)
4. Overall rating: X/10"""

def review_code(code, language="Python", focus="security"):
    prompt = CODE_REVIEW_TEMPLATE.format(
        language=language,
        focus=focus,
        code=code,
    )
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2048,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.content[0].text`,
    tips: [
      'Store templates as constants or in config files, not inline',
      'Version your templates — track which version produced which output',
      'Include the output format in the template itself',
      'Use Python f-strings, Jinja2, or LangChain PromptTemplate for variables',
    ],
    pitfalls: [
      'Hardcoding values that should be variables',
      'Not escaping user input that might contain template delimiters',
      'Over-templating simple one-off prompts that don\'t need reuse',
    ],
    relatedTechniques: ['structured-output', 'delimiters-markers', 'clear-instructions'],
  },
  {
    id: 'delimiters-markers',
    name: 'Delimiters & Markers',
    category: 'structuring',
    icon: '\u{1F4CC}',
    color: '#3b82f6',
    difficulty: 1,
    description: 'Use clear separators (triple backticks, XML tags, dashes, headers) to distinguish between instructions, context, and content in your prompts. This prevents the model from confusing data with instructions.',
    whenToUse: 'Whenever your prompt contains mixed content — instructions plus user data, multiple documents, code blocks within text. Essential for preventing prompt injection.',
    keyPrinciple: 'Clear boundaries between instructions and data prevent confusion and injection attacks.',
    example: {
      bad: {
        prompt: 'Summarize the following text and also translate the text to French. The text is about climate change and its effects on agriculture including rising temperatures and changing rainfall patterns affecting crop yields worldwide.',
        response: '(Model is confused — is "rising temperatures..." part of the instruction or the text?)',
      },
      good: {
        prompt: '<instructions>\nSummarize the following text in 2 sentences, then translate your summary to French.\n</instructions>\n\n<text>\nClimate change is significantly affecting agriculture worldwide. Rising temperatures and changing rainfall patterns are disrupting crop yields, particularly in tropical regions...\n</text>',
        response: '**Summary:** Climate change is disrupting global agriculture through rising temperatures and altered rainfall patterns, with tropical regions being hit hardest. Crop yields are declining as farmers struggle to adapt to unpredictable weather conditions.\n\n**French:** Le changement climatique perturbe l\'agriculture mondiale...',
      },
    },
    codeExample: `# Using XML-style delimiters for clarity
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": f"""<instructions>
Summarize the text in 2 sentences.
Then translate to French.
</instructions>

<text>
{user_provided_text}
</text>

<output_format>
**Summary:** [English summary]
**French:** [French translation]
</output_format>"""
    }],
)`,
    tips: [
      'XML tags (<text>, <instructions>) work well with Claude',
      'Triple backticks (```) are great for code blocks',
      'Use --- or === for section breaks in simpler prompts',
      'Delimiters are your first defense against prompt injection',
    ],
    pitfalls: [
      'Using the same delimiter for different purposes in one prompt',
      'Not using delimiters when passing user-generated content (injection risk)',
      'Overcomplicating with nested delimiters when simple ones suffice',
    ],
    relatedTechniques: ['clear-instructions', 'providing-context', 'prompt-templates'],
  },

  // ═══════════════════════════════════════
  // ADVANCED
  // ═══════════════════════════════════════
  {
    id: 'prompt-chaining',
    name: 'Prompt Chaining',
    category: 'advanced',
    icon: '\u{26D3}\u{FE0F}',
    color: '#a855f7',
    difficulty: 2,
    description: 'Break a complex task into a sequence of simpler prompts where each step\'s output feeds into the next. This gives you control, debuggability, and better results than cramming everything into a single prompt.',
    whenToUse: 'For multi-step workflows: research → analyze → write, or extract → validate → transform. Any pipeline where different steps need different instructions.',
    keyPrinciple: 'Small, focused prompts chained together outperform one massive prompt.',
    example: {
      bad: {
        prompt: 'Read this article, extract the key claims, fact-check each claim, and write a summary report with accuracy scores.',
        response: '(Tries to do everything at once, often missing claims or skipping fact-checking)',
      },
      good: {
        prompt: 'Step 1 → Extract claims: "List every factual claim in this article as a numbered list."\nStep 2 → Fact-check: "For each claim, assess if it\'s Verified, Disputed, or Unverifiable. Cite your reasoning."\nStep 3 → Report: "Write a summary report with accuracy scores based on the fact-check results."',
        response: '**Step 1 Output:** 8 claims extracted\n**Step 2 Output:** 5 verified, 2 disputed, 1 unverifiable\n**Step 3 Output:** Overall accuracy: 62.5%. The article\'s core thesis is supported but two statistical claims lack sources...',
      },
    },
    codeExample: `# Prompt chaining: each step feeds the next
async def fact_check_article(article):
    # Step 1: Extract claims
    claims = await ask(
        f"List every factual claim in this article "
        f"as a numbered list:\\n\\n{article}"
    )

    # Step 2: Fact-check each claim
    checks = await ask(
        f"For each claim, assess accuracy as "
        f"Verified, Disputed, or Unverifiable:\\n\\n{claims}"
    )

    # Step 3: Generate report
    report = await ask(
        f"Write a summary report with accuracy scores "
        f"based on these results:\\n\\n{checks}"
    )

    return report`,
    tips: [
      'Each step should have a single, clear objective',
      'Pass only the relevant output from step N to step N+1',
      'Add validation between steps to catch errors early',
      'Log intermediate outputs for debugging',
    ],
    pitfalls: [
      'Passing too much context between steps (token waste)',
      'Not handling failures at intermediate steps',
      'Over-chaining simple tasks that work fine in a single prompt',
    ],
    relatedTechniques: ['clear-instructions', 'structured-output', 'self-reflection'],
  },
  {
    id: 'self-reflection',
    name: 'Self-Reflection',
    category: 'advanced',
    icon: '\u{1FA9E}',
    color: '#a855f7',
    difficulty: 2,
    description: 'Ask the model to critique, verify, or improve its own output. After generating an initial response, prompt the model to review it for errors, gaps, or improvements — then produce a corrected version.',
    whenToUse: 'When accuracy matters: code generation, factual claims, complex analysis. Use as a second pass to catch errors the first pass missed.',
    keyPrinciple: 'A second look catches errors — even for AI. Self-critique improves output quality.',
    example: {
      bad: {
        prompt: 'Write a regex to validate email addresses.',
        response: '`^[a-zA-Z0-9]+@[a-zA-Z]+\\.[a-zA-Z]+$`\n(Misses dots in local part, hyphens in domain, etc.)',
      },
      good: {
        prompt: 'Write a regex to validate email addresses. Then review your regex against these test cases and fix any issues:\n- user@example.com (valid)\n- user.name+tag@example.co.uk (valid)\n- @missing-local.com (invalid)\n- user@.no-domain.com (invalid)',
        response: 'Initial regex: `^[a-zA-Z0-9]+@[a-zA-Z]+\\.[a-zA-Z]+$`\n\n**Self-review:**\n- user.name+tag@example.co.uk would FAIL (missing ., +, and multi-part TLD)\n- Need to support dots, plus, hyphens in local part\n- Need to support subdomains\n\n**Corrected regex:**\n`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`\n\nAll test cases now pass.',
      },
    },
    codeExample: `# Self-reflection pattern: generate, critique, improve
def generate_with_reflection(task):
    # Step 1: Initial generation
    draft = ask(f"Complete this task:\\n{task}")

    # Step 2: Self-critique
    critique = ask(
        f"Review this output for errors, edge cases, "
        f"and improvements:\\n\\n{draft}\\n\\n"
        f"List specific issues found."
    )

    # Step 3: Improved version
    final = ask(
        f"Original output:\\n{draft}\\n\\n"
        f"Issues found:\\n{critique}\\n\\n"
        f"Produce an improved version that fixes all issues."
    )

    return final`,
    tips: [
      'Provide specific test cases or criteria for the self-review',
      'Ask for explicit "issues found" before the corrected version',
      'Works especially well for code — ask the model to trace through with test inputs',
      'Can combine with prompt chaining for multi-round refinement',
    ],
    pitfalls: [
      'The model may "find" issues that don\'t exist (hallucinated problems)',
      'Diminishing returns after 2-3 rounds of reflection',
      'Doubles or triples token cost — use selectively on important outputs',
    ],
    relatedTechniques: ['chain-of-thought', 'prompt-chaining', 'iterative-refinement'],
  },
  {
    id: 'rag',
    name: 'Retrieval-Augmented Generation',
    category: 'advanced',
    icon: '\u{1F4DA}',
    color: '#a855f7',
    difficulty: 3,
    description: 'Ground the model\'s responses in your own documents by retrieving relevant context at query time. Embed your documents, store in a vector database, retrieve the most relevant chunks, and inject them into the prompt.',
    whenToUse: 'When the model needs to answer questions about your specific data — company docs, codebases, knowledge bases, or any information not in its training data.',
    keyPrinciple: 'Retrieve relevant context first, then generate — this grounds responses in facts.',
    example: {
      bad: {
        prompt: 'What is our company\'s PTO policy for senior engineers?',
        response: 'Typically, senior engineers receive 3-4 weeks of PTO at most companies. Some organizations also offer unlimited PTO policies...',
      },
      good: {
        prompt: 'Answer the question using ONLY the provided context. If the answer isn\'t in the context, say "I don\'t have that information."\n\n<context>\nSection 4.2 - PTO Policy: Senior engineers (Level 5+) receive 25 days of PTO per year. PTO accrues monthly at 2.08 days/month. Unused PTO carries over up to 10 days.\n</context>\n\nQuestion: What is our company\'s PTO policy for senior engineers?',
        response: 'Senior engineers (Level 5+) receive 25 days of PTO per year. It accrues monthly at 2.08 days/month, and up to 10 unused days can carry over to the next year.',
      },
    },
    codeExample: `# RAG pipeline: retrieve context, then generate
from langchain_community.vectorstores import Chroma
from langchain_anthropic import ChatAnthropic

# 1. Embed and store your documents (one-time setup)
vectorstore = Chroma.from_documents(doc_chunks, embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# 2. At query time: retrieve relevant chunks
query = "What is our PTO policy for senior engineers?"
relevant_docs = retriever.invoke(query)
context = "\\n".join([doc.page_content for doc in relevant_docs])

# 3. Generate answer grounded in retrieved context
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": f"""Answer using ONLY the provided context.

<context>
{context}
</context>

Question: {query}"""
    }],
)`,
    tips: [
      'Chunk documents into 200-500 token pieces for better retrieval',
      'Always instruct the model to only use provided context',
      'Include "say I don\'t know" instructions to prevent hallucination',
      'Experiment with the number of retrieved chunks (k=3-5 is common)',
    ],
    pitfalls: [
      'Poor chunking leads to poor retrieval — chunk boundaries matter',
      'Retrieving too many chunks floods the context and confuses the model',
      'Not telling the model to stay grounded — it will hallucinate without guardrails',
    ],
    relatedTechniques: ['providing-context', 'delimiters-markers', 'tool-use'],
  },
  {
    id: 'tool-use',
    name: 'Tool Use & Function Calling',
    category: 'advanced',
    icon: '\u{1F527}',
    color: '#a855f7',
    difficulty: 3,
    description: 'Extend the model\'s capabilities by giving it access to external tools — APIs, databases, calculators, search engines. The model decides when to call a tool, you execute it, and return the result for the final answer.',
    whenToUse: 'When the model needs real-time data (weather, stock prices), needs to take actions (send email, create ticket), or needs capabilities beyond text generation (calculations, code execution).',
    keyPrinciple: 'Define tools clearly and let the model decide when to use them — it becomes an intelligent orchestrator.',
    example: {
      bad: {
        prompt: 'What\'s the weather in Tokyo right now?',
        response: 'I don\'t have access to real-time weather data. As of my last update, Tokyo typically experiences...',
      },
      good: {
        prompt: '[With tools defined] What\'s the weather in Tokyo right now?',
        response: '[Model calls get_weather(city="Tokyo")] Based on the current data: It\'s 22\u00B0C (72\u00B0F) in Tokyo with partly cloudy skies and 65% humidity. Expected high of 25\u00B0C today.',
      },
    },
    codeExample: `# Define tools the model can use
tools = [{
    "name": "get_weather",
    "description": "Get current weather for a city",
    "input_schema": {
        "type": "object",
        "properties": {
            "city": {
                "type": "string",
                "description": "City name"
            }
        },
        "required": ["city"]
    }
}]

# Model decides when to call tools
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=tools,
    messages=[{
        "role": "user",
        "content": "What's the weather in Tokyo?"
    }],
)

# Execute tool calls and return results
for block in response.content:
    if block.type == "tool_use":
        result = call_weather_api(block.input["city"])
        # Send result back to model for final answer`,
    tips: [
      'Write clear, detailed tool descriptions — the model uses them to decide when to call',
      'Include parameter descriptions and examples in the schema',
      'Handle errors gracefully — return error messages the model can interpret',
      'Start simple with 1-2 tools, then add more as needed',
    ],
    pitfalls: [
      'Vague tool descriptions lead to wrong tool selection',
      'Not handling the case where the model calls a tool incorrectly',
      'Giving the model too many tools at once can confuse tool selection',
    ],
    relatedTechniques: ['prompt-chaining', 'rag', 'system-prompts'],
  },

  // ═══════════════════════════════════════
  // OPTIMIZATION
  // ═══════════════════════════════════════
  {
    id: 'temperature-sampling',
    name: 'Temperature & Sampling',
    category: 'optimization',
    icon: '\u{1F321}\u{FE0F}',
    color: '#ef4444',
    difficulty: 2,
    description: 'Control the randomness and creativity of model outputs by adjusting temperature and other sampling parameters. Low temperature for consistency and accuracy, high temperature for creativity and variety.',
    whenToUse: 'Always — temperature is one of the most impactful settings. Use low (0-0.3) for factual/code tasks, medium (0.5-0.7) for balanced tasks, high (0.8-1.0) for creative tasks.',
    keyPrinciple: 'Temperature = 0 for consistency, temperature = 1 for creativity. Match the setting to the task.',
    example: {
      bad: {
        prompt: '(Using default temperature for a JSON extraction task)',
        response: '(Slightly different JSON structure each time — inconsistent field names, sometimes adds commentary)',
      },
      good: {
        prompt: '(Temperature=0 for JSON extraction, Temperature=0.9 for creative writing)',
        response: '(JSON extraction: identical, valid JSON every time. Creative writing: varied, original prose each generation)',
      },
    },
    codeExample: `# Temperature settings for different tasks

# Factual / structured output — temperature 0
json_response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    temperature=0,  # Deterministic, consistent
    messages=[{"role": "user", "content": "Extract as JSON..."}],
)

# Balanced task — temperature 0.5
analysis = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    temperature=0.5,  # Some variety, still focused
    messages=[{"role": "user", "content": "Analyze this data..."}],
)

# Creative writing — temperature 0.9
story = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=4096,
    temperature=0.9,  # Creative, varied output
    messages=[{"role": "user", "content": "Write a story..."}],
)`,
    tips: [
      'Use temperature=0 for code generation, data extraction, and classification',
      'Use temperature=0.7-1.0 for brainstorming, creative writing, and variety',
      'top_p (nucleus sampling) is an alternative — use one or the other, not both',
      'Test your prompt at different temperatures to find the sweet spot',
    ],
    pitfalls: [
      'Using high temperature for tasks that need consistency (JSON, code)',
      'Using temperature=0 for creative tasks (produces repetitive output)',
      'Adjusting temperature when the real problem is a bad prompt',
    ],
    relatedTechniques: ['clear-instructions', 'structured-output', 'iterative-refinement'],
  },
  {
    id: 'negative-prompting',
    name: 'Negative Prompting',
    category: 'optimization',
    icon: '\u{1F6AB}',
    color: '#ef4444',
    difficulty: 1,
    description: 'Explicitly tell the model what NOT to do. Specify unwanted behaviors, formats, or content to exclude. Negative constraints are surprisingly effective at shaping outputs when positive instructions alone aren\'t enough.',
    whenToUse: 'When the model keeps including unwanted elements despite positive instructions — filler phrases, disclaimers, certain formats, or off-topic tangents.',
    keyPrinciple: 'Sometimes telling the model what to avoid is more effective than telling it what to do.',
    example: {
      bad: {
        prompt: 'Explain how a neural network works.',
        response: 'Great question! Neural networks are a fascinating topic in the field of artificial intelligence. I\'d be happy to explain! A neural network is essentially... [200 words of filler before the actual explanation]',
      },
      good: {
        prompt: 'Explain how a neural network works in 3 sentences.\n\nDo NOT:\n- Start with "Great question" or any preamble\n- Use analogies to the human brain\n- Include disclaimers or caveats',
        response: 'A neural network processes data through layers of interconnected nodes, where each connection has a learnable weight. During training, the network adjusts these weights to minimize prediction errors using backpropagation and gradient descent. The trained network can then make predictions on new data by passing it through the same weighted layers.',
      },
    },
    codeExample: `# Negative prompting to control output
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="""You are a technical writer.

DO NOT:
- Use filler phrases ("Great question!", "I'd be happy to")
- Include disclaimers or caveats
- Use analogies unless explicitly requested
- Add introductions or conclusions
- Use bullet points (use prose instead)

Always start directly with the explanation.""",
    messages=[{
        "role": "user",
        "content": "Explain how a neural network works in 3 sentences."
    }],
)`,
    tips: [
      'Put "DO NOT" instructions in the system prompt for persistent rules',
      'Be specific — "Don\'t be verbose" is less effective than "Keep under 50 words"',
      'Combine negative and positive instructions for maximum control',
      'Use negative prompts to eliminate common LLM patterns you find annoying',
    ],
    pitfalls: [
      'Too many negatives can confuse the model about what it SHOULD do',
      'Negative instructions sometimes have the opposite effect (Streisand effect)',
      'Don\'t rely solely on negatives — always include positive guidance too',
    ],
    relatedTechniques: ['clear-instructions', 'system-prompts', 'iterative-refinement'],
  },
  {
    id: 'iterative-refinement',
    name: 'Iterative Refinement',
    category: 'optimization',
    icon: '\u{1F504}',
    color: '#ef4444',
    difficulty: 2,
    description: 'Systematically improve your prompts through a cycle of testing, analyzing failures, adjusting, and retesting. Prompt engineering is an empirical process — the first version of your prompt is never the best one.',
    whenToUse: 'Always, as a development practice. Especially important when building production prompts that need to be reliable, consistent, and performant.',
    keyPrinciple: 'Treat prompts as code: version them, test them, and iterate based on results.',
    example: {
      bad: {
        prompt: 'Write the perfect prompt on the first try and ship it to production.',
        response: '(Works 70% of the time, fails on edge cases nobody tested)',
      },
      good: {
        prompt: 'V1: "Summarize this article" → Too long\nV2: "Summarize in 3 sentences" → Missing key points\nV3: "Summarize in 3 sentences covering: main argument, evidence, conclusion" → Consistent quality',
        response: '(Works 95%+ of the time because it was tested against 50+ articles and refined 3 times)',
      },
    },
    codeExample: `# Iterative refinement workflow
import json

def test_prompt(prompt_template, test_cases):
    """Test a prompt against multiple inputs."""
    results = []
    for case in test_cases:
        prompt = prompt_template.format(**case["input"])
        response = ask(prompt)
        passed = case["validator"](response)
        results.append({
            "input": case["input"],
            "output": response,
            "passed": passed,
        })

    pass_rate = sum(r["passed"] for r in results) / len(results)
    print(f"Pass rate: {pass_rate:.0%}")
    return results

# Version your prompts and test systematically
PROMPT_V1 = "Summarize: {text}"
PROMPT_V2 = "Summarize in 3 sentences: {text}"
PROMPT_V3 = """Summarize in exactly 3 sentences covering:
1. Main argument
2. Key evidence
3. Conclusion

Text: {text}"""

# Test each version, keep the best performer
for version, prompt in [("v1", PROMPT_V1), ("v2", PROMPT_V2), ("v3", PROMPT_V3)]:
    print(f"\\n--- {version} ---")
    test_prompt(prompt, test_cases)`,
    tips: [
      'Build a test set of 10-20 diverse inputs with expected outputs',
      'Change one thing at a time so you know what improved results',
      'Log prompt versions and their pass rates',
      'Test edge cases: empty input, very long input, adversarial input',
    ],
    pitfalls: [
      'Overfitting to your test set — ensure diverse test cases',
      'Making multiple changes at once (can\'t tell what helped)',
      'Stopping too early — the first working version isn\'t the best version',
    ],
    relatedTechniques: ['self-reflection', 'negative-prompting', 'temperature-sampling'],
  },
];

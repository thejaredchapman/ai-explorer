export const skillsData = [
  {
    category: "Utility & System",
    description: "Built-in skills for managing the Claude Code environment and workflows.",
    skills: [
      {
        name: "update-config",
        command: "/update-config",
        icon: "⚙️",
        description: "Configure the Claude Code harness via settings.json. Automate behaviors ('from now on when X'), manage permissions, set env vars, and configure hooks.",
        tags: ["System", "Configuration"]
      },
      {
        name: "simplify",
        command: "/simplify",
        icon: "🧹",
        description: "Review changed code for reuse, quality, and efficiency, then automatically fix any issues found.",
        tags: ["Code Quality", "Refactoring"]
      },
      {
        name: "loop",
        command: "/loop",
        icon: "🔁",
        description: "Run a prompt or slash command on a recurring interval (e.g. /loop 5m /foo). Perfect for polling status or babysitting PRs.",
        tags: ["Automation", "Polling"]
      },
      {
        name: "claude-api",
        command: "/claude-api",
        icon: "🧠",
        description: "Build apps with the Claude API or Anthropic SDK. Automatically triggers when importing Anthropic SDKs.",
        tags: ["API", "Integration"]
      }
    ]
  },
  {
    category: "Business & Leadership",
    description: "Production-ready skills providing strategic advice and growth modeling.",
    skills: [
      {
        name: "c-level-advisor",
        command: "/c-level-advisor",
        icon: "👔",
        description: "Provides strategic business advice by channeling 10 executive roles (CEO, CTO, CFO, etc.). Delivers structured recommendations for executive decision support.",
        tags: ["Strategy", "Leadership"]
      },
      {
        name: "business-growth",
        command: "/business-growth",
        icon: "📈",
        description: "Includes customer success manager (churn prediction), sales engineer (RFP analysis), revenue operations, and contract writer. Python tools included.",
        tags: ["Growth", "Sales"]
      },
      {
        name: "finance",
        command: "/finance",
        icon: "💰",
        description: "Financial analyst skill with ratio analysis, DCF valuation, budget variance analysis, and rolling forecast construction.",
        tags: ["Finance", "Analysis"]
      }
    ]
  },
  {
    category: "Product & Project Management",
    description: "Frameworks and automations for product owners and project managers.",
    skills: [
      {
        name: "product-team",
        command: "/product-team",
        icon: "📦",
        description: "8 production-ready skills including PM toolkit (RICE prioritization), agile product owner, UX researcher, UI design system, and SaaS scaffolder.",
        tags: ["Product", "UX/UI"]
      },
      {
        name: "project-management",
        command: "/project-management",
        icon: "📋",
        description: "6 skills for Atlassian users: senior PM, scrum master (velocity forecasting), Jira expert, Confluence expert. Includes MCP integration for live automation.",
        tags: ["Agile", "Atlassian"]
      }
    ]
  },
  {
    category: "Engineering & Operations",
    description: "Advanced tier skills covering the entire software development lifecycle.",
    skills: [
      {
        name: "engineering-team",
        command: "/engineering-team",
        icon: "🛠️",
        description: "23 engineering skills covering architecture, fullstack, QA, DevOps, security, AI/ML, and specialized tools like Playwright Pro and AWS.",
        tags: ["Development", "DevOps"]
      },
      {
        name: "engineering",
        command: "/engineering",
        icon: "🏗️",
        description: "25 advanced POWERFUL-tier engineering skills covering agent design, RAG architecture, MCP servers, CI/CD, observability, and platform operations.",
        tags: ["Architecture", "Infrastructure"]
      },
      {
        name: "ra-qm-team",
        command: "/ra-qm-team",
        icon: "🏥",
        description: "12 regulatory affairs and quality management skills for HealthTech/MedTech (ISO 13485, FDA 510(k), GDPR, risk management, internal auditing).",
        tags: ["Compliance", "HealthTech"]
      }
    ]
  },
  {
    category: "Marketing",
    description: "Comprehensive marketing division skills.",
    skills: [
      {
        name: "marketing-skill",
        command: "/marketing-skill",
        icon: "🎯",
        description: "42-skill marketing division for AI coding agents. 7 specialist pods covering content, SEO, CRO, channels, growth, intelligence, and sales.",
        tags: ["Marketing", "SEO"]
      }
    ]
  }
];

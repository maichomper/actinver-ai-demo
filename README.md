# Infosel Swarm - Mastra AI Agent

A Mastra-powered AI agent system for intelligent task processing and workflow automation.

## What is Mastra?

Mastra is an open-source TypeScript agent framework that helps you build AI applications and features quickly. It provides primitives for:

- **AI Agents** with memory and tool execution capabilities
- **Workflows** for deterministic LLM call chaining
- **RAG (Retrieval-Augmented Generation)** for knowledge-based responses
- **Local Development Playground** for testing and development
- **Multiple LLM Provider Support** via Vercel AI SDK

## Project Structure

```
src/
├── mastra/
│   ├── agents/          # AI agent definitions (HoldingsExpert)
│   ├── tools/           # Financial analysis tools
│   ├── workflows/       # Investment analysis workflows
│   └── index.ts         # Main Mastra configuration
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Features

### 💰 HoldingsExpert Agent
- **Financial Analysis Expert**: Specialized in funds, ETFs, and investment analysis
- **Infosel Hub Integration**: Designed for users of the Infosel financial monitoring platform
- **Market Intelligence**: Provides insights on fund performance, risk analysis, and portfolio optimization
- **Memory Persistence**: Remembers conversation context and user preferences using LibSQL storage
- **MCP Tool Integration**: Connects to Infosel MCP server for real-time financial data and tools

### 🛠️ Financial Tools
- **Fund Analysis**: Comprehensive fund and ETF evaluation tools
- **Risk Assessment**: Portfolio risk analysis and stress testing
- **Performance Metrics**: Historical performance and benchmark comparison
- **Market Data**: Real-time market data and trend analysis
- **MCP Integration**: Dynamic tool loading from Infosel MCP server

### 🔄 Financial Workflows
- **Portfolio Analysis**: Multi-step portfolio evaluation and optimization
- **Risk Assessment**: Comprehensive risk analysis workflows
- **Investment Recommendations**: Structured investment advice generation

## Prerequisites

- Node.js `v20.9.0` or higher
- OpenAI API key

## Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd infosel-swarm
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   OPENAI_API_KEY=your-actual-api-key
   ```

## Usage

### Development Mode

Start the Mastra development server with the local playground:

```bash
npm run dev
```

This will:
- Start the Mastra development server
- Open the local playground in your browser
- Enable you to chat with your agents and test workflows

### Using HoldingsExpert Agent with Infosel MCP Tools

The HoldingsExpert agent can be used with or without MCP tools:

#### Basic Usage (No MCP)
```typescript
import { mastra } from './mastra';

const holdingsExpertAgent = mastra.getAgent('holdingsExpertAgent');
const response = await holdingsExpertAgent.generate('Explain ETFs to a beginner');
```

#### Enhanced Usage (With MCP Tools)
```typescript
import { useHoldingsExpertWithInfoselTools } from './mastra/utils/mcp-integration';

const holdingsExpertAgent = mastra.getAgent('holdingsExpertAgent');
const response = await useHoldingsExpertWithInfoselTools(
  holdingsExpertAgent, 
  'Analyze VTI performance over the last year'
);
```

### Production Build

Build the project for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## API Endpoints

The Mastra development server provides:

- **Local Playground**: Interactive chat interface for testing agents
- **API Endpoints**: RESTful endpoints for agent and workflow execution
- **Real-time Streaming**: Support for streaming responses

## Configuration

### LLM Provider

This project is configured to use OpenAI by default. You can modify the agent configuration in `src/mastra/agents/weather-agent.ts` to use other providers supported by the Vercel AI SDK.

### Storage

The project uses LibSQL for persistent storage:
- **Development**: In-memory storage (`:memory:`)
- **Production**: File-based storage (`file:../mastra.db`)

### Logging

Uses Pino logger with configurable levels:
- **Development**: `info` level
- **Customization**: Modify in `src/mastra/index.ts`

### MCP Server Integration

The project includes Model Context Protocol (MCP) integration for connecting to external tool servers:

#### Infosel MCP Server
- **Configuration**: Set in `src/mastra/mcp-config.ts`
- **Environment Variables**:
  ```bash
  INFOSEL_MCP_URL=http://localhost:3000/mcp
  INFOSEL_API_KEY=your-infosel-api-key-here
  ```
- **Features**: Dynamic tool loading, real-time financial data access
- **Usage**: Tools are loaded dynamically when needed, providing access to Infosel Hub data

#### MCP Client Features
- **Automatic Connection Management**: Handles server connections and disconnections
- **Tool Discovery**: Automatically discovers available tools from connected servers
- **Error Handling**: Graceful fallback when MCP servers are unavailable
- **Logging**: Comprehensive logging for debugging and monitoring

## Development

### Adding New Agents

1. Create a new agent file in `src/mastra/agents/`
2. Define the agent with instructions and tools
3. Register it in `src/mastra/index.ts`

### Adding New Tools

1. Create a new tool file in `src/mastra/tools/`
2. Use the `createTool` function with proper schemas
3. Add the tool to your agent's tools object

### Adding New Workflows

1. Create a new workflow file in `src/mastra/workflows/`
2. Define steps using `createStep`
3. Chain steps using `.then()` and `.commit()`
4. Register the workflow in `src/mastra/index.ts`

### Adding New MCP Servers

1. Update `src/mastra/mcp-config.ts` with new server configuration
2. Add environment variables for server connection details
3. Update utility functions in `src/mastra/utils/mcp-integration.ts`
4. Test the connection using the provided utility functions

#### MCP Server Configuration Example
```typescript
// In mcp-config.ts
export const newMCP = new MCPClient({
  servers: {
    newServer: {
      url: new URL(process.env.NEW_MCP_URL || 'http://localhost:3001/mcp'),
      requestInit: {
        headers: {
          'Authorization': `Bearer ${process.env.NEW_MCP_API_KEY}`,
        },
      },
    },
  },
});
```

## Testing

The project includes a development playground for testing:

1. Start the dev server: `npm run dev`
2. Open the playground in your browser
3. Test agent responses and workflow execution
4. Monitor logs and performance

## Deployment

### Vercel
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t infosel-swarm-mastra .
docker run -p 3000:3000 infosel-swarm-mastra
```

## Contributing

1. Follow clean code principles
2. Keep functions small and focused (15 lines max)
3. Write tests for new functionality
4. Use meaningful naming conventions
5. Follow the single responsibility principle

## License

ISC License

## Support

- [Mastra Documentation](https://docs.mastra.ai)
- [Mastra GitHub](https://github.com/mastra-ai/mastra)
- [Vercel AI SDK](https://sdk.vercel.ai/docs) 
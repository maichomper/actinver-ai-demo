import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { infoselMCP } from '../infosel-mcp-client';
import { portfolioTool } from '../tools/portfolio-tool';
import { tradeHistoryTool } from '../tools/trade-history-tool';
import { blackRockTopPerformingFundsTool } from '../tools/fixed-income-tool';
import { marketMoversTool } from '../tools/market-movers-tool';
import { effectiveReturnTool } from '../tools/effective-return-tool';
import { nominalReturnTool } from '../tools/nominal-return-tool';
import { tradingExpertInstructions } from './trading-expert-instructions';

// Create the TradingExpert agent with MCP tools
export const tradingExpertAgent = new Agent({
  name: 'TradingExpert',
  description: 'Agente especializado en trading, diseñado para usuarios de la plataforma de Actinver Trade.',
  instructions: tradingExpertInstructions,
  model: openai('gpt-4.1'),
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db',
    }),
    options: {
      lastMessages: 20, // Include last 20 messages for context
      threads: {
        generateTitle: {
          model: openai("gpt-4.1-nano"), // Use cheaper model for titles
          instructions: "Generate a concise, professional title for this financial analysis conversation based on the user's first message.",
        },
      },
    },
  }),
  tools: {
    ...(await infoselMCP.getTools()),
    portfolioTool,
    tradeHistoryTool,
    blackRockTopPerformingFundsTool,
    marketMoversTool,
    effectiveReturnTool,
    nominalReturnTool,
  },
}); 

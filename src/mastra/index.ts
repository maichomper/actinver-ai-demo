
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { weatherWorkflow } from './workflows/weather-workflow';
import { holdingsExpertAgent } from './agents/fundsage-agent';
import { infoselMCP } from './mcp-config';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { holdingsExpertAgent },
  storage: new LibSQLStore({
    // stores telemetry, evals, and conversation memory
    url: "file:./mastra.db",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});

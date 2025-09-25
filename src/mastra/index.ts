
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { holdingsExpertAgent } from './agents/holdings-expert-agent';
import { tradingExpertAgent } from './agents/trading-expert-agent';
import { simpleFundAnalysisWorkflow } from './workflows/fund-analysis-workflow';

export const mastra = new Mastra({
  workflows: {
    simpleFundAnalysisWorkflow,
  },
  agents: { holdingsExpertAgent, tradingExpertAgent },
  storage: new LibSQLStore({
    url: "file:./mastra.db",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});

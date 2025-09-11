import { createWorkflow, createStep } from '@mastra/core/workflows';
import { z } from 'zod';
import { getInfoselTool } from '../infosel-mcp-client';

// Simple workflow that calls one MCP tool directly using manual execution
export const simpleFundAnalysisWorkflow = createWorkflow({
  id: 'simple-fund-analysis-workflow',
  description: 'Simple fund analysis workflow that calls the fixed income participation MCP tool',
  inputSchema: z.object({
    issuerOrSymbol: z.string().describe('Fund issuer or symbol'),
    limit: z.number().default(10).describe('Number of results to return'),
    offset: z.number().default(0).describe('Number of results to skip'),
  }),
  outputSchema: z.object({
    issuerOrSymbol: z.string(),
    toolResult: z.any().describe('Result from the MCP tool'),
  }),
})
  .then(createStep({
    id: 'call-mcp-tool',
    description: 'Calls the infosel_funds-get-fixed-income-participation MCP tool',
    inputSchema: z.object({
      issuerOrSymbol: z.string(),
      limit: z.number().default(10),
      offset: z.number().default(0),
    }),
    outputSchema: z.object({
      toolResult: z.any(),
    }),
    execute: async ({ inputData }) => {
      const { issuerOrSymbol, limit, offset } = inputData;

      try {
        // Get the specific MCP tool
        const fixedIncomeTool = await getInfoselTool('funds-get-fixed-income-participation');
        
        // Execute the tool with the input parameters
        const result = await fixedIncomeTool.execute({
          context: { issuerOrSymbol, limit, offset },
          runtimeContext: {},
        });
        
        return {
          toolResult: result
        };
      } catch (error) {
        return {
          toolResult: `Error calling MCP tool: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
      }
    },
  }))
  .commit(); 
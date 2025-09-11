import { createWorkflow, createStep } from '@mastra/core/workflows';
import { z } from 'zod';

// Step 1: Analyze fund composition using the agent
const analyzeFundComposition = createStep({
  id: 'analyze-fund-composition',
  description: 'Analyzes the composition of a fund or ETF using the HoldingsExpert agent',
  inputSchema: z.object({
    prompt: z.string().describe('The prompt to send to the HoldingsExpert agent'),
  }),
  outputSchema: z.object({
    text: z.string().describe('Detailed analysis from the HoldingsExpert agent'),
  }),
  execute: async ({ inputData, mastra }) => {
    const { prompt } = inputData;
    
    console.log(`🚀 [Workflow] Starting analyzeFundComposition`);
    
    // Get the agent from the Mastra context at runtime (no circular dependency!)
    const agent = mastra.getAgent("holdingsExpertAgent");
    
    const response = await agent.generate([
      { role: 'user', content: prompt }
    ]);
    
    console.log(`✅ [Workflow] Completed analyzeFundComposition`);
    
    return {
      text: response.text,
    };
  },
});

// Step 2: Generate investment recommendations (COMMENTED OUT FOR TESTING)
/*
const generateRecommendations = createStep({
  id: 'generate-recommendations',
  description: 'Generates investment recommendations based on the analysis',
  inputSchema: z.object({
    analysis: z.string(),
    fundSymbol: z.string(),
    analysisType: z.string(),
  }),
  outputSchema: z.object({
    recommendations: z.string().describe('Investment recommendations and next steps'),
    riskLevel: z.enum(['low', 'medium', 'high']).describe('Assessed risk level'),
    suitability: z.enum(['conservative', 'moderate', 'aggressive']).describe('Investor suitability profile'),
  }),
  execute: async ({ inputData, mastra }) => {
    const { analysis, fundSymbol, analysisType } = inputData;
    
    // Get the agent from the Mastra context at runtime
    const agent = mastra.getAgent("holdingsExpertAgent");
    
    const prompt = `Based on this analysis of ${fundSymbol}:
    ${analysis}
    
    Please provide:
    1. Investment recommendations
    2. Risk assessment (low/medium/high)
    3. Investor suitability profile (conservative/moderate/aggressive)
    4. Next steps for the investor`;
    
    const response = await agent.generate([
      { role: 'user', content: prompt }
    ]);
    
    // Simple logic to determine risk and suitability based on keywords
    const analysisText = response.text.toLowerCase();
    let riskLevel: 'low' | 'medium' | 'high' = 'medium';
    let suitability: 'conservative' | 'moderate' | 'aggressive' = 'moderate';
    
    if (analysisText.includes('high risk') || analysisText.includes('volatile') || analysisText.includes('aggressive')) {
      riskLevel = 'high';
      suitability = 'aggressive';
    } else if (analysisText.includes('low risk') || analysisText.includes('stable') || analysisText.includes('conservative')) {
      riskLevel = 'low';
      suitability = 'conservative';
    }
    
    return {
      recommendations: response.text,
      riskLevel,
      suitability,
    };
  },
});
*/

// Step 3: Create portfolio optimization suggestions (COMMENTED OUT FOR TESTING)
/*
const optimizePortfolio = createStep({
  id: 'optimize-portfolio',
  description: 'Suggests portfolio optimization strategies',
  inputSchema: z.object({
    fundSymbol: z.string(),
    riskLevel: z.enum(['low', 'medium', 'high']),
    suitability: z.enum(['conservative', 'moderate', 'aggressive']),
  }),
  outputSchema: z.object({
    optimizationStrategy: z.string().describe('Portfolio optimization recommendations'),
    diversificationTips: z.string().describe('Diversification suggestions'),
    rebalancingAdvice: z.string().describe('Portfolio rebalancing advice'),
  }),
  execute: async ({ inputData, mastra }) => {
    const { fundSymbol, riskLevel, suitability } = inputData;
    
    // Get the agent from the Mastra context at runtime
    const agent = mastra.getAgent("holdingsExpertAgent");
    
    const prompt = `For a ${riskLevel} risk, ${suitability} investor considering ${fundSymbol}, please provide:
    1. Portfolio optimization strategy
    2. Diversification tips
    3. Rebalancing advice
    4. Asset allocation recommendations`;
    
    const response = await agent.generate([
      { role: 'user', content: prompt }
    ]);
    
    // Split the response into sections (this is a simplified approach)
    const sections = response.text.split('\n\n');
    
    return {
      optimizationStrategy: sections[0] || response.text,
      diversificationTips: sections[1] || 'Consider diversifying across different asset classes and sectors.',
      rebalancingAdvice: sections[2] || 'Regular rebalancing helps maintain target asset allocation.',
    };
  },
});
*/

// Main workflow that orchestrates the fund analysis process
export const complexFundAnalysisWorkflow = createWorkflow({
  id: 'complex-fund-analysis-workflow',
  description: 'Comprehensive fund analysis workflow using the HoldingsExpert agent',
  inputSchema: z.object({
    fundSymbol: z.string().describe('The fund symbol or identifier to analyze'),
    analysisType: z.enum(['composition', 'risk', 'performance', 'comparison']).describe('Type of analysis to perform'),
    includeOptimization: z.boolean().default(true).describe('Whether to include portfolio optimization suggestions'),
  }),
  outputSchema: z.object({
    text: z.string().describe('Detailed analysis from the HoldingsExpert agent'),
  }),
})
  .map(async ({ inputData }) => {
    // Transform workflow input to match agent's expected input schema
    // The agent expects a 'prompt' string as input according to Mastra's default schema
    const { fundSymbol, analysisType } = inputData;
    return {
      prompt: `Please analyze the ${fundSymbol} fund/ETF with focus on ${analysisType}. 
      If this is a composition analysis, please show the decomposed holdings and real composition.
      If this is a risk analysis, please assess portfolio risk and exposure.
      If this is a performance analysis, please provide benchmarks and metrics.
      If this is a comparison analysis, please compare with similar funds.`
    };
  })
  .then(analyzeFundComposition)
  // COMMENTED OUT FOR TESTING - we'll add these back one by one
  /*
  .then(generateRecommendations)
  .map(async ({ inputData, getInitData }) => {
    // Transform the recommendations output to match optimizePortfolio input
    const { riskLevel, suitability } = inputData;
    const initData = getInitData();
    
    return {
      fundSymbol: initData.fundSymbol,
      riskLevel,
      suitability,
    };
  })
  .then(optimizePortfolio)
  */
  .commit(); 
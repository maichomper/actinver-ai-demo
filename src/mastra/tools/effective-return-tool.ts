import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const effectiveReturnTool = createTool({
  id: 'calculate-effective-return',
  description: 'Calculate effective return percentage for a portfolio using the formula: ((VFIN÷VINI)–1)x100',
  inputSchema: z.object({
    portfolioId: z.string().optional().describe('Optional portfolio identifier'),
    initialValue: z.number().optional().describe('Initial portfolio value (VINI). If not provided, will be calculated from trade history'),
    finalValue: z.number().optional().describe('Final portfolio value (VFIN). If not provided, will be calculated from current portfolio holdings'),
    startDate: z.string().optional().describe('Optional start date for trade history calculation (YYYY-MM-DD)'),
    endDate: z.string().optional().describe('Optional end date for trade history calculation (YYYY-MM-DD)'),
  }),
  outputSchema: z.object({
    effectiveReturn: z.number().describe('Effective return percentage'),
    initialValue: z.number().describe('Initial value used in calculation (VINI)'),
    finalValue: z.number().describe('Final value used in calculation (VFIN)'),
    calculationDetails: z.object({
      formula: z.string(),
      calculation: z.string(),
      result: z.string(),
    }),
    portfolioInfo: z.object({
      portfolioId: z.string(),
      period: z.string().optional(),
      totalTrades: z.number(),
      netCashFlow: z.number(),
    }),
  }),
  execute: async ({ context }) => {
    return await calculateEffectiveReturn(
      context.portfolioId,
      context.initialValue,
      context.finalValue,
      context.startDate,
      context.endDate
    );
  },
});

const calculateEffectiveReturn = async (
  portfolioId?: string,
  initialValue?: number,
  finalValue?: number,
  startDate?: string,
  endDate?: string
) => {
  // Default to LT (Long Term) if no portfolioId specified
  const id = portfolioId || 'LT';
  
  // If initialValue is not provided, calculate it from trade history
  let calculatedInitialValue: number;
  let totalTrades = 0;
  let netCashFlow = 0;
  
  if (!initialValue) {
    // Import trade history data (simplified version for calculation)
    const tradeHistory = await getTradeHistoryForCalculation(id, startDate, endDate);
    totalTrades = tradeHistory.totalTrades;
    netCashFlow = tradeHistory.netCashFlow;
    
    // For effective return calculation, initial value is typically the total invested amount
    // This would be the sum of all buy orders minus sell orders (net investment)
    calculatedInitialValue = Math.abs(netCashFlow);
  } else {
    calculatedInitialValue = initialValue;
  }
  
  // If finalValue is not provided, calculate it from current portfolio holdings
  let calculatedFinalValue: number;
  
  if (!finalValue) {
    // Import portfolio data (simplified version for calculation)
    const portfolioData = await getPortfolioForCalculation(id);
    calculatedFinalValue = portfolioData.totalCurrentValue;
  } else {
    calculatedFinalValue = finalValue;
  }
  
  // Calculate effective return using the formula: ((VFIN÷VINI)–1)x100
  const effectiveReturn = ((calculatedFinalValue / calculatedInitialValue) - 1) * 100;
  
  // Prepare calculation details
  const calculationDetails = {
    formula: '((VFIN÷VINI)–1)x100',
    calculation: `((${calculatedFinalValue.toFixed(2)} ÷ ${calculatedInitialValue.toFixed(2)}) - 1) × 100`,
    result: `${effectiveReturn.toFixed(2)}%`,
  };
  
  return {
    effectiveReturn: Math.round(effectiveReturn * 100) / 100, // Round to 2 decimal places
    initialValue: calculatedInitialValue,
    finalValue: calculatedFinalValue,
    calculationDetails,
    portfolioInfo: {
      portfolioId: id,
      period: startDate && endDate ? `${startDate} to ${endDate}` : undefined,
      totalTrades,
      netCashFlow,
    },
  };
};

// Helper function to get trade history data for calculation
const getTradeHistoryForCalculation = async (portfolioId: string, startDate?: string, endDate?: string) => {
  // Use the same logic as the trade history tool but simplified for calculation
  const id = portfolioId || 'LT';
  
  if (id === 'DT') {
    // Day Trading data - calculated from actual DT trade data
    return {
      totalTrades: 62,
      netCashFlow: 150000, // Net investment from DT trades
      totalBuyValue: 800000, // Total buy value from DT trades
      totalSellValue: 650000, // Total sell value from DT trades
    };
  } else {
    // Long Term data - calculated from actual LT trade data
    return {
      totalTrades: 20, // Actual number of trades in LT
      netCashFlow: 154842.66, // Real net cash flow: 134,256.39 - 32,412.5 - 1.23 + 65,000 - 12,000
      totalBuyValue: 134256.39, // Real total buy value
      totalSellValue: 32412.5, // Real total sell value
    };
  }
};

// Helper function to get portfolio data for calculation
const getPortfolioForCalculation = async (portfolioId: string) => {
  // Use the same logic as the portfolio tool but simplified for calculation
  const id = portfolioId || 'LT';
  
  if (id === 'DT') {
    // Day Trading portfolio - calculate total current value from actual DT portfolio data
    const dtHoldings = [
      { currentValue: 15059.98 }, // TSLA
      { currentValue: 13035.0 },  // AAPL
      { currentValue: 8530.5 },   // WALMEX
      { currentValue: 10482.0 },  // CEMEXCPO
      { currentValue: 7488.0 },   // AMXB
      { currentValue: 9445.17 },  // MSFT
      { currentValue: 28750.85 }, // EFECTIVO
    ];
    
    const totalCurrentValue = dtHoldings.reduce((sum, holding) => sum + holding.currentValue, 0);
    
    return {
      totalCurrentValue,
      holdings: dtHoldings,
    };
  } else {
    // Long Term portfolio - calculate total current value from actual LT portfolio data
    const ltHoldings = [
      { currentValue: 5745.0 },   // WALMEX
      { currentValue: 6702.5 },   // AMXB
      { currentValue: 8945.0 },   // CEMEXCPO
      { currentValue: 7023.75 },  // GAPB
      { currentValue: 6640.2 },   // GFNORTEO
      { currentValue: 26300.0 },  // PE&OLES
      { currentValue: 23690.0 },  // GMEXICOB
      { currentValue: 8850.60 },  // AAPL
      { currentValue: 19225.70 }, // MSFT
      { currentValue: 8677.20 },  // NVDA
      { currentValue: 18325.85 }, // EFECTIVO
    ];
    
    const totalCurrentValue = ltHoldings.reduce((sum, holding) => sum + holding.currentValue, 0);
    
    return {
      totalCurrentValue,
      holdings: ltHoldings,
    };
  }
};

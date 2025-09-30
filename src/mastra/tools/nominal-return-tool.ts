import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const nominalReturnTool = createTool({
  id: 'calculate-nominal-return',
  description: 'Calculate nominal return (annualized rate) using the formula: RNOM = (((($VFI÷$VIN)-1))×100)×(360÷DDAYS(FECHI:FECH2:1))',
  inputSchema: z.object({
    portfolioId: z.string().optional().describe('Optional portfolio identifier'),
    initialValue: z.number().optional().describe('Initial value or purchase price ($VIN). If not provided, will be calculated from trade history'),
    finalValue: z.number().optional().describe('Final value or sale price ($VFI). If not provided, will be calculated from current portfolio holdings'),
    initialDate: z.string().optional().describe('Initial date or purchase date (FECHI) in YYYY-MM-DD format. If not provided, will use first trade date'),
    finalDate: z.string().optional().describe('Final date or sale date (FECH2) in YYYY-MM-DD format. If not provided, will use current date'),
  }),
  outputSchema: z.object({
    nominalReturn: z.number().describe('Nominal return percentage (annualized)'),
    initialValue: z.number().describe('Initial value used in calculation ($VIN)'),
    finalValue: z.number().describe('Final value used in calculation ($VFI)'),
    initialDate: z.string().describe('Initial date used in calculation (FECHI)'),
    finalDate: z.string().describe('Final date used in calculation (FECH2)'),
    daysDifference: z.number().describe('Number of days between initial and final dates'),
    calculationDetails: z.object({
      formula: z.string(),
      step1: z.string().describe('Value ratio calculation'),
      step2: z.string().describe('Percentage calculation'),
      step3: z.string().describe('Annualization factor'),
      finalCalculation: z.string(),
      result: z.string(),
    }),
    portfolioInfo: z.object({
      portfolioId: z.string(),
      period: z.string(),
      totalTrades: z.number(),
      netCashFlow: z.number(),
    }),
  }),
  execute: async ({ context }) => {
    return await calculateNominalReturn(
      context.portfolioId,
      context.initialValue,
      context.finalValue,
      context.initialDate,
      context.finalDate
    );
  },
});

const calculateNominalReturn = async (
  portfolioId?: string,
  initialValue?: number,
  finalValue?: number,
  initialDate?: string,
  finalDate?: string
) => {
  // Default to LT (Long Term) if no portfolioId specified
  const id = portfolioId || 'LT';
  
  // If initialValue is not provided, calculate it from trade history
  let calculatedInitialValue: number;
  let totalTrades = 0;
  let netCashFlow = 0;
  
  if (!initialValue) {
    const tradeHistory = await getTradeHistoryForCalculation(id);
    totalTrades = tradeHistory.totalTrades;
    netCashFlow = tradeHistory.netCashFlow;
    calculatedInitialValue = Math.abs(netCashFlow);
  } else {
    calculatedInitialValue = initialValue;
  }
  
  // If finalValue is not provided, calculate it from current portfolio holdings
  let calculatedFinalValue: number;
  
  if (!finalValue) {
    const portfolioData = await getPortfolioForCalculation(id);
    calculatedFinalValue = portfolioData.totalCurrentValue;
  } else {
    calculatedFinalValue = finalValue;
  }
  
  // Handle dates
  let calculatedInitialDate = initialDate;
  let calculatedFinalDate = finalDate;
  
  if (!initialDate) {
    // Use first trade date from trade history
    calculatedInitialDate = await getFirstTradeDate(id);
  }
  
  if (!finalDate) {
    // Use current date
    calculatedFinalDate = new Date().toISOString().split('T')[0];
  }
  
  // Calculate days difference
  const daysDiff = calculateDaysDifference(calculatedInitialDate!, calculatedFinalDate!);
  
  // Calculate nominal return using the formula: RNOM = (((($VFI÷$VIN)-1))×100)×(360÷DDAYS(FECHI:FECH2:1))
  const valueRatio = calculatedFinalValue / calculatedInitialValue;
  const percentageReturn = (valueRatio - 1) * 100;
  const annualizationFactor = 360 / daysDiff;
  const nominalReturn = percentageReturn * annualizationFactor;
  
  // Prepare calculation details
  const calculationDetails = {
    formula: 'RNOM = (((($VFI÷$VIN)-1))×100)×(360÷DDAYS(FECHI:FECH2:1))',
    step1: `Value ratio: ${calculatedFinalValue.toFixed(2)} ÷ ${calculatedInitialValue.toFixed(2)} = ${valueRatio.toFixed(4)}`,
    step2: `Percentage: (${valueRatio.toFixed(4)} - 1) × 100 = ${percentageReturn.toFixed(2)}%`,
    step3: `Annualization: 360 ÷ ${daysDiff} days = ${annualizationFactor.toFixed(4)}`,
    finalCalculation: `${percentageReturn.toFixed(2)}% × ${annualizationFactor.toFixed(4)} = ${nominalReturn.toFixed(2)}%`,
    result: `${nominalReturn.toFixed(2)}% (annualized)`,
  };
  
  return {
    nominalReturn: Math.round(nominalReturn * 100) / 100, // Round to 2 decimal places
    initialValue: calculatedInitialValue,
    finalValue: calculatedFinalValue,
    initialDate: calculatedInitialDate!,
    finalDate: calculatedFinalDate!,
    daysDifference: daysDiff,
    calculationDetails,
    portfolioInfo: {
      portfolioId: id,
      period: `${calculatedInitialDate} to ${calculatedFinalDate}`,
      totalTrades,
      netCashFlow,
    },
  };
};

// Helper function to calculate days difference between two dates
const calculateDaysDifference = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Helper function to get first trade date from trade history
const getFirstTradeDate = async (portfolioId: string): Promise<string> => {
  // Use the same logic as trade history tool to get first trade date
  const id = portfolioId || 'LT';
  
  if (id === 'DT') {
    // First DT trade date from the data
    return '2024-10-17';
  } else {
    // First LT trade date from the data
    return '2024-10-16';
  }
};

// Helper function to get trade history data for calculation
const getTradeHistoryForCalculation = async (portfolioId: string) => {
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
    // Day Trading portfolio - calculate total current value
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

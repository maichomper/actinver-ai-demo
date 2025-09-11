import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const portfolioTool = createTool({
  id: 'get-portfolio',
  description: 'Get portfolio holdings data with decomposed instrument details',
  inputSchema: z.object({
    portfolioId: z.string().optional().describe('Optional portfolio identifier'),
  }),
  outputSchema: z.object({
    data: z.array(z.object({
      description: z.string(),
      marketType: z.string(),
      symbol: z.string(),
      series: z.string(),
      instrumentType: z.string(),
      shares: z.number(),
      price: z.number(),
      lastTradedPrice: z.number(),
      currentValue: z.number(),
      plusMinus: z.number(),
      plusMinusPercentage: z.string(),
      percentageChange: z.number(),
    })),
  }),
  execute: async ({ context }) => {
    return await getPortfolio(context.portfolioId);
  },
});

const getPortfolio = async (portfolioId?: string) => {
  // For now, return realistic dummy data
  // In the future, this would fetch real portfolio data from an API
  return {
    data: [
      {
        description: "APPLE INC",
        marketType: "NASDAQ",
        symbol: "AAPL",
        series: "",
        instrumentType: "STOCK",
        shares: 150,
        price: 185.64,
        lastTradedPrice: 185.64,
        currentValue: 27846.00,
        plusMinus: 1245.00,
        plusMinusPercentage: "4.68%",
        percentageChange: 4.68
      },
      {
        description: "MICROSOFT CORPORATION",
        marketType: "NASDAQ",
        symbol: "MSFT",
        series: "",
        instrumentType: "STOCK",
        shares: 200,
        price: 378.85,
        lastTradedPrice: 378.85,
        currentValue: 75770.00,
        plusMinus: 3240.00,
        plusMinusPercentage: "4.47%",
        percentageChange: 4.47
      },
      {
        description: "META PLATFORMS INC",
        marketType: "NASDAQ",
        symbol: "META",
        series: "",
        instrumentType: "STOCK",
        shares: 100,
        price: 485.58,
        lastTradedPrice: 485.58,
        currentValue: 48558.00,
        plusMinus: 2158.00,
        plusMinusPercentage: "4.65%",
        percentageChange: 4.65
      },
      {
        description: "ISHARES CORE S&P 500 ETF",
        marketType: "NYSE ARCA",
        symbol: "IVV",
        series: "",
        instrumentType: "ETF",
        shares: 300,
        price: 456.78,
        lastTradedPrice: 456.78,
        currentValue: 137034.00,
        plusMinus: 5234.00,
        plusMinusPercentage: "3.97%",
        percentageChange: 3.97
      }
    ]
  };
};

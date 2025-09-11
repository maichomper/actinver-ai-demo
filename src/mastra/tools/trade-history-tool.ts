import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const tradeHistoryTool = createTool({
  id: 'get-trade-history',
  description: 'Get historical trading transactions for portfolio analysis',
  inputSchema: z.object({
    portfolioId: z.string().optional().describe('Optional portfolio identifier'),
    startDate: z.string().optional().describe('Optional start date for filtering (YYYY-MM-DD)'),
    endDate: z.string().optional().describe('Optional end date for filtering (YYYY-MM-DD)'),
  }),
  outputSchema: z.object({
    data: z.array(z.object({
      tradeId: z.string(),
      symbol: z.string(),
      description: z.string(),
      tradeDate: z.string(),
      tradeType: z.enum(['BUY', 'SELL']),
      shares: z.number(),
      price: z.number(),
      totalValue: z.number(),
      commission: z.number(),
      netValue: z.number(),
      marketType: z.string(),
      instrumentType: z.string(),
      notes: z.string().optional(),
    })),
    summary: z.object({
      totalTrades: z.number(),
      totalBuyValue: z.number(),
      totalSellValue: z.number(),
      totalCommission: z.number(),
      netCashFlow: z.number(),
    }),
  }),
  execute: async ({ context }) => {
    return await getTradeHistory(context.portfolioId, context.startDate, context.endDate);
  },
});

const getTradeHistory = async (portfolioId?: string, startDate?: string, endDate?: string) => {
  // For now, return realistic dummy data that aligns with portfolio holdings
  // In the future, this would fetch real trade history from an API
  const trades = [
    {
      tradeId: "TR-2024-001",
      symbol: "AAPL",
      description: "APPLE INC",
      tradeDate: "2024-01-15",
      tradeType: "BUY" as const,
      shares: 100,
      price: 178.50,
      totalValue: 17850.00,
      commission: 9.99,
      netValue: 17859.99,
      marketType: "NASDAQ",
      instrumentType: "STOCK",
      notes: "Initial position in Apple"
    },
    {
      tradeId: "TR-2024-002",
      symbol: "MSFT",
      description: "MICROSOFT CORPORATION",
      tradeDate: "2024-01-20",
      tradeType: "BUY" as const,
      shares: 200,
      price: 362.75,
      totalValue: 72550.00,
      commission: 9.99,
      netValue: 72559.99,
      marketType: "NASDAQ",
      instrumentType: "STOCK",
      notes: "Core Microsoft position"
    },
    {
      tradeId: "TR-2024-003",
      symbol: "META",
      description: "META PLATFORMS INC",
      tradeDate: "2024-02-01",
      tradeType: "BUY" as const,
      shares: 100,
      price: 463.92,
      totalValue: 46392.00,
      commission: 9.99,
      netValue: 46401.99,
      marketType: "NASDAQ",
      instrumentType: "STOCK",
      notes: "Social media exposure"
    },
    {
      tradeId: "TR-2024-004",
      symbol: "IVV",
      description: "ISHARES CORE S&P 500 ETF",
      tradeDate: "2024-02-15",
      tradeType: "BUY" as const,
      shares: 150,
      price: 439.25,
      totalValue: 65887.50,
      commission: 4.99,
      netValue: 65892.49,
      marketType: "NYSE ARCA",
      instrumentType: "ETF",
      notes: "First S&P 500 position"
    },
    {
      tradeId: "TR-2024-005",
      symbol: "IVV",
      description: "ISHARES CORE S&P 500 ETF",
      tradeDate: "2024-03-01",
      tradeType: "BUY" as const,
      shares: 150,
      price: 447.50,
      totalValue: 67125.00,
      commission: 4.99,
      netValue: 67129.99,
      marketType: "NYSE ARCA",
      instrumentType: "ETF",
      notes: "Additional S&P 500 exposure"
    },
    {
      tradeId: "TR-2024-006",
      symbol: "AAPL",
      description: "APPLE INC",
      tradeDate: "2024-03-15",
      tradeType: "BUY" as const,
      shares: 50,
      price: 182.30,
      totalValue: 9115.00,
      commission: 9.99,
      netValue: 9124.99,
      marketType: "NASDAQ",
      instrumentType: "STOCK",
      notes: "Added to Apple position"
    }
  ];

  // Calculate summary statistics
  const totalTrades = trades.length;
  const totalBuyValue = trades.reduce((sum, trade) => sum + trade.totalValue, 0);
  const totalSellValue = 0; // No sells in this example
  const totalCommission = trades.reduce((sum, trade) => sum + trade.commission, 0);
  const netCashFlow = trades.reduce((sum, trade) => sum + trade.netValue, 0);

  return {
    data: trades,
    summary: {
      totalTrades,
      totalBuyValue,
      totalSellValue,
      totalCommission,
      netCashFlow,
    }
  };
};

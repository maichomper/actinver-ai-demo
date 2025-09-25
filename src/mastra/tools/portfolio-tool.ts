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
  
  // Default to LT (Long Term) if no portfolioId specified
  const id = portfolioId || 'LT';
  
  if (id === 'DT') {
    // Day Trading portfolio data
    return {
      "data": [
        {
            "description": "TESLA, INC.",
            "marketType": "SIC",
            "symbol": "TSLA",
            "series": "*",
            "instrumentType": "ACCION",
            "shares": 2,
            "price": 7945.30,
            "lastTradedPrice": 7529.99,
            "currentValue": 15059.98,
            "plusMinus": -830.62,
            "plusMinusPercentage": "-5.22%",
            "percentageChange": -0.0522
        },
        {
            "description": "APPLE COMPUTER INC.",
            "marketType": "SIC",
            "symbol": "AAPL",
            "series": "*",
            "instrumentType": "ACCION",
            "shares": 3,
            "price": 4385.50,
            "lastTradedPrice": 4345.0,
            "currentValue": 13035.0,
            "plusMinus": -121.5,
            "plusMinusPercentage": "-0.92%",
            "percentageChange": -0.0092
        },
        {
            "description": "WAL-MART DE MEXICO, S.A.B. DE C.V.",
            "marketType": "MC",
            "symbol": "WALMEX",
            "series": "*",
            "instrumentType": "ACCION",
            "shares": 150,
            "price": 58.45,
            "lastTradedPrice": 56.87,
            "currentValue": 8530.5,
            "plusMinus": -237.0,
            "plusMinusPercentage": "-2.70%",
            "percentageChange": -0.0270
        },
        {
            "description": "CEMEX, S.A.B. DE C.V.",
            "marketType": "MC",
            "symbol": "CEMEXCPO",
            "series": "CPO",
            "instrumentType": "ACCION",
            "shares": 600,
            "price": 16.25,
            "lastTradedPrice": 17.47,
            "currentValue": 10482.0,
            "plusMinus": 732.0,
            "plusMinusPercentage": "+7.51%",
            "percentageChange": 0.0751
        },
        {
            "description": "AMERICA MOVIL, S.A.B. DE C.V.",
            "marketType": "MC",
            "symbol": "AMXB",
            "series": "B",
            "instrumentType": "ACCION",
            "shares": 400,
            "price": 17.80,
            "lastTradedPrice": 18.72,
            "currentValue": 7488.0,
            "plusMinus": 368.0,
            "plusMinusPercentage": "+5.17%",
            "percentageChange": 0.0517
        },
        {
            "description": "MICROSOFT CORPORATION",
            "marketType": "SIC",
            "symbol": "MSFT",
            "series": "*",
            "instrumentType": "ACCION",
            "shares": 1,
            "price": 8850.75,
            "lastTradedPrice": 9445.17,
            "currentValue": 9445.17,
            "plusMinus": 594.42,
            "plusMinusPercentage": "+6.72%",
            "percentageChange": 0.0672
        },
        {
            "description": "-",
            "marketType": "EF",
            "symbol": "EFECTIVO",
            "series": "",
            "instrumentType": "-",
            "shares": 0,
            "price": 0.0,
            "lastTradedPrice": 0.0,
            "currentValue": 28750.85,
            "plusMinus": 0.0,
            "plusMinusPercentage": "%",
            "percentageChange": 0.0
        }
    ]
  };
  } else {
    // Long Term portfolio data (LT)
    return {
      "data": [
        {
            "description": "WAL-MART DE MEXICO, S.A.B. DE C.V.",
            "marketType": "MC",
            "symbol": "WALMEX",
            "series": "*",
            "instrumentType": "ACCION",
            "shares": 150,
            "price": 58.99,
            "lastTradedPrice": 56.87,
            "currentValue": 8530.5,
            "plusMinus": -318.0,
            "plusMinusPercentage": "-3.59%",
            "percentageChange": -0.0359
        },
        {
            "description": "FOMENTO ECONOMICO MEXICANO, S.A.B. DE C.V.",
            "marketType": "MC",
            "symbol": "FEMSAUBD",
            "series": "UBD",
            "instrumentType": "ACCION",
            "shares": 40,
            "price": 193.97,
            "lastTradedPrice": 173.14,
            "currentValue": 6925.6,
            "plusMinus": -833.2,
            "plusMinusPercentage": "-10.74%",
            "percentageChange": -0.1074
        },
        {
            "description": "AMERICA MOVIL, S.A.B. DE C.V.",
            "marketType": "MC",
            "symbol": "AMXB",
            "series": "B",
            "instrumentType": "ACCION",
            "shares": 350,
            "price": 15.31,
            "lastTradedPrice": 18.72,
            "currentValue": 6552.0,
            "plusMinus": 1193.5,
            "plusMinusPercentage": "+22.27%",
            "percentageChange": 0.2227
        },
        {
            "description": "CEMEX, S.A.B. DE C.V.",
            "marketType": "MC",
            "symbol": "CEMEXCPO",
            "series": "CPO",
            "instrumentType": "ACCION",
            "shares": 500,
            "price": 11.81,
            "lastTradedPrice": 17.47,
            "currentValue": 8735.0,
            "plusMinus": 2830.0,
            "plusMinusPercentage": "+47.93%",
            "percentageChange": 0.4793
        },
        {
            "description": "GRUPO AEROPORTUARIO DEL PACIFICO, S.A. DE C.V.",
            "marketType": "MC",
            "symbol": "GAPB",
            "series": "B",
            "instrumentType": "ACCION",
            "shares": 15,
            "price": 344.32,
            "lastTradedPrice": 461.0,
            "currentValue": 6915.0,
            "plusMinus": 1750.2,
            "plusMinusPercentage": "+33.89%",
            "percentageChange": 0.3389
        },
        {
            "description": "GRUPO FINANCIERO BANORTE, S.A.B. DE C.V.",
            "marketType": "MC",
            "symbol": "GFNORTEO",
            "series": "O",
            "instrumentType": "ACCION",
            "shares": 35,
            "price": 144.83,
            "lastTradedPrice": 185.46,
            "currentValue": 6491.1,
            "plusMinus": 1422.05,
            "plusMinusPercentage": "+28.05%",
            "percentageChange": 0.2805
        },
        {
            "description": "GRUPO BIMBO, S.A.B. DE C.V.",
            "marketType": "MC",
            "symbol": "BIMBOA",
            "series": "A",
            "instrumentType": "ACCION",
            "shares": 100,
            "price": 65.09,
            "lastTradedPrice": 65.01,
            "currentValue": 6501.0,
            "plusMinus": -8.0,
            "plusMinusPercentage": "-0.12%",
            "percentageChange": -0.0012
        },
        {
            "description": "APPLE COMPUTER INC.",
            "marketType": "SIC",
            "symbol": "AAPL",
            "series": "*",
            "instrumentType": "ACCION",
            "shares": 2,
            "price": 4410.8,
            "lastTradedPrice": 4345.0,
            "currentValue": 8690.0,
            "plusMinus": -131.6,
            "plusMinusPercentage": "-1.49%",
            "percentageChange": -0.0149
        },
        {
            "description": "TESLA, INC.",
            "marketType": "SIC",
            "symbol": "TSLA",
            "series": "*",
            "instrumentType": "ACCION",
            "shares": 2,
            "price": 8281.67,
            "lastTradedPrice": 7529.99,
            "currentValue": 15059.98,
            "plusMinus": -1503.36,
            "plusMinusPercentage": "-9.08%",
            "percentageChange": -0.0908
        },
        {
            "description": "MICROSOFT CORPORATION",
            "marketType": "SIC",
            "symbol": "MSFT",
            "series": "*",
            "instrumentType": "ACCION",
            "shares": 1,
            "price": 8281.67,
            "lastTradedPrice": 9445.17,
            "currentValue": 9445.17,
            "plusMinus": 1163.5,
            "plusMinusPercentage": "+14.05%",
            "percentageChange": 0.1405
        },
        {
            "description": "-",
            "marketType": "EF",
            "symbol": "EFECTIVO",
            "series": "",
            "instrumentType": "-",
            "shares": 0,
            "price": 0.0,
            "lastTradedPrice": 0.0,
            "currentValue": -2450.0,
            "plusMinus": 0.0,
            "plusMinusPercentage": "%",
            "percentageChange": 0.0
        }
    ]
  };
  }
};
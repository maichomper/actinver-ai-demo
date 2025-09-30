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
          "shares": 100,
          "price": 58.99,
          "lastTradedPrice": 57.45,
          "currentValue": 5745.0,
          "plusMinus": -154.0,
          "plusMinusPercentage": "-2.61%",
          "percentageChange": -0.0261
      },
      {
          "description": "AMERICA MOVIL, S.A.B. DE C.V.",
          "marketType": "MC",
          "symbol": "AMXB",
          "series": "B",
          "instrumentType": "ACCION",
          "shares": 350,
          "price": 15.31,
          "lastTradedPrice": 19.15,
          "currentValue": 6702.5,
          "plusMinus": 1344.0,
          "plusMinusPercentage": "+25.08%",
          "percentageChange": 0.2508
      },
      {
          "description": "CEMEX, S.A.B. DE C.V.",
          "marketType": "MC",
          "symbol": "CEMEXCPO",
          "series": "CPO",
          "instrumentType": "ACCION",
          "shares": 500,
          "price": 11.81,
          "lastTradedPrice": 17.89,
          "currentValue": 8945.0,
          "plusMinus": 3040.0,
          "plusMinusPercentage": "+51.52%",
          "percentageChange": 0.5152
      },
      {
          "description": "GRUPO AEROPORTUARIO DEL PACIFICO, S.A. DE C.V.",
          "marketType": "MC",
          "symbol": "GAPB",
          "series": "B",
          "instrumentType": "ACCION",
          "shares": 15,
          "price": 344.32,
          "lastTradedPrice": 468.25,
          "currentValue": 7023.75,
          "plusMinus": 1859.55,
          "plusMinusPercentage": "+36.03%",
          "percentageChange": 0.3603
      },
      {
          "description": "GRUPO FINANCIERO BANORTE, S.A.B. DE C.V.",
          "marketType": "MC",
          "symbol": "GFNORTEO",
          "series": "O",
          "instrumentType": "ACCION",
          "shares": 35,
          "price": 144.83,
          "lastTradedPrice": 189.72,
          "currentValue": 6640.2,
          "plusMinus": 1571.15,
          "plusMinusPercentage": "+30.99%",
          "percentageChange": 0.3099
      },
      {
          "description": "INDUSTRIAS PEÑOLES, S.A.B. DE C.V.",
          "marketType": "MC",
          "symbol": "PE&OLES",
          "series": "*",
          "instrumentType": "ACCION",
          "shares": 80,
          "price": 315.50,
          "lastTradedPrice": 328.75,
          "currentValue": 26300.0,
          "plusMinus": 1060.0,
          "plusMinusPercentage": "+4.20%",
          "percentageChange": 0.0420
      },
      {
          "description": "GRUPO MEXICO, S.A.B. DE C.V.",
          "marketType": "MC",
          "symbol": "GMEXICOB",
          "series": "B",
          "instrumentType": "ACCION",
          "shares": 200,
          "price": 112.80,
          "lastTradedPrice": 118.45,
          "currentValue": 23690.0,
          "plusMinus": 1130.0,
          "plusMinusPercentage": "+5.01%",
          "percentageChange": 0.0501
      },
      {
          "description": "APPLE COMPUTER INC.",
          "marketType": "SIC",
          "symbol": "AAPL",
          "series": "*",
          "instrumentType": "ACCION",
          "shares": 2,
          "price": 4410.8,
          "lastTradedPrice": 4425.30,
          "currentValue": 8850.60,
          "plusMinus": 29.0,
          "plusMinusPercentage": "+0.33%",
          "percentageChange": 0.0033
      },
      {
          "description": "MICROSOFT CORPORATION",
          "marketType": "SIC",
          "symbol": "MSFT",
          "series": "*",
          "instrumentType": "ACCION",
          "shares": 2,
          "price": 8281.67,
          "lastTradedPrice": 9612.85,
          "currentValue": 19225.70,
          "plusMinus": 2662.36,
          "plusMinusPercentage": "+16.08%",
          "percentageChange": 0.1608
      },
      {
          "description": "NVIDIA CORPORATION",
          "marketType": "SIC",
          "symbol": "NVDA",
          "series": "*",
          "instrumentType": "ACCION",
          "shares": 3,
          "price": 2750.25,
          "lastTradedPrice": 2892.40,
          "currentValue": 8677.20,
          "plusMinus": 426.45,
          "plusMinusPercentage": "+5.17%",
          "percentageChange": 0.0517
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
          "currentValue": 18325.85,
          "plusMinus": 0.0,
          "plusMinusPercentage": "%",
          "percentageChange": 0.0
      }
    ]
  };
  }
};
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const marketMoversTool = createTool({
  id: 'market-movers',
  description: 'Get top market movers by percentage change from the Infosel API',
  inputSchema: z.object({
    limit: z.number().optional().describe('Number of instruments to return (default: 20, max: 20)'),
    condition: z.enum(['top', 'bottom']).optional().describe('Whether to get top gainers or bottom losers (default: top)'),
  }),
  outputSchema: z.object({
    data: z.array(z.object({
      instrumento: z.string(),
      tipoMercado: z.number(),
      tipoValor: z.number(),
      bolsa: z.number(),
      descripcionInstrumento: z.string(),
      emisora: z.string(),
      serie: z.string(),
      precioActual: z.number(),
      importeTotal: z.number(),
      hora: z.string(),
      monitorHora: z.string(),
      monitorPrecio: z.number(),
      precioAnterior: z.number(),
      porcentaje: z.number(),
      variacion: z.number(),
      volumenTotal: z.number(),
      posturaPrecioCompra: z.number(),
      posturaVolumenCompra: z.number(),
      posturaPrecioVenta: z.number(),
      posturaVolumenVenta: z.number(),
      precioMaximoDia: z.number(),
      precioMinimoDia: z.number(),
      numeroOperaciones: z.number(),
      operacion: z.string(),
      precioPromedio: z.number(),
      monitorVolumen: z.number(),
      monitorFecha: z.string(),
      folioCid: z.number(),
      isin: z.string(),
      fechaPrecioActual: z.string(),
      posturaFecha: z.string(),
      precioPP: z.number(),
      pppOficial: z.string(),
      aireCierre: z.number(),
      precioApertura: z.number(),
      precioMaximo: z.number(),
      precioMinimo: z.number(),
      posturaHora: z.string(),
      fechaPrecioAnterior: z.string(),
      volumenHecho: z.number(),
      comprador: z.number(),
      vendedor: z.number(),
      accion: z.number(),
      picoLote: z.string(),
      precioPico: z.number(),
      volumenPico: z.number(),
      importePico: z.number(),
      fechaPico: z.string(),
      rendimientoSemanal: z.number(),
      rendimientoMensual: z.number(),
      rendimientoAnual: z.number(),
      rendimientoAlAnio: z.number(),
      volumenMaximo52s: z.number(),
      volumenMinimo52s: z.number(),
      volumenPromedio3a: z.number(),
      volumenPromedio3m: z.number(),
      horaPico: z.string(),
      tipoInstrumento: z.string(),
      spread: z.number(),
      spreadPorcentaje: z.number(),
      oportunidadInformacion: z.string(),
      instrumentKey: z.string(),
      descripcion: z.string(),
    })),
    metadata: z.object({
      limit: z.number(),
      condition: z.string(),
      marketTypeId: z.number(),
      endpoint: z.string(),
    }),
  }),
  execute: async ({ context }) => {
    return await getMarketMovers(context.limit, context.condition);
  },
});

const getMarketMovers = async (limit = 20, condition = 'top') => {
  console.log('🔍 [Market Movers] Starting API call...');
  console.log('🔍 [Market Movers] Parameters:', { limit, condition });
  
  // Validate limit
  const validatedLimit = Math.min(Math.max(limit || 20, 1), 20);
  console.log('🔍 [Market Movers] Validated limit:', validatedLimit);
  
  // Get API token from environment variable
  const apiToken = process.env.MARKET_DATA_API_TOKEN;
  console.log('🔍 [Market Movers] API token exists:', !!apiToken);
  console.log('🔍 [Market Movers] API token length:', apiToken ? apiToken.length : 0);
  
  if (!apiToken) {
    console.error('❌ [Market Movers] No API token found in environment variables');
    throw new Error('MARKET_DATA_API_TOKEN environment variable is required');
  }
  
  // Construct the API endpoint
  const endpoint = `https://hub-market-prodaws.infosel-digitalfactory.com/api/v3/instruments/last/dynamic?value=porcentaje&marketTypeId=1&limit=${validatedLimit}&condition=${condition}`;
  console.log('🔍 [Market Movers] Endpoint:', endpoint);
  
  try {
    console.log('🔍 [Market Movers] Making API call...');
    
    // Make the API call with Bearer token authentication
    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('🔍 [Market Movers] Response status:', response.status);
    console.log('🔍 [Market Movers] Response status text:', response.statusText);
    console.log('🔍 [Market Movers] Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      console.error('❌ [Market Movers] API request failed:', response.status, response.statusText);
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }
    
    console.log('🔍 [Market Movers] Parsing response JSON...');
    const apiData = await response.json();
    console.log('🔍 [Market Movers] Raw API response type:', typeof apiData);
    console.log('🔍 [Market Movers] Raw API response is array:', Array.isArray(apiData));
    console.log('🔍 [Market Movers] Raw API response keys:', typeof apiData === 'object' && apiData !== null ? Object.keys(apiData) : 'N/A');
    console.log('🔍 [Market Movers] Raw API response full structure:', JSON.stringify(apiData, null, 2));
    
    // Handle different possible response structures
    let transformedData: any[] = [];
    
    if (Array.isArray(apiData)) {
      // Direct array response
      transformedData = apiData;
      console.log('🔍 [Market Movers] Response is direct array');
    } else if (typeof apiData === 'object' && apiData !== null) {
      // Check for common nested data structures
      if (apiData.data && Array.isArray(apiData.data)) {
        transformedData = apiData.data;
        console.log('🔍 [Market Movers] Response has nested data array');
      } else if (apiData.instruments && Array.isArray(apiData.instruments)) {
        transformedData = apiData.instruments;
        console.log('🔍 [Market Movers] Response has nested instruments array');
      } else if (apiData.results && Array.isArray(apiData.results)) {
        transformedData = apiData.results;
        console.log('🔍 [Market Movers] Response has nested results array');
      } else {
        console.log('🔍 [Market Movers] Response is object but no recognizable data structure found');
        // Log all top-level keys to help debug
        console.log('🔍 [Market Movers] Available top-level keys:', Object.keys(apiData));
      }
    }
    
    console.log('🔍 [Market Movers] Transformed data length:', transformedData.length);
    
    const result = {
      data: transformedData,
      metadata: {
        limit: validatedLimit,
        condition,
        marketTypeId: 1,
        endpoint,
      },
    };
    
    console.log('✅ [Market Movers] Successfully returning data:', {
      dataLength: result.data.length,
      metadata: result.metadata
    });
    
    return result;
    
  } catch (error) {
    console.error('❌ [Market Movers] Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : 'No stack trace',
      cause: error instanceof Error ? error.cause : 'No cause'
    });
    throw error; // Re-throw the error instead of returning mock data
  }
};

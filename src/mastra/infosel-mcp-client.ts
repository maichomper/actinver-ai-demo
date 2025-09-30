import { MCPClient } from '@mastra/mcp';

export const infoselMCP = new MCPClient({
  servers: {
    infosel: {
      url: new URL(process.env.INFOSEL_MCP_URL!),
      requestInit: {
        headers: {
          'X-Infosel-Client-ID': process.env.INFOSEL_CLIENT_ID!,
          'X-Infosel-Access-Token': process.env.INFOSEL_ACCESS_TOKEN!,
          'X-Infosel-Refresh-Token': process.env.INFOSEL_REFRESH_TOKEN!,
          'X-Infosel-Realm': process.env.INFOSEL_REALM!,
          'X-Infosel-Environment': process.env.INFOSEL_ENVIRONMENT!,
        },
      },
      // Add eventSourceInit for SSE connections (required when using custom headers)
      eventSourceInit: {
        fetch(input: Request | URL | string, init?: RequestInit) {
          const headers = new Headers(init?.headers || {});
          headers.set('X-Infosel-Client-ID', process.env.INFOSEL_CLIENT_ID!);
          headers.set('X-Infosel-Access-Token', process.env.INFOSEL_ACCESS_TOKEN!);
          headers.set('X-Infosel-Refresh-Token', process.env.INFOSEL_REFRESH_TOKEN!);
          headers.set('X-Infosel-Realm', process.env.INFOSEL_REALM!);
          headers.set('X-Infosel-Environment', process.env.INFOSEL_ENVIRONMENT!);
          return fetch(input, {
            ...init,
            headers,
          });
        },
      },
      logger: (logMessage) => {
        console.log(`[Infosel MCP] ${logMessage.level}: ${logMessage.message}`);
      },
      // Add error handling to prevent non-serializable errors in streaming
      enableServerLogs: true,
      timeout: 30000, // 30 seconds
    },
  },
  timeout: 60000, // 60 seconds
});

export async function getInfoselTools() {
  if (!infoselMCP) {
    console.warn('MCP client not available. Returning empty tools.');
    return {};
  }
  
  try {
    const tools = await infoselMCP.getTools();
    return tools;
  } catch (error) {
    console.error('Failed to get tools from Infosel MCP server:', error);
    return {};
  }
}

export async function getInfoselToolsets() {
  if (!infoselMCP) {
    console.warn('MCP client not available. Returning empty toolsets.');
    return {};
  }
  
  try {
    const toolsets = await infoselMCP.getToolsets();
    return toolsets;
  } catch (error) {
    console.error('Failed to get toolsets from Infosel MCP server:', error);
    return {};
  }
}

export async function getInfoselTool(toolName: string) {
  if (!infoselMCP) {
    console.warn(`MCP client not available. Cannot get tool '${toolName}'.`);
    throw new Error(`Tool '${toolName}' not available - MCP client not configured`);
  }
  
  try {
    const tools = await infoselMCP.getTools();
    const tool = tools[`infosel_${toolName}`];
    
    if (!tool) {
      throw new Error(`Tool '${toolName}' not found in Infosel MCP server`);
    }
    
    return tool;
  } catch (error) {
    console.error(`Failed to get tool '${toolName}' from Infosel MCP server:`, error);
    throw error;
  }
}
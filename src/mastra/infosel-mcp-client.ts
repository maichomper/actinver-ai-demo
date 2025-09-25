import { MCPClient } from '@mastra/mcp';

// Create MCP client only if environment variables are available
const createMCPClient = () => {
  const mcpUrl = process.env.INFOSEL_MCP_URL;
  if (!mcpUrl) {
    console.warn('INFOSEL_MCP_URL not configured. MCP client will be disabled.');
    return null;
  }

  try {
    return new MCPClient({
      servers: {
        infosel: {
          url: new URL(mcpUrl),
          requestInit: {
            headers: {
              'X-Infosel-Client-ID': process.env.INFOSEL_CLIENT_ID || '',
              'X-Infosel-Access-Token': process.env.INFOSEL_ACCESS_TOKEN || '',
              'X-Infosel-Refresh-Token': process.env.INFOSEL_REFRESH_TOKEN || '',
              'X-Infosel-Realm': process.env.INFOSEL_REALM || '',
              'X-Infosel-Environment': process.env.INFOSEL_ENVIRONMENT || '',
            },
          },
          logger: (logMessage) => {
            console.log(`[Infosel MCP] ${logMessage.level}: ${logMessage.message}`);
          },
          timeout: 30000, // 30 seconds
        },
      },
      timeout: 60000, // 60 seconds
    });
  } catch (error) {
    console.error('Failed to create MCP client:', error);
    return null;
  }
};

export const infoselMCP = createMCPClient();

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
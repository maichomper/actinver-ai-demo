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
      logger: (logMessage) => {
        console.log(`[Infosel MCP] ${logMessage.level}: ${logMessage.message}`);
      },
      timeout: 30000, // 30 seconds
    },
  },
  timeout: 60000, // 60 seconds
});

export async function getInfoselTools() {
  try {
    const tools = await infoselMCP.getTools();
    return tools;
  } catch (error) {
    console.error('Failed to get tools from Infosel MCP server:', error);
    return {};
  }
}

export async function getInfoselToolsets() {
  try {
    const toolsets = await infoselMCP.getToolsets();
    return toolsets;
  } catch (error) {
    console.error('Failed to get toolsets from Infosel MCP server:', error);
    return {};
  }
}

export async function getInfoselTool(toolName: string) {
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
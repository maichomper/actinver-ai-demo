import { MCPClient } from '@mastra/mcp';

// Configure the Infosel MCP server
export const infoselMCP = new MCPClient({
  servers: {
    infosel: {
      // Using the same configuration as your Claude setup
      url: new URL('http://localhost:3001/mcp?transportType=streamable-http'),
      // Optional: Custom logging for debugging
      logger: (logMessage) => {
        console.log(`[Infosel MCP] ${logMessage.level}: ${logMessage.message}`);
      },
      // Optional: Server-specific timeout
      timeout: 30000, // 30 seconds
    },
  },
  // Global timeout for all servers
  timeout: 60000, // 60 seconds
});

// Helper function to get tools from Infosel MCP server
export async function getInfoselTools() {
  try {
    await infoselMCP.connect();
    const tools = await infoselMCP.getTools();
    return tools;
  } catch (error) {
    console.error('Failed to connect to Infosel MCP server:', error);
    return {};
  }
}

// Helper function to get toolsets for dynamic usage
export async function getInfoselToolsets() {
  try {
    await infoselMCP.connect();
    const toolsets = await infoselMCP.getToolsets();
    return toolsets;
  } catch (error) {
    console.error('Failed to connect to Infosel MCP server:', error);
    return {};
  }
}

// Cleanup function
export async function disconnectInfoselMCP() {
  try {
    await infoselMCP.disconnect();
  } catch (error) {
    console.error('Error disconnecting from Infosel MCP server:', error);
  }
} 
import { infoselMCP } from '../mcp-config';

/**
 * Get all available tools from the Infosel MCP server
 * Use this for static tool configuration
 */
export async function getInfoselToolsForAgent() {
  try {
    const tools = await infoselMCP.getTools();
    console.log(`📚 Loaded ${Object.keys(tools).length} tools from Infosel MCP server`);
    return tools;
  } catch (error) {
    console.error('❌ Failed to load Infosel MCP tools:', error);
    return {};
  }
}

/**
 * Get toolsets for dynamic tool usage
 * Use this when you need to pass tools dynamically to agent.generate() or agent.stream()
 */
export async function getInfoselToolsetsForAgent() {
  try {
    const toolsets = await infoselMCP.getToolsets();
    console.log(`📚 Loaded ${Object.keys(toolsets).length} toolsets from Infosel MCP server`);
    return toolsets;
  } catch (error) {
    console.error('❌ Failed to load Infosel MCP toolsets:', error);
    return {};
  }
}

/**
 * Cleanup function to disconnect from the Infosel MCP server
 * Call this when shutting down your application
 */
export async function cleanupInfoselMCP() {
  try {
    await infoselMCP.disconnect();
    console.log('🔌 Disconnected from Infosel MCP server');
  } catch (error) {
    console.error('❌ Error disconnecting from Infosel MCP server:', error);
  }
} 
import { registerApiRoute } from "@mastra/core/server";
import { randomUUID } from "crypto";

export const a2aAgentRoute = registerApiRoute("/a2a/agent/:agentId", {
  method: "POST",
  handler: async (c) => {
    try {
      const mastra = c.get("mastra");
      const agentId = c.req.param("agentId");
      const body = await c.req.json();
      const { jsonrpc, id, params } = body;

      if (jsonrpc !== "2.0" || !id) {
        return c.json({
          jsonrpc: "2.0",
          id: id || null,
          error: {
            code: -32600,
            message: 'Invalid Request: jsonrpc must be "2.0" and id required',
          },
        });
      }

      const agent = mastra.getAgent(agentId);
      if (!agent) {
        return c.json({
          jsonrpc: "2.0",
          id,
          error: {
            code: -32602,
            message: `Agent '${agentId}' not found`,
          },
        });
      }

      const { message, messages } = params || {};
      const allMessages = message ? [message] : messages || [];

      const formattedMessages = allMessages.map((msg) => ({
        role: msg.role,
        content: msg.parts?.map((p: any) => p.text || "").join("\n") || "",
      }));

      const result = await agent.generate(formattedMessages);
      const text = result.text || "";

      return c.json({
        jsonrpc: "2.0",
        id,
        result: {
          id: randomUUID(),
          status: {
            state: "completed",
            message: {
              role: "agent",
              parts: [{ kind: "text", text }],
            },
          },
          artifacts: [
            {
              artifactId: randomUUID(),
              name: `${agentId}-response`,
              parts: [{ kind: "text", text }],
            },
          ],
        },
      });
    } catch (err: any) {
      return c.json({
        jsonrpc: "2.0",
        id: null,
        error: {
          code: -32603,
          message: "Internal error",
          data: { details: err.message },
        },
      });
    }
  },
});

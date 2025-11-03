import { createTool } from "@mastra/core";
import { z } from "zod";
import fetch from "node-fetch"; // ✅ Explicitly import fetch for Node.js

export const cryptoPriceTool = createTool({
  id: "crypto-price",
  description:
    "Fetches the current USD price of a cryptocurrency using CoinGecko API.",
  inputSchema: z.object({
    coin: z.string().describe("The coin ID (e.g. bitcoin, ethereum)."),
  }),
  outputSchema: z.object({
    coin: z.string(),
    usd: z.number(),
  }),

  async execute({ input }) {
    const coin = input.coin?.toLowerCase().trim();

    if (!coin) {
      throw new Error("Coin name is required.");
    }

    try {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`;
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`Failed to fetch price for ${coin}.`);
      }

      const data = await resp.json();

      if (!data[coin] || typeof data[coin].usd !== "number") {
        throw new Error(`No price data available for "${coin}".`);
      }

      return {
        coin,
        usd: data[coin].usd,
      };
    } catch (err: any) {
      // ✅ Return a structured error message
      throw new Error(`⚠️ Error fetching ${coin}: ${err.message}`);
    }
  },
});

import { createTool } from "@mastra/core";
import { z } from "zod";

export const cryptoPriceTool = createTool({
  id: "crypto-price",
  description: "Get the USD price for a cryptocurrency (CoinGecko)",
  inputSchema: z.object({
    coin: z.string().describe("The coin id, e.g. bitcoin, ethereum"),
  }),
  outputSchema: z.object({
    coin: z.string(),
    usd: z.number(),
  }),
  async execute({ input }) {
    const coin = input.coin.toLowerCase();
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`;
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(`Failed fetching price for ${coin}`);
    }
    const data = await resp.json();
    if (!data[coin] || typeof data[coin].usd !== "number") {
      throw new Error(`No price data for ${coin}`);
    }
    return {
      coin: coin,
      usd: data[coin].usd,
    };
  },
});

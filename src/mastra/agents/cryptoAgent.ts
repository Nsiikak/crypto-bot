import { Agent } from "@mastra/core";
import { cryptoPriceTool } from "../tools/cryptoPriceTool";

export const cryptoAgent = new Agent({
  name: "Crypto Price Agent",
  instructions: `
You are a crypto price assistant.
When user asks “price <coin>”, you must call the crypto-price tool and then respond with “<Coin>: $<price> USD”.
If the user does not specify a coin, ask “Which coin would you like the price for?”.
`,
  model: "openai/gpt-4o-mini", // you can let Mastra default (or specify OpenAI model)
  tools: { cryptoPriceTool },
});

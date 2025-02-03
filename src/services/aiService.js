import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { WardenToolkit } from "@wardenprotocol/warden-langchain";
import { CONFIG } from "../config/config.js";
import { logInfo, logError } from "../utils/logger.js";

const llm = new ChatOpenAI({
    model: "gpt-4o",
    openAIApiKey: CONFIG.OPENAI_API_KEY,
});

const memory = new MemorySaver();

export function createAI(tools) {
    try {
        const agentConfig = {
            configurable: { thread_id: "Warden Gas Prediction Agent" },
        };

        const agent = createReactAgent({
            llm,
            tools,
            checkpointSaver: memory,
            messageModifier:
                "You're a helpful assistant for Web3 gas price forecasting. " +
                "Analyze historical data, predict gas fees, and suggest best transaction times.",
        });

        logInfo("AI Agent initialized successfully!");
        return { agent, config: agentConfig };

    } catch (error) {
        logError("AI Agent Initialization Failed", error);
        return null;
    }
}

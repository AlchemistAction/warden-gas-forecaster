import { WardenAgentKit } from "@wardenprotocol/warden-agent-kit-core";
import { WardenToolkit } from "@wardenprotocol/warden-langchain";
import { CONFIG } from "../config/config.js";
import { logInfo, logError } from "../utils/logger.js";
import { createAI } from "../services/aiService.js";
import { getGasPrice } from "../services/gasPriceService.js";
import { analyzeGasTrends } from "../services/aiService.js";

export async function startWardenAgent() {
    try {
        if (!CONFIG.PRIVATE_KEY.startsWith("0x") || CONFIG.PRIVATE_KEY.length !== 66) {
            throw new Error("Invalid PRIVATE_KEY! It must be 64 hex characters and start with 0x.");
        }

        const agentConfig = { privateKeyOrAccount: CONFIG.PRIVATE_KEY };
        const agentKit = new WardenAgentKit(agentConfig);
        const wardenToolkit = new WardenToolkit(agentKit);
        const tools = wardenToolkit.getTools();

        const aiAgent = createAI(tools);
        const { agent, config } = await createAI(tools);
        if (aiAgent) {
            logInfo("AI-Powered Warden Agent is Ready!");
        } else {
            logError("AI Agent failed to initialize.");
        }

        try {
            const gasPrice = await getGasPrice(tools);
            if (gasPrice) {
                logInfo(`Live Gas Price: ${gasPrice}`);
            }
        } catch (error) {
            logError("Gas price monitoring failed", error);
        }

        try {
            const prediction = await analyzeGasTrends(agent, config);
            logInfo(`AI Prediction: ${prediction}`);
        } catch (error) {
            logError("Gas price prediction failed", error);
        }

    } catch (error) {
        logError("WardenAgent Initialization Failed", error);
    }
}

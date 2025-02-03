import { WardenAgentKit } from "@wardenprotocol/warden-agent-kit-core";
import { WardenToolkit } from "@wardenprotocol/warden-langchain";
import { CONFIG } from "../config/config.js";
import { logInfo, logError } from "../utils/logger.js";
import { createAI } from "../services/aiService.js";

export function startWardenAgent() {
    try {
        if (!CONFIG.PRIVATE_KEY.startsWith("0x") || CONFIG.PRIVATE_KEY.length !== 66) {
            throw new Error("Invalid PRIVATE_KEY! It must be 64 hex characters and start with 0x.");
        }

        const agentConfig = { privateKeyOrAccount: CONFIG.PRIVATE_KEY };
        const agentKit = new WardenAgentKit(agentConfig);
        const wardenToolkit = new WardenToolkit(agentKit);
        const tools = wardenToolkit.getTools();

        const aiAgent = createAI(tools);

        if (aiAgent) {
            logInfo("AI-Powered Warden Agent is Ready!");
        } else {
            logError("AI Agent failed to initialize.");
        }

    } catch (error) {
        logError("WardenAgent Initialization Failed", error);
    }
}

import {startWardenAgent} from "./warden/agent.js";
import { logInfo } from "./utils/logger.js";

async function main() {
    logInfo("Warden AI Agent is starting...");
    startWardenAgent();
}

main();

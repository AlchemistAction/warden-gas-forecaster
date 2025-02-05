import { logInfo, logError } from "../utils/logger.js";

export async function getGasPrice(tools) {
    try {
        const getPriceTool = tools.find(tool => tool.name === "get_price");
        if (!getPriceTool) {
            throw new Error("get_price tool not found in toolkit.");
        }
        const price = await getPriceTool.call({ symbol: "ETH" });
        return price;
    } catch (error) {
        logError("Failed to fetch gas price", error);
        return null;
    }
}

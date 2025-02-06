import express from "express";
import { getRealGasPriceHistory, getPredictedGasPriceHistory } from "./utils/dataStore.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/gas-prices", (req, res) => {
    res.json({
        real: getRealGasPriceHistory(),
        predicted: getPredictedGasPriceHistory()
    });
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});

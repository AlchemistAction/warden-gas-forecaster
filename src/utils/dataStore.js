const realGasPrices = [];
const predictedGasPrices = [];

export function addRealGasPrice(price) {
    const timestamp = new Date().toISOString();
    realGasPrices.push({ timestamp, price });

    if (realGasPrices.length > 100) {
        realGasPrices.shift();
    }
}

export function addPredictedGasPrice(price) {
    const timestamp = new Date().toISOString();
    predictedGasPrices.push({ timestamp, price });

    if (predictedGasPrices.length > 100) {
        predictedGasPrices.shift();
    }
}

export function getRealGasPriceHistory() {
    return realGasPrices;
}

export function getPredictedGasPriceHistory() {
    return predictedGasPrices;
}

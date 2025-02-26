export async function convertUSDToEUR(amount) {
    const rate = await fetchExchangeRate(); // Assume this calls an API
    let result = amount * rate;
    return result;
}

async function fetchExchangeRate() {
    return 1.5;
}

const receiveCurrency;
const returnCurrency;
var conversionFactor;

conversionFactor = 0.5;

if (receiveCurrency != NULL) {
    returnCurrency = receiveCurrency * conversionFactor;
}
else {
    print("input currency not received.");
}
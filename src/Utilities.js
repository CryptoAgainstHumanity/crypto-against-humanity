// 10 ** 8 is the default buy and sell amount for white cards we can change that later
const defaultAmount = 10 ** 8;
const displayDivision = 10 ** 18;

export function GetBuyPrice(totalSupply, poolBalance) {
  const a = Number(totalSupply) + Number(defaultAmount);
  const b = Number(poolBalance);
  const step1 = 10000000000 / 2;
  const step2 = step1 * (a**2);
  const step3 = step2 / 10000000000;
  const cardMintingPrice = step3 - b;
  const buyPrice = (cardMintingPrice / displayDivision);
  return buyPrice;
}

export function GetBuyPriceRounded(totalSupply, poolBalance) {
  const buyPrice = GetBuyPrice(totalSupply, poolBalance)
  let priceRounded = '';
  if (buyPrice < 0.001) {
	priceRounded = 0;
  } else {
	priceRounded = PrecisionRound(buyPrice, 3);
  }
  return priceRounded;
}

export function GetSellPrice(totalSupply, poolBalance) {
  const a = Number(totalSupply) - Number(defaultAmount);
  const b = Number(poolBalance);
  const step1 = 10000000000 / 2;
  const step2 = step1 * (a**2);
  const step3 = step2 / 10000000000;
  const cardBurnReward = b - step3;
  const sellPrice = (cardBurnReward / displayDivision);
  return Math.abs(sellPrice);
}

export function GetSellPriceRounded(totalSupply, poolBalance) {
  const sellPrice = GetSellPrice(totalSupply, poolBalance)
  let priceRounded = '';
  if (sellPrice < 0.001) {
	priceRounded = 0;
  } else {
	priceRounded = PrecisionRound(sellPrice, 3);
  }
  return priceRounded;
}

export function PrecisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};

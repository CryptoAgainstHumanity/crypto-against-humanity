export function GetBuyPrice(totalSupply, poolBalance) {
  const a = Number(totalSupply) + Number(10 ** 8);
  const b = Number(poolBalance);
  const step1 = 10000000000 / 2;
  const step2 = step1 * (a**2);
  const step3 = step2 / 10000000000;
  const cardMintingPrice = step3 - b;
  const buyPrice = (cardMintingPrice / 10 ** 18);
  return buyPrice;
}
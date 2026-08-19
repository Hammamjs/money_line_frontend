export function convert(
  amount: number,
  from: string,
  to: string,
  rate: number,
): number {
  if (!from || !to) return 0;
  if (from === to) return amount;

  return amount * rate;
}

function convertToReadable(val: number) {
  return Number(val).toLocaleString('en-US');
}

export function rateLabel(
  from: string | undefined,
  to: string | undefined,
  rates: number,
): string {
  if (!from || !to) return '';

  if (from === to) return '';
  const rate = convert(1, from, to, rates);
  return `1 ${from} = ${rate < 1 ? convertToReadable(+rate.toFixed(6)) : convertToReadable(+rate.toFixed(2))} ${to}`;
}

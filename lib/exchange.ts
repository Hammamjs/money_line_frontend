const CACHE_KEY = 'sdx_rates';
const CACHE_TTL = 3600000; // 1 hour
const CUSTOM_RATES_KEY = 'sdx_custom_rates';

export type Currency = 'SDG' | 'CAD' | 'EGP';

export type Rates = Record<string, number>;

export type CustomRateEntry = {
  id: string;
  name: string;
  symbol: string;
  currency: 'CAD' | 'EGP';
  rate: number;
  note?: string;
  createdAt: string;
  isActive: boolean;
};

export const FALLBACK_RATES: Rates = {
  CAD: 0.0018,
  EGP: 0.083,
};

export const CURRENCY_INFO: Record<
  Currency,
  { label: string; flag: string; labelAr: string }
> = {
  SDG: { label: 'Sudanese Pound', flag: '🇸🇩', labelAr: 'جنيه سوداني' },
  CAD: { label: 'Canadian Dollar', flag: '🇨🇦', labelAr: 'دولار كندي' },
  EGP: { label: 'Egyptian Pound', flag: '🇪🇬', labelAr: 'جنيه مصري' },
};

/* ── Custom rate CRUD ── */
export function getCustomRates(): CustomRateEntry[] {
  const raw = localStorage.getItem(CUSTOM_RATES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveCustomRate(
  entry: Omit<CustomRateEntry, 'id' | 'createdAt'>,
): CustomRateEntry {
  const all = getCustomRates();
  const newEntry: CustomRateEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  all.push(newEntry);
  localStorage.setItem(CUSTOM_RATES_KEY, JSON.stringify(all));
  return newEntry;
}

export function toggleCustomRate(id: string, isActive: boolean) {
  const all = getCustomRates().map((e) =>
    e.id === id ? { ...e, isActive } : e,
  );
  localStorage.setItem(CUSTOM_RATES_KEY, JSON.stringify(all));
}

export function deleteCustomRate(id: string) {
  const all = getCustomRates().filter((e) => e.id !== id);
  localStorage.setItem(CUSTOM_RATES_KEY, JSON.stringify(all));
}

/** Return the admin-set active rates if present, otherwise null */
function getAdminRates(): Rates | null {
  const active = getCustomRates().filter((e) => e.isActive);
  if (active.length === 0) return null;

  // Use the most recently-added active entry per currency
  const byCAD = active
    .filter((e) => e.currency === 'CAD')
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  const byEGP = active
    .filter((e) => e.currency === 'EGP')
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  if (byCAD.length === 0 || byEGP.length === 0) return null;
  return { CAD: byCAD[0].rate, EGP: byEGP[0].rate };
}

export async function fetchExchangeRates(): Promise<Rates> {
  // Admin overrides always win
  const admin = getAdminRates();
  if (admin) return admin;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { rates, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL && rates.CAD && rates.EGP) {
        return { CAD: rates.CAD, EGP: rates.EGP };
      }
    }
    const res = await fetch('https://open.er-api.com/v6/latest/SDG');
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    const newRates: Rates = {
      CAD: data.rates.CAD || FALLBACK_RATES.CAD,
      EGP: data.rates.EGP || FALLBACK_RATES.EGP,
    };
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ rates: newRates, timestamp: Date.now() }),
    );
    return newRates;
  } catch {
    return FALLBACK_RATES;
  }
}

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
  console.log('From', from);

  if (!from || !to) return '';

  if (from === to) return '';
  const rate = convert(1, from, to, rates);
  return `1 ${from} = ${rate < 1 ? convertToReadable(+rate.toFixed(6)) : convertToReadable(+rate.toFixed(2))} ${to}`;
}

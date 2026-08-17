export type CurrencyCode = string;

export type Rates = Record<CurrencyCode, number>;

export type CurrencyReponse = {
  id: string;
  code: string;
  name: string;
  symbol: string;
  flag: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CurrencyQuery = {
  name: string;
  symbol: string;
  code: string;
  flag: string;
  isActive?: boolean;
};

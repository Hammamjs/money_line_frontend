export type ExchangeRateResult = {
  id: string;
  fromCurrencyId: string;
  toCurrencyId: string;
  rate: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  fromCurrency: {
    id: string;
    name: string;
    code: string;
    symbol: string;
    isActive: boolean;
    flag: string;
    createdAt: Date;
    updatedAt: Date;
  };
  toCurrency: {
    id: string;
    name: string;
    code: string;
    symbol: string;
    isActive: boolean;
    flag: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type ExchangeRateQuery = {
  fromId: string;
  toId: string;
};

export type AddExchangeRateQuery = {
  fromCurrencyId: string;
  toCurrencyId: string;
  rate: number;
};

export type UpdateExchangeQuery = {
  isActive?: boolean;
  rate?: number;
};

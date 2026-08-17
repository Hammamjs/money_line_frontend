export type AccountType = 'Bank' | 'Wallet';

export type Account = {
  id: string;
  userId: string;
  accountNumber: string;
  bankName: string;
  isActive: boolean;
  label: string;
  type: AccountType;
  extraInfo?: string;
  iban: string;
  phone: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AccountArgs = Omit<
  Account,
  'id' | 'userId' | 'createdAt' | 'updatedAt' | 'isDefault' | 'isActive'
>;

export type AdminAccounts = {
  username: string;
  email: string;
  accounts: Account[];
};

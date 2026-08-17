import { CurrencyReponse } from '../types';
import { Currency } from './currency';

type Props = {
  currencies: CurrencyReponse[] | undefined;

  handleDelete: (id: string) => void;
  handleToggle: (id: string, isActive: boolean) => void;
};

export const CurrenciesList = ({
  currencies,
  handleDelete,
  handleToggle,
}: Props) => {
  return currencies?.map((c, i) => (
    <Currency
      c={c}
      i={i}
      key={c.id}
      handleDelete={handleDelete}
      handleToggle={handleToggle}
    />
  ));
};

import { Card, CardContent } from '@/components/ui/card';
import { Form } from './form';
import { CurrencyReponse } from '@/features/currency/types';
import { EmptyCurrenciesList } from './empty-currencies-list';
import { TExchangeRateSchema } from '../schema';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  currencies: CurrencyReponse[] | undefined;

  form: UseFormReturn<TExchangeRateSchema>;
  fromId: string;
  toId: string;
  isAdding: boolean;
  handleAdd: () => void;
};

export const AddExchangeRateForm = ({
  currencies,
  form,
  fromId,
  handleAdd,
  toId,
  isAdding,
}: Props) => {
  return (
    <Card className="border-dashed border-2 border-primary/20">
      <CardContent className="space-y-3">
        {(currencies?.length || 0) < 2 ? (
          <EmptyCurrenciesList />
        ) : (
          <Form
            form={form}
            fromId={fromId}
            handleAdd={handleAdd}
            toId={toId}
            isAdding={isAdding}
            currencies={currencies}
          />
        )}
      </CardContent>
    </Card>
  );
};

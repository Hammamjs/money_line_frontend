import { Plus } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TCurrencySchema } from '../schema';

type Props = {
  handleAdd: () => void;
  isAdding: boolean;
  form: UseFormReturn<TCurrencySchema>;
};

export const AddCurrencyForm = ({ handleAdd, isAdding, form }: Props) => {
  return (
    <Card className="border-dashed border-2 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" /> Add Currency
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Name
            </label>
            <Input placeholder="e.g. Euro" {...form.register('name')} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Symbol
            </label>
            <Input placeholder="e.g. $" {...form.register('symbol')} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Flag emoji
            </label>
            <Input placeholder="e.g. 🇪🇺" {...form.register('flag')} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Code
            </label>
            <Input placeholder="e.g. CAD" {...form.register('code')} />
          </div>
        </div>
        <Button
          onClick={handleAdd}
          disabled={!form.formState.isValid || isAdding}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" /> Add Currency
        </Button>
      </CardContent>
    </Card>
  );
};

import { Plus } from 'lucide-react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/lib/i18n';

export const AddAcountHeader = () => {
  const { t } = useTranslation();
  return (
    <CardHeader className="pb-2">
      <CardTitle className="text-base flex items-center gap-2">
        <Plus className="w-4 h-4 text-primary" /> {t.addAccount}
      </CardTitle>
    </CardHeader>
  );
};

import { CheckCircle2, Clock } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/lib/i18n';

export const StatusBadge = ({ status }: { status: string }) => {
  const { t } = useTranslation();

  if (status === 'complete')
    return (
      <Badge className="bg-green-500/10 text-green-600 border-green-200 text-[10px]">
        <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> {t.complete}
      </Badge>
    );

  return (
    <Badge className="bg-amber-500/10 text-amber-600 border-amber-200 text-[10px]">
      <Clock className="w-2.5 h-2.5 mr-1" /> {t.pending}
    </Badge>
  );
};

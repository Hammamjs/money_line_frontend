import { useTranslation } from '@/lib/i18n';
import { Badge, CheckCircle2, Clock, Loader2 } from 'lucide-react';

export function StatusBadge({ status }: { status: string }) {
  const { t } = useTranslation();
  if (status === 'complete')
    return (
      <Badge className="bg-green-500/10 text-green-600 border-green-200">
        <CheckCircle2 className="w-3 h-3 mr-1" /> {t.complete}
      </Badge>
    );
  if (status === 'processing')
    return (
      <Badge className="bg-blue-500/10 text-blue-600 border-blue-200">
        <Loader2 className="w-3 h-3 mr-1 animate-spin" /> {t.processing}
      </Badge>
    );
  return (
    <Badge className="bg-amber-500/10 text-amber-600 border-amber-200">
      <Clock className="w-3 h-3 mr-1" /> {t.pending}
    </Badge>
  );
}

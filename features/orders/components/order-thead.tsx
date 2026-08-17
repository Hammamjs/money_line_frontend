import { useTranslation } from '@/lib/i18n';

export const OrderThead = () => {
  const { t } = useTranslation();
  return (
    <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
      <tr>
        <th className="px-6 py-4 font-medium">User &amp; Contact</th>
        <th className="px-6 py-4 font-medium">Transfer</th>
        <th className="px-6 py-4 font-medium">Proof</th>
        <th className="px-6 py-4 font-medium">
          {t.status} &amp; {t.date}
        </th>
        <th className="px-6 py-4 font-medium text-right rtl:text-left">
          Actions
        </th>
      </tr>
    </thead>
  );
};

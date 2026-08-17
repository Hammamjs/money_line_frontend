'use client';

import { TrendingUp } from 'lucide-react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PairsTab } from '@/features/exchange-rate/components';
import { useTranslation } from '@/lib/i18n';

import { CurrenciesTab } from './currencies-tab';

export default function AdminRates() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/10 py-8 px-4">
      <div className="container max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            {t.exchangeRates}
          </h1>
        </div>

        <Tabs defaultValue="currencies">
          <TabsList className="mb-4">
            <TabsTrigger value="currencies">Currencies</TabsTrigger>
            <TabsTrigger value="pairs">Exchange Pairs</TabsTrigger>
          </TabsList>

          <TabsContent value="currencies">
            <CurrenciesTab />
          </TabsContent>

          <TabsContent value="pairs">
            <PairsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

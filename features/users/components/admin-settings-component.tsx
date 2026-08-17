'use client';

import { Settings, User as UserIcon, Building2 } from 'lucide-react';
import {
  ExistingAccounts,
  AccountTab,
  AddAccountForm,
} from '@/features/accounts/components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetUserAccountsQuery } from '@/features/accounts/api';
import { useUserForm } from '../hooks/use-user-form';
import { useAccountForm } from '../../accounts/hooks/use-account-form';
import { useTranslation } from '@/lib/i18n';

export const AdminSettingsComponent = () => {
  const { t } = useTranslation();

  const { data: accounts } = useGetUserAccountsQuery();

  const { passwordForm, profileForm } = useUserForm();
  const { accountForm, newType, setNewType } = useAccountForm();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/10 py-8 px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            {t.adminSettings}
          </h1>
        </div>

        <Tabs defaultValue="account">
          <TabsList className="mb-6 w-full sm:w-auto">
            <TabsTrigger value="account" className="gap-2">
              <UserIcon className="w-4 h-4" /> {t.accountInfo}
            </TabsTrigger>
            <TabsTrigger value="banks" className="gap-2">
              <Building2 className="w-4 h-4" /> {t.bankAccounts}
            </TabsTrigger>
          </TabsList>

          <AccountTab profileForm={profileForm} passwordForm={passwordForm} />

          <TabsContent value="banks" className="space-y-4">
            <ExistingAccounts accounts={accounts} />

            <AddAccountForm
              form={accountForm}
              newType={newType}
              setNewType={setNewType}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

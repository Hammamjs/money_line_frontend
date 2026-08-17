'use client';

import {
  Landmark,
  Plus,
  Pencil,
  Trash2,
  CreditCard,
  Hash,
  Phone,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Account } from '../types';
import { BankAccountForm } from './bank-account-form';
import { useAccountActions } from '../hooks/use-accounts-actions';

export function BankAccounts({
  accounts,
}: {
  accounts: Account[] | undefined;
}) {
  const {
    startAdd,
    editingId,
    isAdding,
    save,
    form,
    cancel,
    defaultId,
    setDefaultId,
    startEdit,
    remove,
  } = useAccountActions();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Bank Accounts</span>

          <span>{accounts?.length ?? 0}</span>

          <Button
            size="sm"
            onClick={startAdd}
            disabled={isAdding || editingId !== null}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add account
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* New account form */}
        {isAdding && (
          <BankAccountForm onSave={save} onCancel={cancel} form={form} />
        )}

        {accounts?.length === 0 && !isAdding && (
          <div className="rounded-lg border border-dashed border-border py-8 text-center text-muted-foreground">
            <Landmark className="mx-auto mb-2 h-8 w-8 opacity-30" />
            <p className="text-sm">
              No bank accounts yet. Add one to get started.
            </p>
          </div>
        )}

        {accounts?.map((account) =>
          editingId === account.id ? (
            <BankAccountForm
              key={account.id}
              onSave={save}
              onCancel={cancel}
              form={form}
            />
          ) : (
            <div
              key={account.id}
              className="flex flex-col gap-3 rounded-lg border border-border/60 bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">
                    {account.bankName}
                  </span>

                  {defaultId === account.id && (
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                      Default
                    </Badge>
                  )}
                </div>

                <div className="grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="h-3.5 w-3.5 shrink-0" />
                    {account.accountNumber}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Hash className="h-3.5 w-3.5 shrink-0" />
                    {account.iban}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    {account.phone}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                {defaultId !== account.id && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDefaultId(account.id)}
                  >
                    Set default
                  </Button>
                )}

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => startEdit(account)}
                  aria-label="Edit account"
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => remove(account.id)}
                  aria-label="Delete account"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ),
        )}
      </CardContent>
    </Card>
  );
}

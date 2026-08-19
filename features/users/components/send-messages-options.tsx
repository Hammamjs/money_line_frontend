import React from 'react';
import { Users } from 'lucide-react';

import { useTranslation } from '@/lib/i18n';

import { User } from '../types/users.types';
import { UsersList } from './users-list';

type Props = {
  recipientId: string;
  users: User[] | undefined;
  setRecipientId: React.Dispatch<React.SetStateAction<string>>;
};

export const SendMessagesOptions = ({
  recipientId,
  setRecipientId,
  users,
}: Props) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-2">
        <Users className="w-4 h-4 text-muted-foreground" /> {t.recipient}
      </label>
      <div className="grid gap-2">
        <button
          onClick={() => setRecipientId('all')}
          className={`w-full py-2.5 px-4 rounded-lg border text-sm font-medium text-left rtl:text-right transition-colors ${
            recipientId === 'all'
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background border-border hover:bg-muted/50'
          }`}
        >
          🌐 {t.allUsers}
        </button>

        {users?.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            {t.noUsers}
          </p>
        ) : (
          <div className="border rounded-lg overflow-hidden divide-y max-h-48 overflow-y-auto">
            <UsersList
              recipientId={recipientId}
              setRecipientId={setRecipientId}
              users={users}
            />
          </div>
        )}
      </div>
    </div>
  );
};

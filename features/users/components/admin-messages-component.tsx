'use client';

import { MessageSquare } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SendMessegesOptions } from './send-messages-options';
import { SendMessageForm } from './send-message-form';
import { useAdminMessageUi } from '../hooks/use-admin-message-ui';
import { useAdminMessageActions } from '../hooks/use-admin-message-actions';
import { useTranslation } from '@/lib/i18n';

export const AdminMessagesComponent = () => {
  const ui = useAdminMessageUi();

  const { handleSend, isLoading } = useAdminMessageActions(ui);

  const { t } = useTranslation();

  const { body, recipientId, setBody, setRecipientId, setTitle, title, users } =
    ui;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/10 py-8 px-4">
      <div className="container max-w-xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <MessageSquare className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            {t.adminMessages}
          </h1>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">{t.sendMessage}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Recipient */}
            <SendMessegesOptions
              recipientId={recipientId}
              setRecipientId={setRecipientId}
              users={users}
            />

            <SendMessageForm
              body={body}
              handleSend={handleSend}
              isLoading={isLoading}
              setBody={setBody}
              setTitle={setTitle}
              title={title}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

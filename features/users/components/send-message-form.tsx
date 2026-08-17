import { Send } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '@/lib/i18n';

type Props = {
  body: string;
  title: string;
  isLoading: boolean;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => void;
};

export const SendMessageForm = ({
  body,
  handleSend,
  isLoading,
  setBody,
  setTitle,
  title,
}: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.messageTitle}</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Important update"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{t.messageBody}</label>
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          placeholder="Write your message here…"
          className="resize-none"
        />
      </div>

      <Button
        onClick={handleSend}
        disabled={!title.trim() || !body.trim() || isLoading}
        className="w-full h-11 font-semibold"
      >
        <Send className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" /> {t.sendMessage}
      </Button>
    </>
  );
};

import { useNotifyUserAction } from '@/features/notifications/hooks/use-notify-user';
import { useNotifyUsersAction } from '@/features/notifications/hooks/use-notify-users';
import { useTranslation } from '@/lib/i18n';
import React from 'react';
import { toast } from 'sonner';

type Props = {
  title: string;
  body: string;
  recipientId: string;

  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setBody: React.Dispatch<React.SetStateAction<string>>;
};

export const useAdminMessageActions = ({
  recipientId,
  title,
  body,
  setTitle,
  setBody,
}: Props) => {
  const { t } = useTranslation();

  const { notifyAll, isLoading: isNotifingAllUsers } = useNotifyUsersAction();
  const { notifyUser, isLoading: isNotifingUser } = useNotifyUserAction();

  const handleSend = async () => {
    try {
      if (recipientId === 'all') {
        if (!title.trim() || !body.trim()) return;
        notifyAll({
          title: title.trim(),
          message: body.trim(),
        });
      } else {
        await notifyUser({ userId: recipientId, title, message: body });
      }

      setTitle('');
      setBody('');

      toast.success(t.messageSent);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    handleSend,
    isLoading: isNotifingAllUsers || isNotifingUser,
  };
};

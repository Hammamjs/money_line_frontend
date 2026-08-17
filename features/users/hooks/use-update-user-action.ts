import { toast } from 'sonner';
import { useUpdateUserMutationAction } from './use-update-user-data-mutation-action';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/auth/store/slices/auth-slice';
import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';

export const useUpdateUserAction = () => {
  const user = useSelector(selectUser);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(user?.username ?? '');
  const { t } = useTranslation();

  const { onUpdate } = useUpdateUserMutationAction();

  const handleSave = async () => {
    if (!editName.trim() || !user) return;
    await onUpdate({ username: editName, id: user.id });
    toast.success(t.profileUpdated);
    setEditing(false);
  };

  return {
    editing,
    setEditName,
    setEditing,
    editName,
    handleSave,
    user,
  };
};

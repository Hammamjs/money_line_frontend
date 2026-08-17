import { toast } from 'sonner';
import { User } from '../types/users.types';
import { useUpdateUserRole } from './use-update-user-role';
import { Role } from '@/features/auth/types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/auth/store';

export const useUsersList = () => {
  const [pendingDelete, setPendingDelete] = useState<User | null>(null);

  const { onUpdateRole } = useUpdateUserRole();

  const user = useSelector(selectUser);

  const handleRoleChange = async (user: User) => {
    if (user.role === 'super_admin') {
      toast.error("You can't change your own role.");
      return;
    }

    const nextRole: Role = user.role === 'admin' ? 'user' : 'admin';

    await onUpdateRole({ id: user.id, role: nextRole });
    toast.success('User role update');

    toast.success(
      `${user.username} is now ${nextRole === 'admin' ? 'an admin' : 'a user'}`,
    );
  };

  function handleDelete() {
    if (!pendingDelete) return;

    if (pendingDelete.id === user?.id) {
      toast.error("You can't delete your own account.");
      setPendingDelete(null);
      return;
    }

    toast.success(`${pendingDelete.username} deleted`);

    setPendingDelete(null);
  }

  return {
    handleRoleChange,
    handleDelete,

    pendingDelete,
    setPendingDelete,
  };
};

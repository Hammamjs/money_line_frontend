import { useMemo, useState } from 'react';
import { useGetAllUsersQuery } from '../api/users-slice.api';
import { RoleFilter } from '@/features/auth/types';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/auth/store';

export const useUsersListUi = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');

  const { data: users } = useGetAllUsersQuery();

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();

    return users?.filter((user) => {
      const matchesSearch =
        !term ||
        user.username.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term);

      const matchesRole = roleFilter === 'all' || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const user = useSelector(selectUser);
  const role = users?.find((u) => u.id === user?.id)?.role;
  const isAdmin = ['admin', 'super_admin'].includes(role ?? 'user');

  return {
    search,
    setSearch,
    setRoleFilter,
    roleFilter,
    users,
    filteredUsers,

    isAdmin,
  };
};

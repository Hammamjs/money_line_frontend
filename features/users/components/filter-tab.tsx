import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RoleFilter } from '@/features/auth/types';
import React from 'react';

type Props = {
  search: string;
  roleFilter: RoleFilter;

  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setRoleFilter: React.Dispatch<React.SetStateAction<RoleFilter>>;
};

export const FilterTab = ({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
}: Props) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by username or email..."
        className="sm:max-w-xs"
        aria-label="Search members"
      />

      <div className="flex gap-2">
        {(['all', 'user', 'admin'] as RoleFilter[]).map((role) => (
          <Button
            key={role}
            size="sm"
            variant={roleFilter === role ? 'default' : 'outline'}
            onClick={() => setRoleFilter(role)}
          >
            {role === 'all' ? 'All' : role === 'admin' ? 'Admins' : 'Users'}
          </Button>
        ))}
      </div>
    </div>
  );
};

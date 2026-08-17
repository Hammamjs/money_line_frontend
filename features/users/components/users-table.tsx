import { useSelector } from 'react-redux';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { selectUser } from '@/features/auth/store';
import { Role } from '@/features/auth/types';

import { User } from '../types/users.types';
import { useUsersList } from '../hooks/use-users-list.action';

type Props = {
  filteredUsers: User[] | undefined;
};

export const UsersTable = ({ filteredUsers }: Props) => {
  const user = useSelector(selectUser);

  const { setPendingDelete, handleRoleChange } = useUsersList();

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Username</th>

              <th className="px-4 py-3 font-medium">Email</th>

              <th className="px-4 py-3 font-medium">Role</th>

              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers?.map((u) => {
              const isSelf = u.id === user?.id;

              const nextRole: Role = user?.role === 'admin' ? 'user' : 'admin';

              return (
                <tr key={u.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {u.username}

                    {isSelf && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        (you)
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-muted-foreground">
                    {u.email || '—'}
                  </td>

                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        ['admin', 'super_admin'].includes(u.role)
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {u.role}
                    </Badge>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={isSelf}
                        onClick={() => handleRoleChange(u)}
                      >
                        Make {nextRole}
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={isSelf}
                        onClick={() => setPendingDelete(u)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {filteredUsers?.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  No members match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

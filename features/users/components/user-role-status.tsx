import { User } from '../types/users.types';

type Props = {
  users: User[] | undefined;
};

export const UserRoleStatus = ({ users }: Props) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">Total members</p>

        <p className="mt-1 text-2xl font-semibold">{users?.length}</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">Admins</p>

        <p className="mt-1 text-2xl font-semibold">
          {users?.filter((user) => user.role === 'admin').length}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">Users</p>

        <p className="mt-1 text-2xl font-semibold">
          {users?.filter((user) => user.role === 'user').length}
        </p>
      </div>
    </div>
  );
};

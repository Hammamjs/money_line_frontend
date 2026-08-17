'use client';

import { UserRoleStatus } from './user-role-status';
import { UsersTable } from './users-table';
import { DeleteUserModal } from './delete-user-modal';
import { useUsersListUi } from '../hooks/use-users-list-ui';
import { FilterTab } from './filter-tab';

export const UsersListComponent = () => {
  const {
    isAdmin,
    filteredUsers,
    roleFilter,
    search,
    setRoleFilter,
    setSearch,
    users,
  } = useUsersListUi();

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">
              Members
            </h1>

            <p className="text-sm text-muted-foreground">
              Manage accounts and roles
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        {!isAdmin ? (
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-medium text-foreground">Admins only</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your account does not have the admin role, so the member directory
              is hidden.
            </p>
          </div>
        ) : (
          <>
            {/* Filters */}
            <FilterTab
              roleFilter={roleFilter}
              search={search}
              setRoleFilter={setRoleFilter}
              setSearch={setSearch}
            />

            {/* Stats */}
            <UserRoleStatus users={users} />

            {/* Users table */}
            <UsersTable filteredUsers={filteredUsers} />

            <p className="mt-3 text-xs text-muted-foreground">
              Showing {filteredUsers?.length} of {users?.length} members
            </p>
          </>
        )}
      </div>

      <DeleteUserModal />
    </main>
  );
};

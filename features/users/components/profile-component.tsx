'use client';

import { motion } from 'framer-motion';
import { useGetUserOrdersQuery } from '@/features/orders/api';
import { useGetUserAccountsQuery } from '@/features/accounts/api';
import { BankAccounts } from '@/features/accounts/components';

import { HeroCard } from './hero-card';
import { RecentTransfers } from './recent-transfers';
import { getInitials } from '../utils/get-initial';
import { useUpdateUserAction } from '../hooks/use-update-user-action';

export const ProfileComponent = () => {
  const { data: accounts } = useGetUserAccountsQuery();

  const { data: orders } = useGetUserOrdersQuery();

  const { user, editName, editing, handleSave, setEditName, setEditing } =
    useUpdateUserAction();

  if (!user) return null;

  const initials = getInitials(editName);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/10 py-10 px-4">
      <div className="container max-w-3xl mx-auto space-y-6">
        <HeroCard
          editName={editName}
          editing={editing}
          handleSave={handleSave}
          initials={initials}
          setEditName={setEditName}
          setEditing={setEditing}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          <BankAccounts accounts={accounts} />
        </motion.div>

        <RecentTransfers orders={orders} />
      </div>
    </div>
  );
};

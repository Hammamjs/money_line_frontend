'use client';

import { Loading } from '@/components/Loading';
import { useRefreshMutation } from '@/features/auth/api';
import { useEffect, useState } from 'react';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [refresh] = useRefreshMutation();

  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    refresh()
      .unwrap()
      .catch((err: unknown) => {
        console.log(err);
      })
      .finally(() => {
        setIsChecked(true);
      });
  }, []);

  if (!isChecked) return <Loading />;

  return children;
};

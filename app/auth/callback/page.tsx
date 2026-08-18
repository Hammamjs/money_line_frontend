'use client';

import { setCredentials } from '@/features/auth/store/slices/auth-slice';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function GoogleCallback() {
  const router = useRouter();
  const dispatch = useDispatch();

  const searchParams = useSearchParams();

  const accessToken = searchParams.get('accessToken');

  const userParam = searchParams.get('user');

  useEffect(() => {
    if (userParam && accessToken) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));

        dispatch(setCredentials({ user, accessToken }));

        router.push('/');
      } catch (error) {
        console.error('Failed to parse user data from URL:', error);
        router.push('/login?error=invalid_user_data');
      }
    } else {
      router.push('login?error=missing_credentials');
    }
  }, [accessToken, userParam, dispatch, router]);

  return null;
}

import { useForm } from 'react-hook-form';
import {
  DEFAULT_PASSWORD_VALUES,
  PasswordSettingsSchema,
  TPasswordSettingsSchema,
} from '../schema/passwords-settings.schema';
import {
  ProfileSettingsSchema,
  DEFAULT_PROFILE_VALUES,
  TProfileSettingsSchema,
} from '../schema/profile-settings.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/auth/store/slices/auth-slice';

export const useUserForm = () => {
  const user = useSelector(selectUser);

  /* ── Account form ── */
  const profileForm = useForm<TProfileSettingsSchema>({
    resolver: zodResolver(ProfileSettingsSchema),
    defaultValues: DEFAULT_PROFILE_VALUES,
    mode: 'onChange',
  });

  const passwordForm = useForm<TPasswordSettingsSchema>({
    resolver: zodResolver(PasswordSettingsSchema),
    defaultValues: DEFAULT_PASSWORD_VALUES,
  });

  useEffect(() => {
    if (!user) return;

    profileForm.reset({
      email: user?.email,
      username: user?.username,
    });
  }, [user, profileForm]);

  return { profileForm, passwordForm };
};

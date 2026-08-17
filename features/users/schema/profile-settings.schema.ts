import z from 'zod';

export const ProfileSettingsSchema = z.object({
  username: z.string().min(3, 'User name must be at least 3 characters'),
  email: z.email('Email must be valid'),
});

export type TProfileSettingsSchema = z.infer<typeof ProfileSettingsSchema>;

export const DEFAULT_PROFILE_VALUES: TProfileSettingsSchema = {
  email: '',
  username: '',
};

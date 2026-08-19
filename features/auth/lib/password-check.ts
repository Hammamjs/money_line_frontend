export const passwordCheck = (password: string, confirmPassword?: string) => ({
  passwordLength: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /\d/.test(password),
  special: /[^A-Za-z0-9]/.test(password),
  matched: password === confirmPassword,
});

import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'sonner';

export const rtkErrorQueryLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errData = action.payload as FetchBaseQueryError;

    const message =
      (errData.data as { message: string })?.message ||
      'An expected Error occur';

    toast.error(message);
  }
  return next(action);
};

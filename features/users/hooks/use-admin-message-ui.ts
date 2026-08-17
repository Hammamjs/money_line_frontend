import { useState } from 'react';
import { useGetAllUsersQuery } from '../api/users-slice.api';

export const useAdminMessageUi = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [recipientId, setRecipientId] = useState<string>('all');

  const { data: users } = useGetAllUsersQuery();

  return {
    title,
    setTitle,
    body,
    setBody,
    recipientId,
    setRecipientId,
    users,
  };
};

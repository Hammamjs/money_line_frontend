import { User } from '../types/users.types';
import { UserCard } from './users-card';

type Props = {
  recipientId: string;
  users: User[] | undefined;
  setRecipientId: React.Dispatch<React.SetStateAction<string>>;
};

export const UsersList = ({ recipientId, setRecipientId, users }: Props) => {
  return users
    ?.filter((u) => !['admin', 'super_admin'].includes(u.role))
    ?.map((u) => (
      <UserCard
        recipientId={recipientId}
        setRecipientId={setRecipientId}
        u={u}
        key={u.id}
      />
    ));
};

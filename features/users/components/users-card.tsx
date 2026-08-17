import { User } from '@/features/auth/types';

type Props = {
  recipientId: string;
  u: User;
  setRecipientId: React.Dispatch<React.SetStateAction<string>>;
};

export const UserCard = ({ recipientId, setRecipientId, u }: Props) => {
  return (
    <button
      onClick={() => setRecipientId(u.id)}
      className={`w-full px-4 py-2.5 text-sm text-left rtl:text-right flex items-center gap-3 transition-colors ${
        recipientId === u.id
          ? 'bg-primary/10 text-primary font-medium'
          : 'hover:bg-muted/50'
      }`}
    >
      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
        {u.username.charAt(0).toUpperCase()}
      </div>
      <div className="min-w-0">
        <p className="font-medium truncate">{u.username}</p>
        <p className="text-xs text-muted-foreground truncate">{u.email}</p>
      </div>
    </button>
  );
};

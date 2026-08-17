import Link from 'next/link';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRightLeft, Calendar, Mail, Pencil, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { selectUser } from '@/features/auth/store';
import { useTranslation } from '@/lib/i18n';

type Props = {
  initials: string;
  editing: boolean;
  editName: string;

  setEditName: React.Dispatch<React.SetStateAction<string>>;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;

  handleSave: () => void;
};

export const HeroCard = ({
  editName,
  editing,
  handleSave,
  initials,
  setEditName,
  setEditing,
}: Props) => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="overflow-hidden border-border/60">
        <div className="h-24 bg-linear-to-r from-primary/30 via-primary/20 to-transparent" />
        <CardContent className="px-6 pb-6 -mt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-extrabold shadow-lg border-4 border-background shrink-0">
              {initials}
            </div>

            <div className="flex-1 pb-1">
              {editing ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="h-9 text-lg font-bold max-w-xs"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSave();
                      if (e.key === 'Escape') setEditing(false);
                    }}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleSave}
                    className="text-green-600 hover:text-green-700"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setEditName(user?.username || 'unknown');
                      setEditing(false);
                    }}
                    className="text-muted-foreground"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground">
                    {editName}
                  </h1>
                  <button
                    onClick={() => setEditing(true)}
                    className="text-muted-foreground hover:text-primary transition-colors p-1 rounded"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> {user?.email || ''}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {t.memberSince}{' '}
                  {formatDistanceToNow(user?.createdAt || new Date())}
                </span>
              </div>
            </div>

            {user?.role !== 'admin' && (
              <Link href="/transfer">
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5 mr-1.5 rtl:ml-1.5 rtl:mr-0" />{' '}
                  {t.startTransfer}
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

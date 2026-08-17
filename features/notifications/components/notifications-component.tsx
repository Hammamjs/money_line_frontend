'use client';

import { useTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  CheckCircle2,
  Loader2,
  MessageSquare,
  BellOff,
  Trash,
} from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useGetUserNotificationQuery } from '../api/notifications-slice.api';
import { NotificationStatus } from '../types/notification.types';
import { useUpdateNotificationsStatusAction } from '../hooks/use-update-notification-status';
import { toast } from 'sonner';
import { useUpdateNotificationAction } from '../hooks/use-update-notification-action';
import { useDeleteNotificationAction } from '../hooks/use-delete-notification';

function NotificationIcon({ type }: { type: NotificationStatus }) {
  if (type === 'read')
    return <CheckCircle2 className="w-5 h-5 text-green-500" />;
  if (type === 'unread') return <Loader2 className="w-5 h-5 text-blue-500" />;
  return <MessageSquare className="w-5 h-5 text-primary" />;
}

export default function NotificationComponent() {
  const { t } = useTranslation();

  const { data: notifications } = useGetUserNotificationQuery();

  const { updateStatus } = useUpdateNotificationsStatusAction();
  const { markAsRead } = useUpdateNotificationAction();
  const { deleteNotfication } = useDeleteNotificationAction();

  const handleRead = async (id: string) => {
    try {
      await markAsRead(id);
      toast.success('Marked as read');
    } catch (err) {
      console.log(err);
    }
  };

  const handleMarkAll = async () => {
    try {
      await updateStatus();
      toast.success('Marked as read');
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotfication(id);
      toast.success('Notification deleted');
    } catch (err) {
      console.log(err);
    }
  };

  const unread = notifications?.filter((n) => n.status === 'unread').length;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/10 py-8 px-4">
      <div className="container max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              {t.notifications}
            </h1>
            {(notifications?.length || 0) > 0 && (
              <Badge className="bg-primary/10 text-primary border-primary/30">
                {notifications?.length}
              </Badge>
            )}
          </div>
          {(unread || 0) > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAll}
              className="text-muted-foreground"
            >
              {t.markAllRead}
            </Button>
          )}
        </div>

        {notifications?.length === 0 ? (
          <div className="text-center py-24 bg-background rounded-xl border border-dashed">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <BellOff className="w-10 h-10 text-primary/30" />
            </div>
            <h3 className="text-xl font-medium mb-2">{t.noNotifications}</h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              {t.noNotificationsDesc}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications?.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:shadow-md border ${
                    n.status === 'read'
                      ? 'border-border/50 opacity-70'
                      : 'border-primary/30 bg-primary/3'
                  }`}
                  onClick={() => handleRead(n.id)}
                >
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="mt-0.5 shrink-0">
                      <NotificationIcon type={n.status} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`font-semibold text-sm ${
                            n.status === 'read'
                              ? 'text-muted-foreground'
                              : 'text-foreground'
                          }`}
                        >
                          {n.title}
                        </p>

                        <div className="flex items-center gap-2">
                          {n.status === 'unread' && (
                            <span className="shrink-0 w-2 h-2 rounded-full bg-primary mt-1.5" />
                          )}

                          <button
                            type="button"
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(n.id);
                            }}
                          >
                            <Trash className="shrink-0  text-red-500 w-4 cursor-pointer hover:text-white transition-colors" />
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                        {n.message}
                      </p>

                      <p className="text-xs text-muted-foreground/60 mt-2">
                        {format(new Date(n.createdAt), 'MMM d, yyyy · HH:mm')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

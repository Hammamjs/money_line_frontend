export type NotificationStatus = 'read' | 'unread';

export type Notification = {
  id: string;
  message: string;
  title: string;
  status: NotificationStatus;
  userId: string;
  createdAt: Date;
};

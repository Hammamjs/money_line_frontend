import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useUsersList } from '../hooks/use-users-list.action';

export const DeleteUserModal = () => {
  const { handleDelete, pendingDelete, setPendingDelete } = useUsersList();

  return (
    <AlertDialog
      open={pendingDelete !== null}
      onOpenChange={(open) => {
        if (!open) {
          setPendingDelete(null);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {pendingDelete?.username}?</AlertDialogTitle>

          <AlertDialogDescription>
            This is a demo, so the user will only be removed from the local page
            state. In a real application, this would permanently remove the
            account and its data.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-700 text-white hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

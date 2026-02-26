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

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
}

interface DeleteEmployeeDialogProps {
  employee: Employee | null;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}

export function DeleteEmployeeDialog({
  employee,
  onConfirm,
  onOpenChange,
}: DeleteEmployeeDialogProps) {
  return (
    <AlertDialog
      open={!!employee}
      onOpenChange={(open) => !open && onOpenChange(false)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete employee</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{' '}
            {employee
              ? `${employee.first_name} ${employee.last_name}`
              : ''}
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

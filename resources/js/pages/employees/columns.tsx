import { Link } from '@inertiajs/react';
import { createColumnHelper } from '@tanstack/react-table';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { StatusBadge } from '@/components';
import { Button } from '@/components/ui/button';
import { edit } from '@/routes/employees';

export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  salary: string;
  start_date: string;
}

const columnHelper = createColumnHelper<Employee>();

export function createEmployeeColumns(onDelete: (employee: Employee) => void) {
  return [
    columnHelper.accessor(
      (row) => `${row.first_name} ${row.last_name}`,
      {
        id: 'name',
        header: 'Name',
        cell: (info) => (
          <span className="font-medium">{info.getValue()}</span>
        ),
      },
    ),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: (info) => (
        <span className="text-[#5c5c59] dark:text-[#a1a19a]">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('phone', {
      header: 'Phone',
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => <StatusBadge status={info.getValue()} />,
    }),
    columnHelper.accessor('salary', {
      header: 'Salary',
      cell: (info) =>
        `₱${Number(info.getValue()).toLocaleString()}`,
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      meta: { align: 'right' as const },
      cell: (info) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon-sm" asChild>
            <Link
              href={edit.url(info.row.original.id)}
              aria-label={`Edit ${info.row.original.first_name} ${info.row.original.last_name}`}
            >
              <PencilIcon className="size-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(info.row.original)}
            aria-label={`Delete ${info.row.original.first_name} ${info.row.original.last_name}`}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2Icon className="size-4" />
          </Button>
        </div>
      ),
    }),
  ];
}

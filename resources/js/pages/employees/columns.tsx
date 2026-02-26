import { Link } from '@inertiajs/react';
import { createColumnHelper } from '@tanstack/react-table';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { StatusBadge } from '@/components';
import { Button } from '@/components/ui/button';
import { edit } from '@/routes/employees';

export interface Employee {
  id: string;
  employee_number: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  employment_type: string;
  salary_type: string;
  basic_salary: string | null;
  daily_rate: string | null;
  status: string;
  hire_date: string;
}

function formatCompensation(row: Employee): string {
  if (row.salary_type === 'daily' && row.daily_rate) {
    return `₱${Number(row.daily_rate).toLocaleString()}/day`;
  }
  if (row.basic_salary) {
    return `₱${Number(row.basic_salary).toLocaleString()}`;
  }
  return '—';
}

const columnHelper = createColumnHelper<Employee>();

export function createEmployeeColumns(onDelete: (employee: Employee) => void) {
  return [
    columnHelper.accessor('employee_number', {
      header: 'Employee #',
      cell: (info) => (
        <span className="font-mono text-sm">{info.getValue()}</span>
      ),
    }),
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
    columnHelper.accessor((row) => row.employment_type, {
      id: 'employment_type',
      header: 'Type',
      cell: (info) => {
        const value = info.getValue();
        const labels: Record<string, string> = {
          regular: 'Regular',
          probationary: 'Probationary',
          contractor: 'Contractor',
        };
        return labels[value] ?? value;
      },
    }),
    columnHelper.display({
      id: 'compensation',
      header: 'Compensation',
      cell: (info) => formatCompensation(info.row.original),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => <StatusBadge status={info.getValue()} />,
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

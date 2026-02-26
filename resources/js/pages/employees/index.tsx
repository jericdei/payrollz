import { Head, Link, router, usePage } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { DataTable, PageHeader, Pagination } from '@/components';
import DashboardLayout from '@/layouts/DashboardLayout';
import { createEmployeeColumns } from '@/pages/employees/columns';
import type { Employee } from '@/pages/employees/columns';
import { DeleteEmployeeDialog } from '@/pages/employees/components/DeleteEmployeeDialog';
import { create, destroy } from '@/routes/employees';

interface PaginatedEmployees {
  data: Employee[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  links: { url: string | null; label: string; active: boolean }[];
}

export default function Index() {
  const { employees } = usePage().props as unknown as {
    employees: PaginatedEmployees;
  };

  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );

  const columns = useMemo(
    () => createEmployeeColumns(setEmployeeToDelete),
    [],
  );

  const confirmDelete = () => {
    if (employeeToDelete) {
      router.delete(destroy.url(employeeToDelete.id));
      setEmployeeToDelete(null);
    }
  };

  const showingFrom =
    employees.data.length === 0
      ? 0
      : (employees.current_page - 1) * employees.per_page + 1;
  const showingTo = Math.min(
    employees.current_page * employees.per_page,
    employees.total,
  );

  return (
    <>
      <Head title="Employees — Payrollz" />
      <DashboardLayout>
        <PageHeader
          title="Employees"
          action={
            <Link
              href={create.url()}
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#1a1a18] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2a2a28] dark:bg-white dark:text-[#0c0c0b] dark:hover:bg-[#e8e8e6]"
            >
              Add employee
            </Link>
          }
        />

        <DataTable<Employee>
          columns={columns as ColumnDef<Employee, unknown>[]}
          data={employees.data}
          getRowId={(row) => row.id}
          emptyState={
            <>
              No employees yet.{' '}
              <Link
                href={create.url()}
                className="font-medium text-[#1a1a18] hover:underline dark:text-white"
              >
                Add your first employee
              </Link>
            </>
          }
          footer={
            employees.last_page > 1 ? (
              <Pagination
                links={employees.links}
                showingFrom={showingFrom}
                showingTo={showingTo}
                total={employees.total}
              />
            ) : undefined
          }
        />

        <DeleteEmployeeDialog
          employee={employeeToDelete}
          onConfirm={confirmDelete}
          onOpenChange={() => setEmployeeToDelete(null)}
        />
      </DashboardLayout>
    </>
  );
}

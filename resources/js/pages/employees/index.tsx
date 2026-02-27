import { Head, Link, router, usePage } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { PlusIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { DataTable, PageHeader, Pagination } from '@/components';
import { useIsNavigating } from '@/hooks/useIsNavigating';
import DashboardLayout from '@/layouts/DashboardLayout';
import { getEmployeesCache, setEmployeesCache } from '@/lib/employeesCache';
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

  const { isNavigating, targetUrl } = useIsNavigating('/employees');
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );

  useEffect(() => {
    setEmployeesCache(window.location.href, employees);
  }, [employees]);

  const cachedEmployees =
    isNavigating && targetUrl ? getEmployeesCache(targetUrl) : null;
  const displayEmployees = cachedEmployees ?? employees;
  const showSkeleton = isNavigating && !cachedEmployees;

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
    displayEmployees.data.length === 0
      ? 0
      : (displayEmployees.current_page - 1) * displayEmployees.per_page + 1;

  const showingTo = Math.min(
    displayEmployees.current_page * displayEmployees.per_page,
    displayEmployees.total,
  );

  return (
    <>
      <Head title="Employees — Payrollz" />
      <DashboardLayout>
        <div className="flex min-h-0 flex-1 flex-col">
          <PageHeader
            className="shrink-0"
            title="Employees"
            action={
              <Link
                href={create.url()}
                className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#1a1a18] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2a2a28] dark:bg-white dark:text-[#0c0c0b] dark:hover:bg-[#e8e8e6]"
              >
                <PlusIcon className="size-4 mr-2" />
                <span>Add employee</span>
              </Link>
            }
          />
          <div className="flex min-h-0 flex-1 flex-col">
            <DataTable<Employee>
              columns={columns as ColumnDef<Employee, unknown>[]}
              data={displayEmployees.data}
              getRowId={(row) => row.id}
              isLoading={showSkeleton}
              skeletonRowCount={10}
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
                displayEmployees.last_page > 1 ? (
                  <Pagination
                    links={displayEmployees.links}
                    showingFrom={showingFrom}
                    showingTo={showingTo}
                    total={displayEmployees.total}
                  />
                ) : undefined
              }
            />
          </div>
        </div>

        <DeleteEmployeeDialog
          employee={employeeToDelete}
          onConfirm={confirmDelete}
          onOpenChange={() => setEmployeeToDelete(null)}
        />
      </DashboardLayout>
    </>
  );
}

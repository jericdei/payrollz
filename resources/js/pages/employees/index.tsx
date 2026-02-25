import { Head, Link, router, usePage } from '@inertiajs/react';
import DashboardLayout from '@/layouts/DashboardLayout';

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  salary: string;
  start_date: string;
}

interface PaginatedEmployees {
  data: Employee[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  links: { url: string | null; label: string; active: boolean }[];
}

export default function Index() {
  const { employees, flash } = usePage().props as {
    employees: PaginatedEmployees;
    flash: { success?: string };
  };

  const deleteEmployee = (employee: Employee) => {
    if (confirm(`Delete ${employee.first_name} ${employee.last_name}?`)) {
      router.delete(`/employees/${employee.id}`);
    }
  };

  return (
    <>
      <Head title="Employees — Payrollz" />
      <DashboardLayout>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Employees</h1>
          <Link
            href="/employees/create"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#1a1a18] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2a2a28] dark:bg-white dark:text-[#0c0c0b] dark:hover:bg-[#e8e8e6]"
          >
            Add employee
          </Link>
        </div>

        {flash?.success && (
          <div className="mb-6 rounded-lg bg-[#eef2ed] px-4 py-3 text-sm text-[#2d5a27] dark:bg-[#1a2418] dark:text-[#6b9c64]">
            {flash.success}
          </div>
        )}

        <div className="overflow-hidden rounded-lg border border-[#e8e8e5] bg-white dark:border-[#272724] dark:bg-[#161615]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#e8e8e5] dark:divide-[#272724]">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#5c5c59] dark:text-[#a1a19a]">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#5c5c59] dark:text-[#a1a19a]">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#5c5c59] dark:text-[#a1a19a]">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#5c5c59] dark:text-[#a1a19a]">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#5c5c59] dark:text-[#a1a19a]">
                    Salary
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#5c5c59] dark:text-[#a1a19a]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e8e5] dark:divide-[#272724]">
                {employees.data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-[#5c5c59] dark:text-[#a1a19a]"
                    >
                      No employees yet.{' '}
                      <Link
                        href="/employees/create"
                        className="font-medium text-[#1a1a18] hover:underline dark:text-white"
                      >
                        Add your first employee
                      </Link>
                    </td>
                  </tr>
                ) : (
                  employees.data.map((employee) => (
                    <tr key={employee.id} className="hover:bg-[#fafaf8] dark:hover:bg-[#1a1a18]">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {employee.first_name} {employee.last_name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-[#5c5c59] dark:text-[#a1a19a]">
                        {employee.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">{employee.phone}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            employee.status === 'active'
                              ? 'bg-[#eef2ed] text-[#2d5a27] dark:bg-[#1a2418] dark:text-[#6b9c64]'
                              : 'bg-[#f5f5f3] text-[#5c5c59] dark:bg-[#272724] dark:text-[#a1a19a]'
                          }`}
                        >
                          {employee.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        ${Number(employee.salary).toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/employees/${employee.id}/edit`}
                            className="text-sm font-medium text-[#1a1a18] hover:underline dark:text-white"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => deleteEmployee(employee)}
                            className="text-sm font-medium text-red-600 hover:underline dark:text-red-400"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {employees.last_page > 1 && (
            <div className="flex items-center justify-between border-t border-[#e8e8e5] px-6 py-3 dark:border-[#272724]">
              <p className="text-sm text-[#5c5c59] dark:text-[#a1a19a]">
                Showing {(employees.current_page - 1) * employees.per_page + 1} to{' '}
                {Math.min(employees.current_page * employees.per_page, employees.total)} of{' '}
                {employees.total} results
              </p>
              <div className="flex gap-2">
                {employees.links.map((link, i) => {
                  const label = link.label
                    .replace(/&laquo;\s*/g, '')
                    .replace(/\s*&raquo;/g, '')
                    .trim();
                  if (!link.url) {
                    return (
                      <span
                        key={i}
                        className="rounded px-3 py-1 text-sm text-[#9a9a97] dark:text-[#6b6b68]"
                      >
                        {label}
                      </span>
                    );
                  }
                  return (
                    <Link
                      key={i}
                      href={link.url}
                      className={`rounded px-3 py-1 text-sm ${
                        link.active
                          ? 'bg-[#1a1a18] text-white dark:bg-white dark:text-[#0c0c0b]'
                          : 'text-[#1a1a18] hover:bg-[#f5f5f3] dark:text-white dark:hover:bg-[#1a1a18]'
                      }`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}

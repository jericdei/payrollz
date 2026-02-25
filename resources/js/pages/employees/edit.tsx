import { Head, Link, useForm } from '@inertiajs/react';
import DashboardLayout from '@/layouts/DashboardLayout';

const inputClass =
  'w-full rounded-lg border border-[#d4d4d1] bg-white px-4 py-2.5 text-[#1a1a18] placeholder-[#9a9a97] focus:border-[#1a1a18] focus:outline-none focus:ring-1 focus:ring-[#1a1a18] dark:border-[#3a3a38] dark:bg-[#161615] dark:placeholder-[#6b6b68] dark:focus:border-[#e8e8e6] dark:focus:ring-[#e8e8e6]';

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  salary: string;
  start_date: string;
  end_date: string | null;
  status: string;
}

function formatDateForInput(date: string | null): string {
  if (!date) return '';
  return date.split('T')[0];
}

export default function Edit({ employee }: { employee: Employee }) {
  const { data, setData, put, processing, errors } = useForm({
    first_name: employee.first_name,
    last_name: employee.last_name,
    email: employee.email,
    phone: employee.phone,
    address: employee.address,
    salary: employee.salary,
    start_date: formatDateForInput(employee.start_date),
    end_date: formatDateForInput(employee.end_date),
    status: employee.status,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/employees/${employee.id}`);
  };

  return (
    <>
      <Head title={`Edit ${employee.first_name} ${employee.last_name} — Payrollz`} />
      <DashboardLayout>
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/employees"
            className="text-sm text-[#5c5c59] hover:text-[#1a1a18] dark:text-[#a1a19a] dark:hover:text-white"
          >
            ← Employees
          </Link>
        </div>
        <h1 className="mb-8 text-2xl font-semibold tracking-tight">
          Edit {employee.first_name} {employee.last_name}
        </h1>

        <form onSubmit={submit} className="max-w-xl space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="first_name" className="mb-1.5 block text-sm font-medium">
                First name
              </label>
              <input
                id="first_name"
                type="text"
                value={data.first_name}
                onChange={(e) => setData('first_name', e.target.value)}
                className={inputClass}
                placeholder="Jane"
              />
              {errors.first_name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.first_name}</p>
              )}
            </div>
            <div>
              <label htmlFor="last_name" className="mb-1.5 block text-sm font-medium">
                Last name
              </label>
              <input
                id="last_name"
                type="text"
                value={data.last_name}
                onChange={(e) => setData('last_name', e.target.value)}
                className={inputClass}
                placeholder="Doe"
              />
              {errors.last_name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.last_name}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className={inputClass}
              placeholder="jane@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
              Phone
            </label>
            <input
              id="phone"
              type="text"
              value={data.phone}
              onChange={(e) => setData('phone', e.target.value)}
              className={inputClass}
              placeholder="+1 555 000 0000"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="mb-1.5 block text-sm font-medium">
              Address
            </label>
            <textarea
              id="address"
              rows={2}
              value={data.address}
              onChange={(e) => setData('address', e.target.value)}
              className={inputClass}
              placeholder="123 Main St, City, State"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.address}</p>
            )}
          </div>

          <div>
            <label htmlFor="salary" className="mb-1.5 block text-sm font-medium">
              Salary
            </label>
            <input
              id="salary"
              type="number"
              step="0.01"
              min="0"
              value={data.salary}
              onChange={(e) => setData('salary', e.target.value)}
              className={inputClass}
              placeholder="50000.00"
            />
            {errors.salary && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.salary}</p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="start_date" className="mb-1.5 block text-sm font-medium">
                Start date
              </label>
              <input
                id="start_date"
                type="date"
                value={data.start_date}
                onChange={(e) => setData('start_date', e.target.value)}
                className={inputClass}
              />
              {errors.start_date && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.start_date}</p>
              )}
            </div>
            <div>
              <label htmlFor="end_date" className="mb-1.5 block text-sm font-medium">
                End date <span className="text-[#5c5c59] dark:text-[#a1a19a]">(optional)</span>
              </label>
              <input
                id="end_date"
                type="date"
                value={data.end_date}
                onChange={(e) => setData('end_date', e.target.value)}
                className={inputClass}
              />
              {errors.end_date && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.end_date}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="status" className="mb-1.5 block text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              value={data.status}
              onChange={(e) => setData('status', e.target.value)}
              className={inputClass}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.status}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={processing}
              className="rounded-lg bg-[#1a1a18] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2a2a28] disabled:opacity-50 dark:bg-white dark:text-[#0c0c0b] dark:hover:bg-[#e8e8e6]"
            >
              {processing ? 'Saving…' : 'Save changes'}
            </button>
            <Link
              href="/employees"
              className="rounded-lg border border-[#d4d4d1] px-5 py-2.5 text-sm font-medium transition hover:bg-[#f5f5f3] dark:border-[#3a3a38] dark:hover:bg-[#1a1a18]"
            >
              Cancel
            </Link>
          </div>
        </form>
      </DashboardLayout>
    </>
  );
}

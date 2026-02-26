import { Head, Link, useForm } from '@inertiajs/react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { InputField, TextareaField, SelectField } from '@/components/form';

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

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
      <Head
        title={`Edit ${employee.first_name} ${employee.last_name} — Payrollz`}
      />
      <DashboardLayout>
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/employees"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Employees
          </Link>
        </div>
        <h1 className="mb-8 text-2xl font-semibold tracking-tight">
          Edit {employee.first_name} {employee.last_name}
        </h1>

        <form onSubmit={submit} className="max-w-xl space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <InputField
              label="First name"
              name="first_name"
              value={data.first_name}
              onChange={(v) => setData('first_name', v)}
              error={errors.first_name}
              placeholder="Jane"
            />
            <InputField
              label="Last name"
              name="last_name"
              value={data.last_name}
              onChange={(v) => setData('last_name', v)}
              error={errors.last_name}
              placeholder="Doe"
            />
          </div>

          <InputField
            label="Email"
            name="email"
            type="email"
            value={data.email}
            onChange={(v) => setData('email', v)}
            error={errors.email}
            placeholder="jane@example.com"
          />

          <InputField
            label="Phone"
            name="phone"
            value={data.phone}
            onChange={(v) => setData('phone', v)}
            error={errors.phone}
            placeholder="+1 555 000 0000"
          />

          <TextareaField
            label="Address"
            name="address"
            value={data.address}
            onChange={(v) => setData('address', v)}
            error={errors.address}
            placeholder="123 Main St, City, State"
            rows={2}
          />

          <InputField
            label="Salary"
            name="salary"
            type="number"
            step="0.01"
            min={0}
            value={data.salary}
            onChange={(v) => setData('salary', v)}
            error={errors.salary}
            placeholder="50000.00"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <InputField
              label="Start date"
              name="start_date"
              type="date"
              value={data.start_date}
              onChange={(v) => setData('start_date', v)}
              error={errors.start_date}
            />
            <InputField
              label="End date"
              name="end_date"
              type="date"
              value={data.end_date}
              onChange={(v) => setData('end_date', v)}
              error={errors.end_date}
              optional
            />
          </div>

          <SelectField
            label="Status"
            name="status"
            value={data.status}
            onChange={(v) => setData('status', v)}
            options={STATUS_OPTIONS}
            error={errors.status}
          />

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={processing}>
              {processing ? 'Saving…' : 'Save changes'}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/employees">Cancel</Link>
            </Button>
          </div>
        </form>
      </DashboardLayout>
    </>
  );
}

import { Form, Head, Link, usePage } from '@inertiajs/react';
import {
  InputField,
  TextareaField,
  NativeSelectField,
} from '@/components/form';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/layouts/DashboardLayout';
import { index, store } from '@/routes/employees';

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

interface CreateProps {
  old?: Record<string, string>;
}

interface PageErrors {
  [key: string]: string;
}

export default function Create({ old: oldInput }: CreateProps) {
  const { props } = usePage<{ errors?: PageErrors }>();
  const errors = props.errors ?? {};
  const getOld = (key: string) => oldInput?.[key] ?? '';

  return (
    <>
      <Head title="Add Employee — Payrollz" />
      <DashboardLayout>
        <div className="mb-8 flex items-center gap-4">
          <Link
            href={index.url()}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Employees
          </Link>
        </div>
        <h1 className="mb-8 text-2xl font-semibold tracking-tight">
          Add employee
        </h1>

        <Form action={store()} className="max-w-xl space-y-5">
          {({ processing }) => (
            <>
              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField
                    label="First name"
                    name="first_name"
                    defaultValue={getOld('first_name')}
                    error={errors.first_name}
                    placeholder="Jane"
                  />
                  <InputField
                    label="Last name"
                    name="last_name"
                    defaultValue={getOld('last_name')}
                    error={errors.last_name}
                    placeholder="Doe"
                  />
                </div>

                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  defaultValue={getOld('email')}
                  error={errors.email}
                  placeholder="jane@example.com"
                />

                <InputField
                  label="Phone"
                  name="phone"
                  defaultValue={getOld('phone')}
                  error={errors.phone}
                  placeholder="+1 555 000 0000"
                />

                <TextareaField
                  label="Address"
                  name="address"
                  defaultValue={getOld('address')}
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
                  defaultValue={getOld('salary')}
                  error={errors.salary}
                  placeholder="50000.00"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField
                    label="Start date"
                    name="start_date"
                    type="date"
                    defaultValue={getOld('start_date')}
                    error={errors.start_date}
                  />
                  <InputField
                    label="End date"
                    name="end_date"
                    type="date"
                    defaultValue={getOld('end_date')}
                    error={errors.end_date}
                    optional
                  />
                </div>

                <NativeSelectField
                  label="Status"
                  name="status"
                  options={STATUS_OPTIONS}
                  defaultValue={getOld('status') || 'active'}
                  error={errors.status}
                />

                <div className="flex gap-3 pt-4">
                  <Button type="submit" disabled={processing}>
                    {processing ? 'Creating…' : 'Create employee'}
                  </Button>

                  <Button variant="outline" asChild>
                    <Link href={index.url()}>Cancel</Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </Form>
      </DashboardLayout>
    </>
  );
}

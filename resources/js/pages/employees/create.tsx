import { Form, Head, Link, usePage } from '@inertiajs/react';
import { InputField, NativeSelectField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/layouts/DashboardLayout';
import { index, store } from '@/routes/employees';

const EMPLOYMENT_TYPE_OPTIONS = [
  { value: 'regular', label: 'Regular' },
  { value: 'probationary', label: 'Probationary' },
  { value: 'contractor', label: 'Contractor' },
];

const SALARY_TYPE_OPTIONS = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'semi-monthly', label: 'Semi-monthly' },
];

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'resigned', label: 'Resigned' },
  { value: 'terminated', label: 'Terminated' },
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
        <div className="min-h-0 flex-1 overflow-auto">
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

        <Form action={store()} className="max-w-xl space-y-8">
          {({ processing }) => (
            <>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="basic">Basic information</TabsTrigger>
                  <TabsTrigger value="employment">Employment</TabsTrigger>
                  <TabsTrigger value="government">Government</TabsTrigger>
                </TabsList>
                <TabsContent value="basic" className="space-y-5">
                  <InputField
                    label="Employee number"
                    name="employee_number"
                    defaultValue={getOld('employee_number')}
                    error={errors.employee_number}
                    placeholder="EMP0001"
                  />
                  <div className="grid gap-5 sm:grid-cols-3">
                    <InputField
                      label="First name"
                      name="first_name"
                      defaultValue={getOld('first_name')}
                      error={errors.first_name}
                      placeholder="Jane"
                    />
                    <InputField
                      label="Middle name"
                      name="middle_name"
                      defaultValue={getOld('middle_name')}
                      error={errors.middle_name}
                      placeholder="Marie"
                      optional
                    />
                    <InputField
                      label="Last name"
                      name="last_name"
                      defaultValue={getOld('last_name')}
                      error={errors.last_name}
                      placeholder="Doe"
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InputField
                      label="Birthdate"
                      name="birthdate"
                      type="date"
                      defaultValue={getOld('birthdate')}
                      error={errors.birthdate}
                      optional
                    />
                    <InputField
                      label="Hire date"
                      name="hire_date"
                      type="date"
                      defaultValue={getOld('hire_date')}
                      error={errors.hire_date}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="employment" className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <NativeSelectField
                      label="Employment type"
                      name="employment_type"
                      options={EMPLOYMENT_TYPE_OPTIONS}
                      defaultValue={getOld('employment_type') || 'regular'}
                      error={errors.employment_type}
                    />
                    <NativeSelectField
                      label="Salary type"
                      name="salary_type"
                      options={SALARY_TYPE_OPTIONS}
                      defaultValue={getOld('salary_type') || 'monthly'}
                      error={errors.salary_type}
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InputField
                      label="Basic salary (₱)"
                      name="basic_salary"
                      type="number"
                      step="0.01"
                      min={0}
                      defaultValue={getOld('basic_salary')}
                      error={errors.basic_salary}
                      placeholder="0.00"
                      optional
                    />
                    <InputField
                      label="Daily rate (₱)"
                      name="daily_rate"
                      type="number"
                      step="0.01"
                      min={0}
                      defaultValue={getOld('daily_rate')}
                      error={errors.daily_rate}
                      placeholder="0.00"
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
                </TabsContent>
                <TabsContent value="government">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InputField
                      label="SSS number"
                      name="sss_number"
                      defaultValue={getOld('sss_number')}
                      error={errors.sss_number}
                      placeholder=""
                      optional
                    />
                    <InputField
                      label="PhilHealth number"
                      name="philhealth_number"
                      defaultValue={getOld('philhealth_number')}
                      error={errors.philhealth_number}
                      placeholder=""
                      optional
                    />
                    <InputField
                      label="Pag-IBIG number"
                      name="pagibig_number"
                      defaultValue={getOld('pagibig_number')}
                      error={errors.pagibig_number}
                      placeholder=""
                      optional
                    />
                    <InputField
                      label="TIN number"
                      name="tin_number"
                      defaultValue={getOld('tin_number')}
                      error={errors.tin_number}
                      placeholder=""
                      optional
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={processing}>
                  {processing ? 'Creating…' : 'Create employee'}
                </Button>

                <Button variant="outline" asChild>
                  <Link href={index.url()}>Cancel</Link>
                </Button>
              </div>
            </>
          )}
        </Form>
        </div>
      </DashboardLayout>
    </>
  );
}

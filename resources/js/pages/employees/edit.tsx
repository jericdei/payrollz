import { Head, Link, useForm } from '@inertiajs/react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { InputField, SelectField } from '@/components/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { index, update } from '@/routes/employees';

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

interface Employee {
  id: string;
  employee_number: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  birthdate: string | null;
  hire_date: string;
  employment_type: string;
  salary_type: string;
  basic_salary: string | null;
  daily_rate: string | null;
  status: string;
  sss_number: string | null;
  philhealth_number: string | null;
  pagibig_number: string | null;
  tin_number: string | null;
}

function formatDateForInput(date: string | null): string {
  if (!date) return '';
  return date.split('T')[0];
}

export default function Edit({ employee }: { employee: Employee }) {
  const { data, setData, put, processing, errors } = useForm({
    employee_number: employee.employee_number,
    first_name: employee.first_name,
    last_name: employee.last_name,
    middle_name: employee.middle_name ?? '',
    birthdate: formatDateForInput(employee.birthdate),
    hire_date: formatDateForInput(employee.hire_date),
    employment_type: employee.employment_type,
    salary_type: employee.salary_type,
    basic_salary: employee.basic_salary ?? '',
    daily_rate: employee.daily_rate ?? '',
    status: employee.status,
    sss_number: employee.sss_number ?? '',
    philhealth_number: employee.philhealth_number ?? '',
    pagibig_number: employee.pagibig_number ?? '',
    tin_number: employee.tin_number ?? '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(update.url(employee.id));
  };

  return (
    <>
      <Head
        title={`Edit ${employee.first_name} ${employee.last_name} — Payrollz`}
      />
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
          Edit {employee.first_name} {employee.last_name}
        </h1>

        <form onSubmit={submit} className="max-w-xl space-y-8">
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
                value={data.employee_number}
                onChange={(v) => setData('employee_number', v)}
                error={errors.employee_number}
                placeholder="EMP0001"
              />
              <div className="grid gap-5 sm:grid-cols-3">
                <InputField
                  label="First name"
                  name="first_name"
                  value={data.first_name}
                  onChange={(v) => setData('first_name', v)}
                  error={errors.first_name}
                  placeholder="Jane"
                />
                <InputField
                  label="Middle name"
                  name="middle_name"
                  value={data.middle_name}
                  onChange={(v) => setData('middle_name', v)}
                  error={errors.middle_name}
                  placeholder="Marie"
                  optional
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
              <div className="grid gap-5 sm:grid-cols-2">
                <InputField
                  label="Birthdate"
                  name="birthdate"
                  type="date"
                  value={data.birthdate}
                  onChange={(v) => setData('birthdate', v)}
                  error={errors.birthdate}
                  optional
                />
                <InputField
                  label="Hire date"
                  name="hire_date"
                  type="date"
                  value={data.hire_date}
                  onChange={(v) => setData('hire_date', v)}
                  error={errors.hire_date}
                />
              </div>
            </TabsContent>
            <TabsContent value="employment" className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField
                  label="Employment type"
                  name="employment_type"
                  value={data.employment_type}
                  onChange={(v) => setData('employment_type', v)}
                  options={EMPLOYMENT_TYPE_OPTIONS}
                  error={errors.employment_type}
                />
                <SelectField
                  label="Salary type"
                  name="salary_type"
                  value={data.salary_type}
                  onChange={(v) => setData('salary_type', v)}
                  options={SALARY_TYPE_OPTIONS}
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
                  value={data.basic_salary}
                  onChange={(v) => setData('basic_salary', v)}
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
                  value={data.daily_rate}
                  onChange={(v) => setData('daily_rate', v)}
                  error={errors.daily_rate}
                  placeholder="0.00"
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
            </TabsContent>
            <TabsContent value="government">
              <div className="grid gap-5 sm:grid-cols-2">
                <InputField
                  label="SSS number"
                  name="sss_number"
                  value={data.sss_number}
                  onChange={(v) => setData('sss_number', v)}
                  error={errors.sss_number}
                  placeholder=""
                  optional
                />
                <InputField
                  label="PhilHealth number"
                  name="philhealth_number"
                  value={data.philhealth_number}
                  onChange={(v) => setData('philhealth_number', v)}
                  error={errors.philhealth_number}
                  placeholder=""
                  optional
                />
                <InputField
                  label="Pag-IBIG number"
                  name="pagibig_number"
                  value={data.pagibig_number}
                  onChange={(v) => setData('pagibig_number', v)}
                  error={errors.pagibig_number}
                  placeholder=""
                  optional
                />
                <InputField
                  label="TIN number"
                  name="tin_number"
                  value={data.tin_number}
                  onChange={(v) => setData('tin_number', v)}
                  error={errors.tin_number}
                  placeholder=""
                  optional
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={processing}>
              {processing ? 'Saving…' : 'Save changes'}
            </Button>
            <Button variant="outline" asChild>
              <Link href={index.url()}>Cancel</Link>
            </Button>
          </div>
        </form>
        </div>
      </DashboardLayout>
    </>
  );
}

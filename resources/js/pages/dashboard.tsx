import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/layouts/DashboardLayout';

export default function Dashboard() {
  return (
    <>
      <Head title="Dashboard — Payrollz">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
          rel="stylesheet"
        />
      </Head>
      <DashboardLayout>
        <h1 className="mb-8 text-2xl font-semibold tracking-tight">Dashboard</h1>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/employees"
            className="flex items-center gap-4 rounded-lg border border-[#e8e8e5] bg-white p-6 transition hover:border-[#d4d4d1] hover:bg-[#fafaf8] dark:border-[#272724] dark:bg-[#161615] dark:hover:border-[#3a3a38] dark:hover:bg-[#1a1a18]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#eef2ed] dark:bg-[#1a2418]">
              <svg
                className="h-6 w-6 text-[#2d5a27] dark:text-[#6b9c64]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            </div>
            <div>
              <h2 className="font-medium">Employees</h2>
              <p className="text-sm text-[#5c5c59] dark:text-[#a1a19a]">
                Manage your team
              </p>
            </div>
          </Link>

          <Link
            href="#"
            className="flex items-center gap-4 rounded-lg border border-[#e8e8e5] bg-white p-6 transition hover:border-[#d4d4d1] hover:bg-[#fafaf8] dark:border-[#272724] dark:bg-[#161615] dark:hover:border-[#3a3a38] dark:hover:bg-[#1a1a18]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#eef2ed] dark:bg-[#1a2418]">
              <svg
                className="h-6 w-6 text-[#2d5a27] dark:text-[#6b9c64]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0 1 11.97 4.06 2.236 2.236 0 0 1 1.97 0 60.07 60.07 0 0 1 11.97-4.06"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                />
              </svg>
            </div>
            <div>
              <h2 className="font-medium">Payrolls</h2>
              <p className="text-sm text-[#5c5c59] dark:text-[#a1a19a]">
                Run and view pay runs
              </p>
            </div>
          </Link>
        </div>
      </DashboardLayout>
    </>
  );
}

import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
  const { auth } = usePage().props as { auth: { user?: { name: string } } };
  const isLoggedIn = !!auth?.user;

  return (
    <>
      <Head title="Payrollz — Simple Payroll for Modern Teams">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen bg-[#FAFAF8] text-[#1a1a18] dark:bg-[#0c0c0b] dark:text-[#e8e8e6]">
        <header className="border-b border-[#e8e8e5] dark:border-[#272724]">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <span className="text-xl font-semibold tracking-tight">
              Payrollz
            </span>
            <Link
              href={isLoggedIn ? '/dashboard' : '/login'}
              className="rounded-lg border border-[#1a1a18] bg-[#1a1a18] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2a2a28] dark:border-[#e8e8e6] dark:bg-[#e8e8e6] dark:text-[#0c0c0b] dark:hover:bg-white"
            >
              {isLoggedIn ? 'Dashboard' : 'Login'}
            </Link>
          </div>
        </header>

        <main>
          <section className="mx-auto max-w-5xl px-6 py-20 lg:py-28">
            <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[#1a1a18] sm:text-5xl dark:text-white">
              Payroll that runs itself
            </h1>
            <p className="mb-10 max-w-xl text-lg text-[#5c5c59] dark:text-[#a1a19a]">
              Run payroll, track time, and stay compliant—all in one place.
              Built for small teams who want to spend less time on paperwork.
            </p>
            <Link
              href={isLoggedIn ? '/dashboard' : '/login'}
              className="inline-block rounded-lg bg-[#1a1a18] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2a2a28] dark:bg-white dark:text-[#0c0c0b] dark:hover:bg-[#e8e8e6]"
            >
              {isLoggedIn ? 'Dashboard' : 'Login'}
            </Link>
          </section>

          <section className="border-t border-[#e8e8e5] dark:border-[#272724]">
            <div className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
              <div className="grid gap-10 sm:grid-cols-3">
                <div>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#eef2ed] dark:bg-[#1a2418]">
                    <svg
                      className="h-5 w-5 text-[#2d5a27] dark:text-[#6b9c64]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-1 font-medium">Track time</h3>
                  <p className="text-sm text-[#5c5c59] dark:text-[#a1a19a]">
                    Employees clock in and out. Hours sync to payroll
                    automatically.
                  </p>
                </div>
                <div>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#eef2ed] dark:bg-[#1a2418]">
                    <svg
                      className="h-5 w-5 text-[#2d5a27] dark:text-[#6b9c64]"
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
                  <h3 className="mb-1 font-medium">Run payroll</h3>
                  <p className="text-sm text-[#5c5c59] dark:text-[#a1a19a]">
                    One-click pay runs. Direct deposit, tax withholding, and
                    payslips included.
                  </p>
                </div>
                <div>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#eef2ed] dark:bg-[#1a2418]">
                    <svg
                      className="h-5 w-5 text-[#2d5a27] dark:text-[#6b9c64]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-1 font-medium">Stay compliant</h3>
                  <p className="text-sm text-[#5c5c59] dark:text-[#a1a19a]">
                    Tax filings and year-end reports handled for you.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-[#e8e8e5] bg-[#1a1a18] dark:border-[#272724] dark:bg-[#161615]">
            <div className="mx-auto max-w-5xl px-6 py-16 text-center lg:py-24">
              <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">
                Ready to simplify payroll?
              </h2>
              <p className="mb-8 text-[#a1a19a]">
                {isLoggedIn
                  ? 'Go to your dashboard to get started.'
                  : 'Sign in to your account to get started.'}
              </p>
              <Link
                href={isLoggedIn ? '/dashboard' : '/login'}
                className="inline-block rounded-lg bg-white px-6 py-3 text-sm font-medium text-[#1a1a18] transition hover:bg-[#e8e8e6]"
              >
                {isLoggedIn ? 'Dashboard' : 'Login'}
              </Link>
            </div>
          </section>
        </main>

        <footer className="border-t border-[#e8e8e5] dark:border-[#272724]">
          <div className="mx-auto max-w-5xl px-6 py-6">
            <p className="text-sm text-[#5c5c59] dark:text-[#6b6b68]">
              © {new Date().getFullYear()} Payrollz
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

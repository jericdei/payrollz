import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <>
      <Head title="Login — Payrollz">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen bg-[#FAFAF8] text-[#1a1a18] dark:bg-[#0c0c0b] dark:text-[#e8e8e6]">
        <header className="border-b border-[#e8e8e5] dark:border-[#272724]">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight hover:opacity-80"
            >
              Payrollz
            </Link>
            <span className="rounded-lg px-4 py-2 text-sm font-medium text-[#5c5c59] dark:text-[#a1a19a]">
              Login
            </span>
          </div>
        </header>

        <main className="mx-auto flex min-h-[calc(100vh-140px)] max-w-md flex-col justify-center px-6 py-12">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="mb-8 text-[#5c5c59] dark:text-[#a1a19a]">
            Sign in to your account to continue.
          </p>

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                autoComplete="email"
                autoFocus
                className="w-full rounded-lg border border-[#d4d4d1] bg-white px-4 py-2.5 text-[#1a1a18] placeholder-[#9a9a97] focus:border-[#1a1a18] focus:outline-none focus:ring-1 focus:ring-[#1a1a18] dark:border-[#3a3a38] dark:bg-[#161615] dark:placeholder-[#6b6b68] dark:focus:border-[#e8e8e6] dark:focus:ring-[#e8e8e6]"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                autoComplete="current-password"
                className="w-full rounded-lg border border-[#d4d4d1] bg-white px-4 py-2.5 text-[#1a1a18] placeholder-[#9a9a97] focus:border-[#1a1a18] focus:outline-none focus:ring-1 focus:ring-[#1a1a18] dark:border-[#3a3a38] dark:bg-[#161615] dark:placeholder-[#6b6b68] dark:focus:border-[#e8e8e6] dark:focus:ring-[#e8e8e6]"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                checked={data.remember}
                onChange={(e) => setData('remember', e.target.checked)}
                className="h-4 w-4 rounded border-[#d4d4d1] text-[#1a1a18] focus:ring-[#1a1a18] dark:border-[#3a3a38] dark:bg-[#161615] dark:focus:ring-[#e8e8e6]"
              />
              <label htmlFor="remember" className="text-sm text-[#5c5c59] dark:text-[#a1a19a]">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full rounded-lg bg-[#1a1a18] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#2a2a28] disabled:opacity-50 dark:bg-white dark:text-[#0c0c0b] dark:hover:bg-[#e8e8e6]"
            >
              {processing ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

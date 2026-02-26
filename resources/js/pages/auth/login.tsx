import { Head, Link, useForm } from '@inertiajs/react';
import { ThemeToggle } from '@/components';
import { Button } from '@/components/ui/button';
import { InputField, CheckboxField } from '@/components/form';

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
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight hover:opacity-80"
            >
              Payrollz
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <main className="mx-auto flex min-h-[calc(100vh-140px)] max-w-md flex-col justify-center px-6 py-12">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="mb-8 text-muted-foreground">
            Sign in to your account to continue.
          </p>

          <form onSubmit={submit} className="space-y-5">
            <InputField
              label="Email"
              name="email"
              type="email"
              value={data.email}
              onChange={(v) => setData('email', v)}
              error={errors.email}
              placeholder="you@example.com"
              autoComplete="email"
              autoFocus
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              value={data.password}
              onChange={(v) => setData('password', v)}
              error={errors.password}
              placeholder="••••••••"
              autoComplete="current-password"
            />

            <CheckboxField
              label="Remember me"
              name="remember"
              checked={data.remember}
              onCheckedChange={(c) => setData('remember', c)}
              error={errors.remember}
            />

            <Button type="submit" disabled={processing} className="w-full">
              {processing ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </main>
      </div>
    </>
  );
}

import { Link, usePage } from '@inertiajs/react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', match: (u: string) => u === '/dashboard' },
  { href: '/employees', label: 'Employees', match: (u: string) => u.startsWith('/employees') },
  { href: '#', label: 'Payrolls', match: () => false },
];

const icons: Record<string, React.ReactNode> = {
  Dashboard: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
    </svg>
  ),
  Employees: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  ),
  Payrolls: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 11.97 4.06 2.236 2.236 0 0 1 1.97 0 60.07 60.07 0 0 1 11.97-4.06" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  ),
};

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const { url } = usePage();

  return (
    <div className="flex min-h-screen bg-[#FAFAF8] text-[#1a1a18] dark:bg-[#0c0c0b] dark:text-[#e8e8e6]">
      <aside className="flex w-56 shrink-0 flex-col border-r border-[#e8e8e5] dark:border-[#272724]">
        <Link href="/" className="border-b border-[#e8e8e5] px-6 py-4 dark:border-[#272724]">
          <span className="text-xl font-semibold tracking-tight">Payrollz</span>
        </Link>
        <nav className="flex flex-1 flex-col gap-1 p-4">
          {navItems.map((item) => {
            const isActive = item.match(url);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#eef2ed] text-[#2d5a27] dark:bg-[#1a2418] dark:text-[#6b9c64]'
                    : 'text-[#5c5c59] hover:bg-[#f5f5f3] hover:text-[#1a1a18] dark:text-[#a1a19a] dark:hover:bg-[#1a1a18] dark:hover:text-white'
                }`}
              >
                {icons[item.label]}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-[#e8e8e5] p-4 dark:border-[#272724]">
          <Link
            href="/logout"
            method="post"
            as="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#5c5c59] transition hover:bg-[#f5f5f3] hover:text-[#1a1a18] dark:text-[#a1a19a] dark:hover:bg-[#1a1a18] dark:hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v4.5A2.25 2.25 0 0 0 7.5 9.75m6 0H9m3 0 3H9m-3.75 0 9.105 9.105 0 0 0 3 12c0 .621-.102 1.219-.286 1.78m0 0a9.014 9.014 0 0 1-2.714 2.714m0 0a9.015 9.015 0 0 1-3.714 0m0 0a9.016 9.016 0 0 1-2.714-2.714M15 9a9.016 9.016 0 0 0 2.714-2.714M15 9a9.015 9.015 0 0 1 3.714 0" />
            </svg>
            Logout
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto px-6 py-12">{children}</main>
    </div>
  );
}

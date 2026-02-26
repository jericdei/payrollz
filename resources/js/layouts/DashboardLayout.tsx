import { Link, usePage } from '@inertiajs/react';
import { GraduationCap, LayoutDashboard, Users } from 'lucide-react';
import { LogoutButton, ThemeToggle } from '@/components';

const navItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    match: (u: string) => u === '/dashboard',
  },
  {
    href: '/employees',
    label: 'Employees',
    match: (u: string) => u.startsWith('/employees'),
  },
  { href: '#', label: 'Payrolls', match: () => false },
];

const icons: Record<string, React.ReactNode> = {
  Dashboard: <LayoutDashboard className="size-5" />,
  Employees: <Users className="size-5" />,
  Payrolls: <GraduationCap className="size-5" />,
};

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const { url } = usePage();

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFAF8] text-[#1a1a18] dark:bg-[#0c0c0b] dark:text-[#e8e8e6]">
      <aside className="flex h-screen w-56 shrink-0 flex-col border-r border-[#e8e8e5] dark:border-[#272724]">
        <Link
          href="/"
          className="border-b border-[#e8e8e5] px-6 py-4 dark:border-[#272724]"
        >
          <span className="text-xl font-semibold tracking-tight">Payrollz</span>
        </Link>
        <nav className="flex flex-1 flex-col gap-1 p-4">
          {navItems.map((item) => {
            const isActive = item.match(url);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
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
        <div className="flex flex-col gap-1 border-t border-[#e8e8e5] p-4 dark:border-[#272724]">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-sm font-medium text-[#5c5c59] dark:text-[#a1a19a]">
              Theme
            </span>
            <ThemeToggle />
          </div>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden px-6 py-12">
        {children}
      </main>
    </div>
  );
}

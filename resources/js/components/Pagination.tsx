import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationProps {
  links: PaginationLink[];
  showingFrom: number;
  showingTo: number;
  total: number;
}

function parseLabel(label: string): string {
  return label
    .replace(/&laquo;\s*/g, '')
    .replace(/\s*&raquo;/g, '')
    .trim();
}

export function Pagination({
  links,
  showingFrom,
  showingTo,
  total,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between border-t border-[#e8e8e5] px-6 py-3 dark:border-[#272724]">
      <p className="text-sm text-[#5c5c59] dark:text-[#a1a19a]">
        Showing {showingFrom} to {showingTo} of {total} results
      </p>
      <div className="flex gap-2">
        {links.map((link, i) => {
          const label = parseLabel(link.label);
          if (!link.url) {
            return (
              <span
                key={i}
                className="rounded px-3 py-1 text-sm text-[#9a9a97] dark:text-[#6b6b68]"
              >
                {label}
              </span>
            );
          }
          return (
            <Link
              key={i}
              href={link.url}
              className={cn(
                'rounded px-3 py-1 text-sm',
                link.active
                  ? 'bg-[#1a1a18] text-white dark:bg-white dark:text-[#0c0c0b]'
                  : 'text-[#1a1a18] hover:bg-[#f5f5f3] dark:text-white dark:hover:bg-[#1a1a18]',
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

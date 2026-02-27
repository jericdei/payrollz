import { router } from '@inertiajs/react';
import type { Employee } from '@/pages/employees/columns';

interface PaginatedEmployees {
  data: Employee[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  links: { url: string | null; label: string; active: boolean }[];
}

function getCacheKey(url: string): string {
  try {
    const parsed = url.startsWith('http')
      ? new URL(url)
      : new URL(url, 'http://x');
    return parsed.pathname + parsed.search;
  } catch {
    return (
      url.split('?')[0] + (url.includes('?') ? '?' + url.split('?')[1] : '')
    );
  }
}

const cache = new Map<string, PaginatedEmployees>();

export function setEmployeesCache(url: string, data: PaginatedEmployees): void {
  cache.set(getCacheKey(url), data);
}

export function getEmployeesCache(url: string): PaginatedEmployees | undefined {
  return cache.get(getCacheKey(url));
}

export function clearEmployeesCache(): void {
  cache.clear();
}

function getPathname(url: string): string {
  return url.startsWith('http')
    ? new URL(url, 'http://x').pathname
    : url.split('?')[0];
}

/**
 * Registers router listeners to invalidate cache when navigating away from
 * the employees index. Call once at app init.
 */
export function initEmployeesCacheInvalidation(): void {
  router.on('start', (event) => {
    if (event.detail.visit.prefetch) return;

    const url = String(event.detail.visit.url ?? '');
    const pathname = getPathname(url);
    if (pathname !== '/employees') {
      clearEmployeesCache();
    }
  });
}

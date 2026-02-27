import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

function getPathname(url: string): string {
  return url.startsWith('http') ? new URL(url).pathname : url.split('?')[0];
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

export interface UseIsNavigatingResult {
  isNavigating: boolean;
  /** The full URL (path + query) being navigated to, when navigating. */
  targetUrl: string | null;
}

/**
 * Returns whether an Inertia visit is in progress and the target URL.
 * @param pathnameToMatch - Optional. When provided, only sets navigating to true
 *   when the visit targets this pathname (e.g. '/employees').
 */
export function useIsNavigating(
  pathnameToMatch?: string,
): UseIsNavigatingResult {
  const [state, setState] = useState<UseIsNavigatingResult>({
    isNavigating: false,
    targetUrl: null,
  });

  useEffect(() => {
    const unregisterStart = router.on('start', (event) => {
      if (event.detail.visit.prefetch) return;

      const url = String(event.detail.visit.url ?? '');
      const pathname = getPathname(url);
      if (!pathnameToMatch || pathname === pathnameToMatch) {
        setState({ isNavigating: true, targetUrl: getCacheKey(url) });
      }
    });
    const unregisterFinish = router.on('finish', () =>
      setState({ isNavigating: false, targetUrl: null }),
    );
    return () => {
      unregisterStart();
      unregisterFinish();
    };
  }, [pathnameToMatch]);

  return state;
}

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const ROW_COUNT = 10;
const COLUMN_COUNT = 6;

interface DataTableSkeletonProps {
  /** Number of skeleton rows. Default 10. */
  rowCount?: number;
  /** Number of skeleton columns. Default 6. Ignored when header is provided. */
  columnCount?: number;
  /** Optional real header to persist. When omitted, shows skeleton header. */
  header?: React.ReactNode;
  /** Optional real footer to persist. When omitted, shows skeleton footer. */
  footer?: React.ReactNode;
  /** Optional per-column skeleton width overrides. Index maps to column. */
  columnWidths?: (string | undefined)[];
  className?: string;
}

export function DataTableSkeleton({
  rowCount = ROW_COUNT,
  columnCount = COLUMN_COUNT,
  header,
  footer,
  columnWidths = [],
  className,
}: DataTableSkeletonProps) {
  return (
    <div
      className={cn(
        'flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-[#e8e8e5] bg-white dark:border-[#272724] dark:bg-[#161615]',
        className,
      )}
    >
      <div className="min-h-0 flex-1 overflow-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#e8e8e5] dark:divide-[#272724]">
            <thead className="sticky top-0 z-10 bg-white dark:bg-[#161615]">
              {header ?? (
                <tr>
                  {Array.from({ length: columnCount }).map((_, i) => (
                    <th
                      key={i}
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#5c5c59] dark:text-[#a1a19a]"
                    >
                      <Skeleton className="h-4 w-20" />
                    </th>
                  ))}
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-[#e8e8e5] dark:divide-[#272724]">
              {Array.from({ length: rowCount }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: columnCount }).map((_, colIndex) => (
                    <td
                      key={colIndex}
                      className="whitespace-nowrap px-6 py-4"
                    >
                      <Skeleton
                        className={cn(
                          'h-4',
                          columnWidths[colIndex] ??
                            (colIndex === 0
                              ? 'w-24'
                              : colIndex === 1
                                ? 'w-32'
                                : colIndex === columnCount - 1
                                  ? 'ms-auto w-20'
                                  : undefined),
                        )}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {footer ? (
        <div className="shrink-0">{footer}</div>
      ) : (
        <div className="shrink-0 border-t border-[#e8e8e5] px-6 py-3 dark:border-[#272724]">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-40" />
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

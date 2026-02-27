import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const thClass =
  'px-6 py-3 text-left text-xs font-medium tracking-wider text-[#5c5c59] uppercase dark:text-[#a1a19a]';

interface ColumnMeta {
  align?: 'left' | 'right';
  className?: string;
}

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  emptyState?: React.ReactNode;
  footer?: React.ReactNode;
  getRowId?: (row: TData) => string;
  className?: string;
  /** When true, shows skeleton rows in tbody while keeping real header and footer. */
  isLoading?: boolean;
  /** Number of skeleton rows when isLoading. Default 10. */
  skeletonRowCount?: number;
}

export function DataTable<TData>({
  columns,
  data,
  emptyState,
  footer,
  getRowId,
  className,
  isLoading = false,
  skeletonRowCount = 10,
}: DataTableProps<TData>) {
  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table uses interior mutability; see https://react.dev/reference/eslint-plugin-react-hooks/lints/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId,
  });

  const rowModel = table.getRowModel();

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
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={cn(
                      thClass,
                      (header.column.columnDef.meta as ColumnMeta)?.align === 'right' &&
                      'text-right',
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-[#e8e8e5] dark:divide-[#272724]">
            {isLoading ? (
              Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {table.getHeaderGroups()[0].headers.map((header, colIndex) => {
                    const meta = header.column.columnDef.meta as ColumnMeta;
                    return (
                      <td
                        key={header.id}
                        className={cn(
                          'whitespace-nowrap px-6 py-4',
                          meta?.align === 'right' && 'text-right',
                        )}
                      >
                        <Skeleton
                          className={cn(
                            'h-4',
                            colIndex === 0 && 'w-24',
                            colIndex === 1 && 'w-32',
                            meta?.align === 'right' && 'ms-auto w-20',
                          )}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : rowModel.rows.length === 0 && emptyState ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-[#5c5c59] dark:text-[#a1a19a]"
                >
                  {emptyState}
                </td>
              </tr>
            ) : (
              rowModel.rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-[#fafaf8] dark:hover:bg-[#1a1a18]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={cn(
                        'whitespace-nowrap px-6 py-4 text-sm',
                        (cell.column.columnDef.meta as ColumnMeta)?.align ===
                          'right' && 'text-right',
                        (cell.column.columnDef.meta as ColumnMeta)?.className,
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
          </table>
        </div>
      </div>

      {footer ? <div className="shrink-0">{footer}</div> : null}
    </div>
  );
}

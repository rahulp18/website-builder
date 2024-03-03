'use client';
import CustomModal from '@/components/global/custom-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useModal } from '@/providers/modal-provider';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Search } from 'lucide-react';
import React from 'react';

interface FunnelDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterValue: string;
  actionButtonText?: React.ReactNode;
  modelChildren?: React.ReactNode;
}

export default function FunnelsDataTable<TData, TValue>({
  columns,
  data,
  filterValue,
  actionButtonText,
  modelChildren,
}: FunnelDataTableProps<TData, TValue>) {
  const { isOpen, setClose, setOpen } = useModal();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <>
      <div className="flex items-center my-5 justify-between">
        <div className="flex items-center px-4 py-1 rounded-lg gap-2 bg-background">
          <Search />
          <Input
            placeholder="Search funnel name..."
            value={table.getColumn(filterValue)?.getFilterValue() as string}
            onChange={e =>
              table.getColumn(filterValue)?.setFilterValue(e.target.value)
            }
            className="py-2 outline-none bg-transparent border-none "
          />
        </div>
        <Button
          onClick={() => {
            if (modelChildren) {
              setOpen(
                <CustomModal
                  title="Create a Funnel"
                  subHeading="Funnels are like website, but better! Try creating one!"
                >
                  {modelChildren}
                </CustomModal>,
              );
            }
          }}
          className="flex gap-2"
        >
          {actionButtonText}
        </Button>
      </div>
      <div className="border bg-background rounded-lg">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

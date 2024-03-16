import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSprintStore } from "@/store";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react";

const SprintTable = () => {

  const sprint = useSprintStore(store => store.sprint);
  const [data, setData] = useState(sprint.MRData.RaceTable.Races[0].SprintResults);

  const columns = [
    {
      accessorFn: row => `${row.position}`,
      header: "Finishing Position",
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorFn: row => `${row.Driver.givenName} ${row.Driver.familyName}`,
      header: "Driver",
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorFn: row => `${row.Constructor.name}`,
      header: "Constructor",
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorFn: row => `${row.grid}`,
      header: "Grid Position",
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorFn: row => `${row.points}`,
      header: "Points",
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorFn: row => `${row.status}`,
      header: "Status",
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorFn: row => `${row.laps}`,
      header: "Laps",
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorFn: row => {
        if (row.Time) {
          return `${row.Time.time}`;
      }
    },
      header: "Time",
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorFn: row => {
        if (row.FastestLap) {
          return `${row.FastestLap.Time.time}`;
        }
      },
      header: "Fastest Lap",
      cell: (props) => <p>{props.getValue()}</p>
    }
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // initialState: {
    //   columnVisibility: { "Q3" : false }
    // }
  });

  return (
    <Table className="w-1/3 mx-4">
      {table.getHeaderGroups().map(headerGroup => 
          <TableHeader className="tr" key={headerGroup.id}>
            <TableRow>
              {headerGroup.headers.map(header => 
                <TableHead className="th text-white" key={header.id}>
                  {header.column.columnDef.header}
                </TableHead>
                )}
              </TableRow>
          </TableHeader>)}
      <TableBody>
        {table.getRowModel().rows.map(row => 
          <TableRow key={row.id}>
            {row.getVisibleCells().map(cell => 
              <TableCell key={cell.id}>
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </TableCell>)}
          </TableRow>)}
      </TableBody>
    </Table>
  )
}

export default SprintTable
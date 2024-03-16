import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQualiStore } from "@/store";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react";

const QualiTable = () => {

  const quali = useQualiStore(store => store.quali);

  const [data, setData] = useState(quali.MRData.RaceTable.Races[0].QualifyingResults);

  const columns = [
    {
      accessorFn: row => `${row.position}`,
      header: "Position",
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
      accessorFn: row => `${row.Q1}`,
      header: "Q1",
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorFn: row => {if (row.Q2) { 
          return `${row.Q2}`;
        }
      },
      header: "Q2",
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorFn: row => {if (row.Q3) { 
        return `${row.Q3}`;
      }
    },
      header: "Q3",
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

export default QualiTable
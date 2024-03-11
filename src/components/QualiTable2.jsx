import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react";

const QualiTable2 = ({ quali }) => {

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
      accessorFn: row => {if (row.Q2) `${row.Q2}`},
      header: "Q2",
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorFn: row => {if (row.Q3) `${row.Q3}`},
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
    <Table>
      {table.getHeaderGroups().map(headerGroup => 
          <TableHeader className="tr" key={headerGroup.id}>
            <TableRow>
              {headerGroup.headers.map(header => 
                <TableHead className="th" key={header.id}>
                  {header.column.columnDef.header}
                </TableHead>
                )}
              </TableRow>
          </TableHeader>)}
      {/* <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Position</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead>Constructor</TableHead>
          <TableHead>Qualifying Time</TableHead>
        </TableRow>
      </TableHeader> */}
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
      {/* <TableBody>
          {quali.MRData.RaceTable.Races[0].QualifyingResults.map(qualiResult => {
              <TableRow key={qualiResult.position}>
                {console.log(qualiResult.position)}
                <TableCell>{qualiResult.position}</TableCell>
                <TableCell>{qualiResult.Driver.givenName} {qualiResult.Driver.familyName}</TableCell>
                <TableCell>{qualiResult.Constructor.name}</TableCell>
                <TableCell>{qualiResult.Q1}</TableCell>
              </TableRow>
          })}
        
      </TableBody> */}
    </Table>
  )
}

export default QualiTable2
// import {
//   Table,
//   TableBody,
//   // TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// const QualiTable = ({ quali }) => {
//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="w-[100px]">Position</TableHead>
//           <TableHead>Driver</TableHead>
//           <TableHead>Constructor</TableHead>
//           <TableHead>Qualifying Time</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//           {quali.MRData.RaceTable.Races[0].QualifyingResults.map(qualiResult => {
//               <TableRow>
//                 {console.log(qualiResult.position)}
//                 <TableCell>{qualiResult.position}</TableCell>
//                 <TableCell>{qualiResult.Driver.givenName} {qualiResult.Driver.familyName}</TableCell>
//                 <TableCell>{qualiResult.Constructor.name}</TableCell>
//                 <TableCell>{qualiResult.Q1}</TableCell>
//               </TableRow>
//           })}
        
//       </TableBody>
//     </Table>
//   )
// }

// export default QualiTable

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react";

const QualiTable = ({ quali }) => {

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
      accessorFn: row => `${row.Q3}`,
      header: "Q3",
      cell: (props) => <p>{props.getValue()}</p>
    }
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  console.log(table.getHeaderGroups());
  return (
    <div>
      <table className="table-auto">
        {table.getHeaderGroups().map(headerGroup => 
          <thead className="tr" key={headerGroup.id}>
            <tr>
              {headerGroup.headers.map(header => 
                <th className="th" key={header.id}>
                  {header.column.columnDef.header}
                </th>
                )}
              </tr>
          </thead>)}
          <tbody>
            {table.getRowModel().rows.map(row => 
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => 
                  <td key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>)}
              </tr>)}
          </tbody>
      </table>
    </div>
  )
}

export default QualiTable
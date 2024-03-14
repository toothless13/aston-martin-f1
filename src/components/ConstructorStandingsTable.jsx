import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useConstructorStandingsStore, useConstructorStore } from "@/store";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react";

const ConstructorStandingsTable = () => {

  const constructorStandings = useConstructorStandingsStore(store => store.constructorStandings);
  const constructor = useConstructorStore(store => store.constructor);
  const [allData, setAllData] = useState(constructorStandings.StandingsLists[0].ConstructorStandings);
  const [data, setData] = useState(constructorStandings.StandingsLists[0].ConstructorStandings);
  // console.log(data);
  // driverStandings[0].DriverStandings
  const columns = [
    {
      accessorFn: row => `${row.position}`,
      header: "Finishing Position",
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorFn: row => `${row.Constructor.name}`,
      header: "Constructor",
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorFn: row => `${row.wins}`,
      header: "Constructor Wins",
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorFn: row => `${row.points}`,
      header: "Points",
      cell: (props) => <p>{props.getValue()}</p>
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // initialState: {
    //   columnVisibility: { "Q3" : false }
    // }
  });

  useEffect(() => {
    if (constructorStandings) {
      setAllData(constructorStandings.StandingsLists[0].ConstructorStandings);
    }
  }, [constructorStandings])

  useEffect(() => {
    if (allData) {
      setData(allData.filter(row => `${row.Constructor.name}` === constructor));
    }
  }, [constructor]);

  return (
    <Table className="w-1/3 mx-4">
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

export default ConstructorStandingsTable
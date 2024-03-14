import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDriverStandingsStore, useDriverStore } from "@/store";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react";

const DriverStandingsTable = () => {

  const driverStandings = useDriverStandingsStore(store => store.driverStandings);
  const driver = useDriverStore(store => store.driver);

  const [allData, setAllData] = useState(driverStandings.StandingsLists[0].DriverStandings);
  const [data, setData] = useState(driverStandings.StandingsLists[0].DriverStandings);

  const columns = [
    {
      accessorFn: row => `${row.position}`,
      header: "Position",
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorFn: row => `${row.Driver.givenName} ${row.Driver.familyName}`,
      header: "Driver",
      cell: (props) => <p onClick={() => console.log(props.getValue())} className="hover:cursor-pointer" >{props.getValue()}</p>
    },
    {
      accessorFn: row => `${row.Constructors[0].name}`,
      header: "Constructor",
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorFn: row => `${row.wins}`,
      header: "Driver Wins",
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
    if (driverStandings) {
      setAllData(driverStandings.StandingsLists[0].DriverStandings);
    }
  }, [driverStandings])

  useEffect(() => {
    if (allData) {
      setData(allData.filter(row => `${row.Driver.givenName} ${row.Driver.familyName}` === driver));
    }
  }, [driver]);

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

export default DriverStandingsTable
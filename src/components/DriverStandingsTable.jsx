import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDriverStandingsStore, useDriverStore, useShowDriverStandingsStore } from "@/store";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react";

const DriverStandingsTable = () => {

  const driverStandings = useDriverStandingsStore(store => store.driverStandings);
  const driver = useDriverStore(store => store.driver);
  const showDriverStandings = useShowDriverStandingsStore(store => store.showDriverStandings);
  const setShowDriverStandings = useShowDriverStandingsStore(store => store.setShowDriverStandings);

  const [allData, setAllData] = useState(driverStandings.StandingsLists[0].DriverStandings);
  const [data, setData] = useState(driverStandings.StandingsLists[0].DriverStandings);
  const [showComponent, setShowComponent] = useState(false);

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
  });

  useEffect(() => {
    if (allData) {
      setData(allData.filter(row => `${row.Driver.givenName} ${row.Driver.familyName}` === driver));
    } else {
      if (driverStandings) {
        setAllData(driverStandings.StandingsLists[0].DriverStandings);

        setData(allData.filter(row => `${row.Driver.givenName} ${row.Driver.familyName}` === driver));
      }
    }
    const timeout = setTimeout(() => {
      setShowComponent(true);
    }, 250);

    return () => clearTimeout(timeout);
  }, [driverStandings, driver])

  return (
    <div>
      {(showDriverStandings && showComponent) &&
      <div>
        <div className="flex space-x-3">
          <h2 className="p-2 text-black xl:text-white text-lg">Driver Standings</h2>
          <button onClick={() => {setShowDriverStandings(false); }} 
            className="inline-flex items-center h-8 px-3 mt-1 text-red-700 transition-colors duration-150 bg-opacity-80 bg-white rounded-md focus:shadow-outline hover:bg-red-700 hover:text-white">
            <span>Close</span>
          </button>
        </div>
        <div className="flex justify-center">
          <Table className="w-1/3 mx-4 text-black xl:text-white">
            {table.getHeaderGroups().map(headerGroup => 
            <TableHeader className="tr" key={headerGroup.id}>
              <TableRow>
                {headerGroup.headers.map(header => 
                  <TableHead className="th text-black xl:text-white" key={header.id}>
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
        </div>
      </div>
      }
    </div>
  )
}

export default DriverStandingsTable
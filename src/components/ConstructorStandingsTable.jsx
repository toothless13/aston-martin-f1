import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useConstructorStandingsStore, useConstructorStore, useShowConstructorStandingsStore } from "@/store";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react";

const ConstructorStandingsTable = () => {

  const constructorStandings = useConstructorStandingsStore(store => store.constructorStandings);
  const constructor = useConstructorStore(store => store.constructor);
  const showConstructorStandings = useShowConstructorStandingsStore(store => store.showConstructorStandings);
  const setShowConstructorStandings = useShowConstructorStandingsStore(store => store.setShowConstructorStandings);

  const [allData, setAllData] = useState(constructorStandings.StandingsLists[0].ConstructorStandings);
  const [data, setData] = useState(constructorStandings.StandingsLists[0].ConstructorStandings);
  const [showComponent, setShowComponent] = useState(false);

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
    if (allData) {
      setData(allData.filter(row => `${row.Constructor.name}` === constructor));
    } else {
      if (constructorStandings) {
        setAllData(constructorStandings.StandingsLists[0].ConstructorStandings);
        setData(allData.filter(row => `${row.Constructor.name}` === constructor));
      }
    }
    const timeout = setTimeout(() => {
      setShowComponent(true);
    }, 250);

    return () => clearTimeout(timeout);
  }, [constructorStandings, constructor])

  return (
    <div>
    {(showConstructorStandings && showComponent) &&
      <div>
        <div className="flex space-x-3">
          <h2 className="p-2">Constructor Standings</h2>
          {/* <button onClick={() => setShowConstructorStandings(false)} className="mr-20 ml-0 cursor-pointer text-red-700 text-xl">&times;</button> */}
          <button onClick={() => setShowConstructorStandings(false)} className="inline-flex items-center h-8 px-3 mt-1 text-red-700 transition-colors duration-150 bg-opacity-80 bg-white rounded-md focus:shadow-outline hover:bg-red-700 hover:text-white">
          <span>Close</span>
        </button>
        </div>
        <div className="flex justify-center">
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
      </div>
      </div>}
    </div>
  )
}

export default ConstructorStandingsTable
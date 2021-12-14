import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useFilters, useTable, useMemo } from "react-table";
import makeData from "./makeData";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Table({ columns, data, ageOutside, filterSelected }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    preFilteredRows,
    prepareRow,
    setFilter
  } = useTable(
    {
      columns,
      data
    },
    useFilters
  );

  
  useEffect(() => {
    
    setFilter("age", ageOutside);
  }, [ageOutside]);

 useEffect(() => {
  setFilter("status", filterSelected)

 }, [filterSelected])
  
  return (
    <>
      
      <input
        placeholder="Firstname"
        onChange={(e) => setFilter("firstName", e.target.value)}
      />
      <table style={{ marginTop: 30 }} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {console.log("seleccteeed", filterSelected)}
      {console.log("rows", rows)}
      
    </>
  );
}


const customFilterFunction = (rows, id, filterValue) => 
  rows.filter((row) => row.original.age >= filterValue)

const customSelectFilterFunction = (rows, filterSelected) =>
  rows.filter((row) => row.values.status = filterSelected)
  


function AppTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName"
          },
          {
            Header: "Last Name",
            accessor: "lastName"
          }
        ]
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
            
            filter: customFilterFunction
          },
          {
            Header: "Visits",
            accessor: "visits"
          },
          {
            Header: "Status",
            accessor: "status",
           filter: customSelectFilterFunction
          },
          {
            Header: "Profile Progress",
            accessor: "progress"
          }
        ]
      }
    ],
    []
  );

  const data = React.useMemo(() => makeData(40), []);
  const [age, setAge] = useState(0);
  const [selected, setSelected] = useState("");
  return (
    <>
  

    <Styles>

    <select
        value={selected}
        onChange={e => {
          setSelected(e.target.value || undefined)
        }}
      >
      <option value="">All</option>
      <option value="complicated">complicated</option>
      <option value="single">single</option>
      <option value="relationsihip">relationsihip</option>
       </select>

       <p>{selected}</p>
     <p>Min age is {age}</p>
      <input
        type="range"
        value={age}
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />
     
      <Table columns={columns} data={data} ageOutside={age} filterSelected={selected} />
     {console.log("ttt")}
    </Styles>
    </>
  );
}

export default AppTable;

import {useTheme} from "@emotion/react"
import axios from "axios"
import React, {useState, useEffect, useMemo} from "react"
import tw from "twin.macro"
import {useFilters, useGlobalFilter, useSortBy, useTable} from "react-table"
import {GlobalFilter} from "./globalFilter"
import {SelectColumnFilter} from "./columnPicklistFilter"

const Table = tw.table`
  table-fixed
  text-base
  text-gray-900
`

const TableHead = tw.thead`
  p-2
`

const TableRow = tw.tr`
border
border-green-500
`

const TableHeader = tw.th`
border
border-green-500
p-2
`

const TableBody = tw.tbody`
`

const TableData = tw.td`
border
border-green-500
p-5
`

const Button = tw.button`
  pl-4
  pr-4
  pt-2
  pb-2
  text-black
  rounded-md
  bg-green-300
  hover:bg-green-200
  transition-colors
`

export function Products(props) {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch(() => console.log("err"))

    if (response) {
      const products = response.data
      console.log("Products: ", products)
      setProducts(products)
    }
  }

  const data = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: {rate: 3.9, count: 120},
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men's clothing",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating: {rate: 4.1, count: 259},
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description:
        "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      rating: {rate: 4.7, count: 500},
    },
    {
      id: 4,
      title: "Mens Casual Slim Fit",
      price: 15.99,
      description:
        "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      rating: {rate: 2.1, count: 430},
    },
  ]

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Title",
        accessor: "title",
      },
    ],
    []
  )

  const customFilterFunction = (rows, id, filterValue) =>
    rows.filter((row) => row.original.id >= filterValue)

  const productsData = useMemo(() => [...products], [products])

  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            .filter((key) => key !== "rating")
            .map((key) => {
              if (key === "id") {
                return {
                  Header: key,
                  accessor: key,
                  filter: customFilterFunction,
                }
              }
              return {Header: key, accessor: key}
            })
        : [],
    [products]
  )

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({row}) => (
          <Button onClick={() => alert("Editing: " + row.values.price)}>
            Edit
          </Button>
        ),
      },
    ])
  }

  const filterHook = (hooks) => {
    hooks.visibleColumns.filter(() => [
      {
        id: "Edit",
        Header: "Edit",
        filter: customFilterFunction,
      },
    ])
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    headers,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
    setFilter,
  } = useTable(
    {
      columns: productsColumns,
      data: productsData,
    },
    useFilters,
    useGlobalFilter,
    tableHooks,
    useSortBy
  )

    const [surface, setSurface] = useState()

  useEffect(() => {
    fetchProducts()
    ;
  }, [])






  const isEven = (idx) => idx % 2 === 0

  

  return (
    <>

        {/* <SelectColumnFilter /> */}
      <div>
        <p>Min flat surface {surface}</p>
        <input
          type='range'
          value={surface}
          onChange={(e) => {
            setSurface(e.target.value)
          }}
        />
      </div>

      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {console.log("wewnętrzny", column.getSortByToggleProps())}
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? "▼" : " ▲") : ""}
                  {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row)

            return (
              <TableRow
                {...row.getRowProps()}
                className={isEven(idx) ? "bg-green-400 bg-opacity-10" : ""}
              >
                {row.cells.map((cell, idx) => (
                  <TableData {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableData>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}

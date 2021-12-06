import React, {useState}from "react"
import {useAsyncDebounce} from "react-table"
import tw from "twin.macro"

const SearchContainer = tw.div`
  mb-6
  mt-6
  flex
  items-center
`

const SearchText = tw.h2`
  text-xl
text-gray-600
  mr-6
`

const Input = tw.input`
  h-8
  border-2
  border-solid
  border-green-500
  outline-none
  p-4
  rounded-lg
`
const Select = tw.section`
border border-gray-300 
rounded-full text-gray-600 
h-10 
pl-5 
pr-10 
bg-white 
hover:border-gray-400 
focus:outline-none appearance-none
`

export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])
  
    // Render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }
import React from "react";

export const ColumnFilter = ({}) => {
    const { filterValue, setFilter } = ColumnFilterreturn (
        <span>
            Search: {' '}
            <input value={filterValue || ''} onChange={(e) => setFilter(e.target.value)} />

        </span>
    )
} 
import React from 'react';
import { changeFilter } from '../articles/articleSlice';
import { useSelector, useDispatch } from 'react-redux';

const FilterResults = () => {

    const dispatch = useDispatch();
    const filterText = useSelector((state) => state.articles.filterText);

    const handleChange = (e) => {
        dispatch(changeFilter(e.target.value));
    }

    return (
        <form id="filterResults" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="filterInput" id="filterLabel">search: </label>
            <input type="text" id="filterInput" value={filterText} onChange={handleChange}></input>
        </form>
    )
}

export default FilterResults;
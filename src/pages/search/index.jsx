import React, { useState } from 'react';
import './index.css';

function Search(props) {
    let [query, setQuery] = useState('');

    const onChangeHandle = (e) => {
        setQuery(e.target.value);
        if (e.target.value === '') {
            props.search('');
        }
    };
    return (
        <div className="search-wrapper">
            <input onChange={onChangeHandle} type="text" />
            <button onClick={props.search.bind(null, query)}>搜索</button>
        </div>
    );
}

export default Search;

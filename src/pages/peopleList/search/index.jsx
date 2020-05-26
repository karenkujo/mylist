import React, { useState } from 'react';
import './index.css';
import * as actions from '@/pages/peopleList/store/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function Search(props) {
    let [query, setQuery] = useState('');
    let { search } = props;

    const onChangeHandle = (e) => {
        setQuery(e.target.value);
        if (e.target.value === '') {
            search('');
        }
    };
    return (
        <div className="search-wrapper">
            <input onChange={onChangeHandle} type="text" />
            <button onClick={search.bind(null, query)}>搜索</button>
        </div>
    );
}

const mapDispatch = (dispatch) => {
    return bindActionCreators(actions, dispatch);
};

export default connect(null, mapDispatch)(Search);

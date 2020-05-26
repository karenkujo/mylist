import React, { useEffect } from 'react';
import './index.css';
import Header from './header';
import Pagination from './pagination';
import Search from './search';
import List from './list';
import Dialog from '@/component/dialog';
import * as actions from './store/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function PeopleList(props) {
    const { showDialog, getPeopleList } = props;

    useEffect(() => {
        getPeopleList();
    }, []);

    return (
        <div className="peopleList-wrapper">
            <Header />
            <Search />
            <List />
            <Pagination />
            {showDialog ? <Dialog /> : ''}
        </div>
    );
}

const mapState = (state) => ({
    showDialog: state.peopleListReducer.showDialog,
});

const mapDispatch = (dispatch) => {
    return bindActionCreators(actions, dispatch);
};

export default connect(mapState, mapDispatch)(PeopleList);

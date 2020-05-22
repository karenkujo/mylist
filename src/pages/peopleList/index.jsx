import React, { useEffect } from 'react';
import './index.css';
import Header from '../header';
import Pagination from '../pagination';
import Search from '../search';
import List from '../list';
import Dialog from '../dialog';
import * as actions from '../../store/action';
import { connect } from 'react-redux';

function PeopleList(props) {
    const {
        peopleList,
        page,
        currentPageList,
        maxPage,
        showDialog,
        editId,
        paginationList,
        getPeopleList,
        selectPage,
        search,
        onClickEdit,
        onChangeAge,
        onClickMask,
    } = props;

    useEffect(() => {
        getPeopleList();
    }, []);
    return (
        <div className="peopleList-wrapper">
            <Header />
            <Search search={search} />
            <List list={currentPageList} onClickEdit={onClickEdit} />
            <Pagination
                paginationList={paginationList}
                page={page}
                maxPage={maxPage + 1}
                selectPage={selectPage}
            />
            {showDialog ? (
                <Dialog
                    id={editId}
                    list={peopleList}
                    onChangeAge={onChangeAge}
                    onClickMask={onClickMask}
                />
            ) : (
                ''
            )}
        </div>
    );
}

const mapState = (state) => ({
    peopleList: state.peopleList,
    page: state.page,
    offset: state.offset,
    currentPageList: state.currentPageList,
    maxPage: state.maxPage,
    currentList: state.currentList,
    showDialog: state.showDialog,
    editId: state.editId,
    paginationList: state.paginationList,
});

const mapDispatch = (dispatch) => ({
    getPeopleList() {
        actions.getPeopleList(dispatch);
    },
    selectPage(mode, curPage) {
        const action = actions.selectPage(mode, curPage);
        if (action) {
            dispatch(action);
        }
    },
    search(query) {
        const action = actions.search(query);
        if (action) {
            dispatch(action);
        }
    },
    onClickEdit(id) {
        const action = actions.onClickEdit(id);
        if (action) {
            dispatch(action);
        }
    },
    onChangeAge(age) {
        const action = actions.onChangeAge(age);
        if (action) {
            dispatch(action);
        }
    },
    onClickMask() {
        const action = actions.onClickMask();
        if (action) {
            dispatch(action);
        }
    },
});

export default connect(mapState, mapDispatch)(PeopleList);

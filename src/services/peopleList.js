import axios from 'axios';
import store from '../store/index';
import { GET_PEOPLE_LIST } from '../store/constants';

const { getState } = store;

export const getPeopleList = (dispatch) => {
    axios.get('/people.json').then((res) => {
        if (res.status === 200) {
            if (res.data && res.data.data) {
                let peopleList = res.data.data;
                let currentList = res.data.data;
                let currentPageList = currentList.slice(
                    getState().page * getState().offset,
                    (getState().page + 1) * getState().offset
                );
                let maxPage = Math.floor(
                    currentList.length / getState().offset
                );
                let paginationList = [];
                for (let i = 0; i < maxPage + 1; i++) {
                    paginationList.push(i + 1);
                }
                dispatch({
                    type: GET_PEOPLE_LIST,
                    peopleList,
                    currentList,
                    currentPageList,
                    maxPage,
                    paginationList,
                });
            } else {
                throw new Error('网络错误');
            }
        }
    });
};

export const selectPage = (mode, curPage) => {
    let page = 0;
    let currentPageList = [];
    if (mode === 'back') {
        if (getState().page > 0) {
            page = getState().page - 1;
            currentPageList = showCurrentPageList(getState().currentList, page);
            return {
                page,
                currentPageList,
            };
        }
    } else if (mode === 'next') {
        if (getState().page < getState().maxPage) {
            page = getState().page + 1;
            currentPageList = showCurrentPageList(getState().currentList, page);
            return {
                page,
                currentPageList,
            };
        }
    } else if (mode === 'skip') {
        page = curPage;
        currentPageList = showCurrentPageList(getState().currentList, page);
        return {
            page,
            currentPageList,
        };
    }
};

export const search = (query) => {
    console.log(query)
    let currentList = getState().currentList;
    let page = 0;
    if (query === '') {
        currentList = getState().peopleList;
    } else {
        currentList = getState().peopleList.filter((item) => {
            return item.name.indexOf(query) > -1;
        });
    }
    let currentPageList = showCurrentPageList(currentList, page);
    let { maxPage, paginationList } = setPaginationList(currentList);
    return {
        currentList,
        page,
        currentPageList,
        maxPage,
        paginationList,
    };
};

export const onClickEdit = (id) => {
    let editId = id;
    let showDialog = true;
    return {
        editId,
        showDialog,
    };
};

export const onChangeAge = (age) => {
    let peopleList = getState().peopleList;
    let showDialog = false;
    peopleList.forEach((item) => {
        if (item.id === getState().editId) {
            item.age = age;
        }
    });
    return {
        peopleList,
        showDialog,
    };
};

export const onClickMask = () => {
    let showDialog = false;
    return {
        showDialog,
    };
};

const showCurrentPageList = (currentList, page) => {
    let currentPageList = currentList.slice(
        page * getState().offset,
        (page + 1) * getState().offset
    );
    return currentPageList;
};

const setPaginationList = (currentList) => {
    let maxPage = Math.floor(currentList.length / getState().offset);
    let paginationList = [];
    for (let i = 0; i < maxPage + 1; i++) {
        paginationList.push(i + 1);
    }
    return {
        maxPage,
        paginationList,
    };
};

import {
    GET_PEOPLE_LIST,
    SELECT_PAGE,
    SEARCH_NAME,
    EDIT_LIST,
    CHANGE_AGE,
    CLICK_MASK,
} from '../store/constants';

const defaultState = {
    peopleList: [], // 总列表
    page: 0, // 当前页
    offset: 10, // 每页数量
    currentPageList: [], // 当前页列表
    maxPage: 0, // 总页数
    currentList: [], // 当前列表
    showDialog: false, // 是否展示弹出框
    editId: 0, // 正在编辑的数据id
    paginationList: [], // 分页器列表
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_PEOPLE_LIST:
            return {
                ...state,
                peopleList: action.peopleList,
                currentList: action.currentList,
                currentPageList: action.currentPageList,
                maxPage: action.maxPage,
                paginationList: action.paginationList,
            };
        case SELECT_PAGE:
            return {
                ...state,
                page: action.page,
                currentPageList: action.currentPageList,
            };
        case SEARCH_NAME:
            return {
                ...state,
                currentList: action.currentList,
                page: action.page,
                currentPageList: action.currentPageList,
                maxPage: action.maxPage,
                paginationList: action.paginationList,
            };
        case EDIT_LIST:
            return {
                ...state,
                editId: action.editId,
                showDialog: action.showDialog,
            };
        case CHANGE_AGE:
            return {
                ...state,
                peopleList: action.peopleList,
                showDialog: action.showDialog,
            };
        case CLICK_MASK:
            return {
                ...state,
                showDialog: action.showDialog,
            };
        default:
            return state;
    }
};

import {
    GET_PEOPLE_LIST,
    SELECT_PAGE,
    SEARCH_NAME,
    EDIT_LIST,
    CHANGE_AGE,
    CLICK_MASK,
} from '@/store/constants';

const defaultState = {
    peopleList: [], // 总列表
    page: 0, // 当前页
    offset: 10, // 每页数量
    currentList: [], // 当前列表
    showDialog: false, // 是否展示弹出框
    editId: 0, // 正在编辑的数据id
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_PEOPLE_LIST:
            return {
                ...state,
                peopleList: action.peopleList,
                currentList: action.currentList
            };
        case SELECT_PAGE:
            return {
                ...state,
                page: action.page,
            };
        case SEARCH_NAME:
            return {
                ...state,
                currentList: action.currentList,
                page: action.page,
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
                currentList: action.currentList,
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

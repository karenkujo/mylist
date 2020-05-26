import axios from 'axios';
import store from '@/store/index';
import {
    GET_PEOPLE_LIST,
    SELECT_PAGE,
    SEARCH_NAME,
    EDIT_LIST,
    CHANGE_AGE,
    CLICK_MASK,
} from './constants';

const { getState } = store;

/*获取初始列表，并备份一份
 *@method getPeopleList
 */
export const getPeopleList = () => {
    return (dispatch) => {
        axios.get('/people.json').then((res) => {
            if (res.status === 200) {
                if (res.data && res.data.data) {
                    let peopleList = res.data.data;
                    let currentList = res.data.data;
                    dispatch({
                        type: GET_PEOPLE_LIST,
                        peopleList,
                        currentList,
                    });
                } else {
                    throw new Error('网络错误');
                }
            }
        });
    };
};

/*分页器选择页数，包括上一页，下一页
 *@method selectPage
 *@param {Number}curPage 需要跳转到的页面 {Number}maxPage 总页数
 *@return {Object} action需要提交的数据
 */
export const selectPage = (curPage, maxPage) => {
    if (curPage < 0) {
        curPage = 0;
    } else if (curPage > maxPage) {
        curPage = maxPage;
    }
    return {
        type: SELECT_PAGE,
        page: curPage,
    };
};

/*搜索方法，更新当前列表
 *@method search
 *@param {String}query 需要搜索的关键字
 *@return {Object} action需要提交的数据
 */
export const search = (query) => {
    let currentList;
    let peopleList = getState().peopleListReducer.peopleList;
    let page = 0;
    if (query === '') {
        currentList = peopleList;
    } else {
        currentList = peopleList.filter((item) => {
            return item.name.indexOf(query) > -1;
        });
    }
    return {
        type: SEARCH_NAME,
        currentList,
        page,
    };
};

/*编辑方法
 *@method onClickEdit
 *@param {Number}id 需要编辑的那条数据的id
 *@return {Object} action需要提交的数据
 */
export const onClickEdit = (id) => {
    let editId = id;
    let showDialog = true;
    return {
        type: EDIT_LIST,
        editId,
        showDialog,
    };
};

/*确认修改时的方法，修改年龄
 *@method onChangeAge
 *@param {Number}age 需要编辑的那条数据的新age
 *@return {Object} action需要提交的数据
 */
export const onChangeAge = (age) => {
    let peopleList = getState().peopleListReducer.peopleList.slice(0);
    let currentList = getState().peopleListReducer.currentList.slice(0);
    let editId = getState().peopleListReducer.editId;
    let showDialog = false;
    peopleList.forEach((item) => {
        if (item.id === editId) {
            item.age = parseInt(age);
        }
    });
    currentList.forEach((item) => {
        if (item.id === editId) {
            item.age = parseInt(age);
        }
    });
    return {
        type: CHANGE_AGE,
        peopleList,
        showDialog,
        currentList,
    };
};

/*点击蒙层取消弹窗
 *@method onClickMask
 *@return {Object} action需要提交的数据
 */
export const onClickMask = () => {
    let showDialog = false;
    return {
        type: CLICK_MASK,
        showDialog,
    };
};

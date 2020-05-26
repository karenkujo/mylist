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

/*获取初试列表，并初始化部分数据
 *@method getPeopleList
 *@param {Object}dispatch 向reducer提交数据
 *@return {Object} action需要提交的数据
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
 *@param {String}mode back上一页,next下一页,skip跳转页  {number}curPage 跳转页时的页数
 *@return {Object} action需要提交的数据
 */
export const selectPage = (curPage, maxPage) => {
    console.log(curPage, maxPage)
    if (curPage < 0) {
        curPage = 0
    } else if (curPage > maxPage) {
        curPage = maxPage
    }
    return {
        type: SELECT_PAGE,
        page: curPage
    }
};

/*搜索方法
 *@method search
 *@param {String}query 需要搜索的关键字
 *@return {Object} action需要提交的数据
 */
export const search = (query) => {
    let currentList
    let peopleList = getState().peopleList;
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
    let peopleList = getState().peopleList.slice(0);
    let currentList = getState().currentList.slice(0);
    let showDialog = false;
    peopleList.forEach((item) => {
        if (item.id === getState().editId) {
            item.age = parseInt(age);
        }
    });
    currentList.forEach((item) => {
        if (item.id === getState().editId) {
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

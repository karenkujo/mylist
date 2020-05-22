import axios from 'axios';
import store from '@/store/index';
import { GET_PEOPLE_LIST } from '@/store/constants';

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
};

/*分页器选择页数，包括上一页，下一页
 *@method selectPage
 *@param {String}mode back上一页,next下一页,skip跳转页  {number}curPage 跳转页时的页数
 *@return {Object} action需要提交的数据
 */
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

/*搜索方法
 *@method search
 *@param {String}query 需要搜索的关键字
 *@return {Object} action需要提交的数据
 */
export const search = (query) => {
    console.log(query);
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

/*编辑方法
 *@method onClickEdit
 *@param {Number}id 需要编辑的那条数据的id
 *@return {Object} action需要提交的数据
 */
export const onClickEdit = (id) => {
    let editId = id;
    let showDialog = true;
    return {
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

/*点击蒙层取消弹窗
 *@method onClickMask
 *@return {Object} action需要提交的数据
 */
export const onClickMask = () => {
    let showDialog = false;
    return {
        showDialog,
    };
};

/*修改当前展示页数据
 *@method showCurrentPageList
 *@param {Array}currentList 当前列表 {Number}page 当前页
 *@return {Array} 当前页列表
 */
const showCurrentPageList = (currentList, page) => {
    let currentPageList = currentList.slice(
        page * getState().offset,
        (page + 1) * getState().offset
    );
    return currentPageList;
};

/*修改分页器数组
 *@method setPaginationList
 *@param {Array}currentList 当前列表
 *@return {Object} 总页数和分页器数组
 */
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

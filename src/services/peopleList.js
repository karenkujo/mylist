import axios from 'axios'
import store from '../store/index'
import { GET_PEOPLE_LIST } from '../store/constants'

const { getState } = store

export const getPeopleList = (dispatch) => {
    axios.get('/people.json').then(res => {
        if (res.status === 200) {
            if (res.data && res.data.data) {
                let peopleList = res.data.data
                let currentList = res.data.data
                let currentPageList = currentList.slice(getState().page * getState().offset, (getState().page + 1) * getState().offset)
                let maxPage = Math.floor(currentList.length / getState().offset)
                let paginationList = []
                for (let i = 0; i < maxPage + 1; i++) {
                    paginationList.push(i + 1)
                }
                dispatch({
                    type: GET_PEOPLE_LIST,
                    peopleList,
                    currentList,
                    currentPageList,
                    maxPage,
                    paginationList
                })
            } else {
                throw new Error('网络错误')
            }
        }
    })
}

export const selectPage = (mode, curPage) => {
    console.log(mode, curPage)
    let page = 0
    let currentPageList = []
    if (mode === 'back') {
        if (getState().page > 0) {
            page = getState().page - 1
            currentPageList = showCurrentPageList(getState().currentList, page)
            return {
                page,
                currentPageList
            }
        }
    } else if (mode === 'next') {
        if (getState().page < getState().maxPage) {
            page = getState().page + 1
            currentPageList = showCurrentPageList(getState().currentList, page)
            return {
                page,
                currentPageList
            }
        }
    } else if (mode === 'skip') {
        page = curPage
        currentPageList = showCurrentPageList(getState().currentList, page)
        return {
            page,
            currentPageList
        }
    }
}

export const search = (query) => {
    console.log(query)
}

export const showCurrentPageList = (currentList, page) => {
    let currentPageList = currentList.slice(page * getState().offset, (page + 1) * getState().offset)
    return currentPageList
}
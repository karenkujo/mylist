import * as services from '../services/peopleList'
import { SELECT_PAGE, SEARCH_NAME, EDIT_LIST, CHANGE_AGE, CLICK_MASK } from './constants'

export const getPeopleList = (dispatch) => {
    services.getPeopleList(dispatch)
}

export const selectPage = (mode, curPage) => {
    let actionData = services.selectPage(mode, curPage)
    if (actionData) {
        const action = {
            ...actionData,
            type: SELECT_PAGE
        }
        return action
    }
}

export const search = (query) => {
    let actionData = services.search(query)
    if (actionData) {
        const action = {
            ...actionData,
            type: SEARCH_NAME
        }
        return action
    }
}

export const onClickEdit = (id) => {
    let actionData = services.onClickEdit(id)
    if (actionData) {
        const action = {
            ...actionData,
            type: EDIT_LIST
        }
        return action
    }
}

export const onChangeAge = (age) => {
    let actionData = services.onChangeAge(age)
    if (actionData) {
        const action = {
            ...actionData,
            type: CHANGE_AGE
        }
        return action
    }
}

export const onClickMask = () => {
    let actionData = services.onClickMask()
    if (actionData) {
        const action = {
            ...actionData,
            type: CLICK_MASK
        }
        return action
    }
}
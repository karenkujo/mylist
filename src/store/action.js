import * as services from '../services/peopleList'
import { SELECT_PAGE } from './constants'

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
}
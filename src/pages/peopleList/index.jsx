import React, { Component } from 'react';
import './index.css'
import Header from '../header'
import Pagination from '../pagination'
import Search from '../search'
import List from '../list'
import Dialog from '../dialog'
import * as actions from '../../store/action'
import { connect } from 'react-redux'

class PeopleList extends Component {
    componentDidMount() {
        this.props.getPeopleList()
    }
    // 更新当前列表数据
    // showCurrentPageList = () => {
    //     this.setState((prevState) => ({
    //         currentPageList: prevState.currentList.slice(prevState.page * prevState.offset, (prevState.page + 1) * prevState.offset),
    //         maxPage: Math.floor(prevState.currentList.length / prevState.offset)
    //     }), this.paginationList)
    // }
    // // 生成分页器数组
    // paginationList = () => {
    //     let index = 1
    //     let arr = []
    //     while(index <= this.state.maxPage + 1) {
    //         arr.push(index)
    //         index++
    //     }
    //     this.setState({ paginationList: arr })
    // }
    // // 下一页
    // onClickAdd = () => {
    //     if (this.state.page < this.state.maxPage) {
    //         this.setState({
    //             page: this.state.page + 1
    //         })
    //         this.showCurrentPageList()
    //     }
    // }
    // // 上一页
    // onClickReduce = () => {
    //     if (this.state.page > 0) {
    //         this.setState({
    //             page: this.state.page - 1
    //         })
    //         this.showCurrentPageList()
    //     }
    // }
    // // 跳转页面
    // skipPage = (page) => {
    //     this.setState({
    //         page: page
    //     }, this.showCurrentPageList)
    // }
    // // 搜索事件
    // search = (query) => {
    //     if (query === '') {
    //         this.setState({ currentList: this.state.peopleList })
    //         this.showCurrentPageList()
    //     } else {
    //         let arr = this.state.peopleList.filter(item => {
    //             return item.name.indexOf(query) > -1
    //         })
    //         this.setState(() => ({
    //             currentList: arr,
    //             page: 0
    //         }))
    //         this.showCurrentPageList()
    //     }
    // }
    // // 编辑
    // onClickEdit = (id) => {
    //     this.setState({
    //         showDialog: true,
    //         editId: id
    //     })
    // }
    // // 修改年龄
    // onClickAge = (age) => {
    //     let arr = this.state.peopleList.slice(0)
    //     arr.forEach(item => {
    //         if (item.id === this.state.editId) {
    //             item.age = age
    //         }
    //     })
    //     this.setState({
    //         peopleList: arr,
    //         showDialog: false
    //     })
    // }
    // // 点击mask蒙层
    // onClickMask = () => {
    //     this.setState({ showDialog: false })
    // }
    render() {
        const { 
            peopleList, 
            page, 
            currentPageList,
            maxPage,
            showDialog,
            editId,
            paginationList,
            selectPage,
            search,
            onClickEdit,
            onChangeAge,
            onClickMask
        } = this.props
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
                {showDialog ? <Dialog id={editId} list={peopleList} onChangeAge={onChangeAge} onClickMask={onClickMask} /> : ''}  
            </div>
        );
    }
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
    paginationList: state.paginationList
})

const mapDispatch = (dispatch) => ({
    getPeopleList() {
        actions.getPeopleList(dispatch)
    },
    selectPage(mode, curPage) {
        const action = actions.selectPage(mode, curPage)
        if (action) {
            dispatch(action)
        }
    },
    search(query) {
        const action = actions.search(query)
        if (action) {
            dispatch(action)
        }
    },
    onClickEdit(id) {
        const action = actions.onClickEdit(id)
        if (action) {
            dispatch(action)
        }
    },
    onChangeAge(age) {
        const action = actions.onChangeAge(age)
        if (action) {
            dispatch(action)
        }
    },
    onClickMask() {
        const action = actions.onClickMask()
        if (action) {
            dispatch(action)
        }
    }
})

export default connect(mapState, mapDispatch)(PeopleList);
import React, { Component } from 'react';
import './index.css'
import Header from '../header'
import Pagination from '../pagination'
import Search from '../search'
import List from '../list'
import Dialog from '../dialog'
import Mask from '../mask'
import axios from 'axios'

class PeopleList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            peopleList: [],
            page: 0,
            offset: 10,
            currentPageList: [],
            maxPage: 0,
            currentList: [],
            showDialog: false,
            editId: 0,
            paginationList: []
        }
    }
    componentDidMount() {
        axios.get('/people.json').then(res => {
            if (res.status === 200) {
                this.setState({
                    peopleList: res.data.data,
                    currentList: res.data.data
                })
                this.showCurrentPageList()
            }
        })
    }
    // 更新当前列表数据
    showCurrentPageList = () => {
        this.setState((prevState) => ({
            currentPageList: prevState.currentList.slice(prevState.page * prevState.offset, (prevState.page + 1) * prevState.offset),
            maxPage: Math.floor(prevState.currentList.length / prevState.offset)
        }), this.paginationList)
    }
    // 生成分页器数组
    paginationList = () => {
        let index = 1
        let arr = []
        while(index <= this.state.maxPage + 1) {
            arr.push(index)
            index++
        }
        this.setState({ paginationList: arr })
    }
    // 下一页
    onClickAdd = () => {
        if (this.state.page < this.state.maxPage) {
            this.setState({
                page: this.state.page + 1
            })
            this.showCurrentPageList()
        }
    }
    // 上一页
    onClickReduce = () => {
        if (this.state.page > 0) {
            this.setState({
                page: this.state.page - 1
            })
            this.showCurrentPageList()
        }
    }
    // 跳转页面
    skipPage = (page) => {
        this.setState({
            page: page
        }, this.showCurrentPageList)
    }
    // 搜索事件
    search = (query) => {
        if (query === '') {
            this.setState({ currentList: this.state.peopleList })
            this.showCurrentPageList()
        } else {
            let arr = this.state.peopleList.filter(item => {
                return item.name.indexOf(query) > -1
            })
            this.setState(() => ({
                currentList: arr,
                page: 0
            }))
            this.showCurrentPageList()
        }
    }
    // 编辑
    onClickEdit = (id) => {
        this.setState({
            showDialog: true,
            editId: id
        })
    }
    // 修改年龄
    onClickAge = (age) => {
        let arr = this.state.peopleList.slice(0)
        arr.forEach(item => {
            if (item.id === this.state.editId) {
                item.age = age
            }
        })
        this.setState({
            peopleList: arr,
            showDialog: false
        })
    }
    // 点击mask蒙层
    onClickMask = () => {
        this.setState({ showDialog: false })
    }
    render() {
        return (
            <div className="peopleList-Wrapper">
                <Header />
                <Search search={this.search} />
                <List list={this.state.currentPageList} onClickEdit={this.onClickEdit} />
                <Pagination 
                    skipPage={this.skipPage} 
                    paginationList={this.state.paginationList} 
                    page={this.state.page} 
                    onClickAdd={this.onClickAdd} 
                    onClickReduce={this.onClickReduce}
                    maxPage={this.state.maxPage + 1}
                    />
                {this.state.showDialog ? <Mask onClickMask={this.onClickMask} /> : ''}
                {this.state.showDialog ? <Dialog id={this.state.editId} list={this.state.peopleList} onClickAge={this.onClickAge} /> : ''}     
            </div>
        );
    }
}

export default PeopleList;
import React, { Component } from 'react';
import './index.css'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }
    // 输入框值发生变化
    onChangeHandle = (e) => {
        this.setState({ query: e.target.value })
        if (e.target.value === '') {
            this.props.search('')
        }
    }
    render() {
        return (
            <div className="search-wrapper">
                <input onChange={this.onChangeHandle} type="text"/>
                <button onClick={() => this.props.search(this.state.query)}>搜索</button>
            </div>
        );
    }
}

export default Search;
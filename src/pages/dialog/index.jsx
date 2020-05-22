import React from 'react';
import './index.css'
import Mask from '../mask'

class Dialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            age: 0
        }
    }
    componentDidMount() {
        let currentItem = this.props.list.find(item => item.id === this.props.id)
        this.setState({
            name: currentItem.name,
            age: currentItem.age
        })
    }
    onChangeHandle = (e) => {
        this.setState({ age: e.target.value })
    }
    render() {
        return (
            <div>
                <Mask onClickMask={this.props.onClickMask} />
                <div className="Dialog-warpper">
                    <div className="name">
                        <span>姓名：</span>
                        <span>{this.state.name}</span>
                    </div>
                    <div className="age">
                        <span>年龄：</span>
                        <input value={this.state.age} type="number" onChange={this.onChangeHandle} />
                    </div>
                    <button onClick={this.props.onChangeAge.bind(null, this.state.age)}>确定</button>
                </div>
            </div>
        );
    }
}

export default Dialog;
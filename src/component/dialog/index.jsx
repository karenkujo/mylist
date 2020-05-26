import React, { useState, useEffect } from 'react';
import './index.css';
import Mask from './mask';
import * as actions from '@/pages/peopleList/store/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function Dialog(props) {
    let [currentPeople, setCurrentPeople] = useState({
        name: '',
        age: 0,
    });
    let { list, id, onChangeAge } = props;

    useEffect(() => {
        let currentItem = list.find((item) => item.id === id);
        if (currentItem) {
            setCurrentPeople(currentItem);
        } else {
            alert('您要编辑的条目不存在');
        }
    }, []);

    const onChangeHandle = (e) => {
        setCurrentPeople({
            ...currentPeople,
            age: e.target.value,
        });
    };
    return (
        <div>
            <Mask />
            <div className="dialog-wrapper">
                <div className="name">
                    <span>姓名：</span>
                    <span>{currentPeople.name}</span>
                </div>
                <div className="age">
                    <span>年龄：</span>
                    <input
                        value={currentPeople.age}
                        type="number"
                        onChange={onChangeHandle}
                    />
                </div>
                <button onClick={onChangeAge.bind(null, currentPeople.age)}>
                    确定
                </button>
            </div>
        </div>
    );
}

const mapState = (state) => ({
    list: state.peopleListReducer.peopleList,
    id: state.peopleListReducer.editId,
});
const mapDispatch = (dispatch) => {
    return bindActionCreators(actions, dispatch);
};

export default connect(mapState, mapDispatch)(Dialog);

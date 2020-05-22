import React, { useState, useEffect } from 'react';
import './index.css';
import Mask from '@/pages/mask';

function Dialog(props) {
    let [name, setName] = useState('');
    let [age, setAge] = useState(0);
    let { list, id } = props;

    useEffect(() => {
        let currentItem = list.find((item) => item.id === id);
        if (currentItem) {
            setName(currentItem.name);
            setAge(currentItem.age);
        } else {
            alert('您要编辑的条目不存在');
        }
    }, []);

    const onChangeHandle = (e) => {
        setAge(e.target.value);
    };
    return (
        <div>
            <Mask onClickMask={props.onClickMask} />
            <div className="dialog-wrapper">
                <div className="name">
                    <span>姓名：</span>
                    <span>{name}</span>
                </div>
                <div className="age">
                    <span>年龄：</span>
                    <input
                        value={age}
                        type="number"
                        onChange={onChangeHandle}
                    />
                </div>
                <button onClick={props.onChangeAge.bind(null, age)}>
                    确定
                </button>
            </div>
        </div>
    );
}

export default Dialog;

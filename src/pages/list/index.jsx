import React from 'react';
import './index.css'

function List(props) {
    return (
        <div className="list-wrapper">
            {props.list.map(item => (
                <div key={item.id} className="list-item">
                    <span className="name">{item.name}</span>
                    <span className="age">{item.age}</span>
                    <button onClick={() => props.onClickEdit(item.id)}>编辑</button>
                </div>
            ))}
        </div>
    )
}

export default List;
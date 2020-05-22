import React from 'react';
import './index.css';

function List(props) {
    let { list } = props;
    return (
        <div className="list-wrapper">
            {list.length ? (
                list.map((item) => (
                    <div key={item.id} className="list-item">
                        <span className="name">{item.name}</span>
                        <span className="age">{item.age}</span>
                        <button onClick={props.onClickEdit.bind(null, item.id)}>
                            编辑
                        </button>
                    </div>
                ))
            ) : (
                <div>没有列表数据</div>
            )}
        </div>
    );
}

export default List;

import React from 'react';
import './index.css'

function Pageination(props) {
    return (
        <div className="pageination-wrapper">
            <button onClick={props.onClickReduce}>上一页</button>
            {
                props.paginationList.map((item, index) => {
                    return <span onClick={() => props.skipPage(item - 1)} className={props.page + 1 === item ? 'active' : ''} key={index}>{item}</span>
                })
            }
            <button onClick={props.onClickAdd}>下一页</button>
            <div>共{props.maxPage}页</div>
        </div>
    );
}

export default Pageination;
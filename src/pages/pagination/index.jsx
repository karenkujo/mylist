import React from 'react';
import './index.css';

function Pageination(props) {
    const { paginationList, selectPage, page, maxPage } = props;
    return (
        <div className="pageination-wrapper">
            <button onClick={selectPage.bind(null, 'back')}>上一页</button>
            {paginationList.map((item, index) => {
                return (
                    <span
                        onClick={selectPage.bind(null, 'skip', item - 1)}
                        className={page + 1 === item ? 'active' : ''}
                        key={index}
                    >
                        {item}
                    </span>
                );
            })}
            <button onClick={selectPage.bind(null, 'next')}>下一页</button>
            <div>共{maxPage}页</div>
        </div>
    );
}

export default Pageination;

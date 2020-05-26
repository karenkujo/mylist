import React from 'react';
import './index.css';
import * as actions from '@/pages/peopleList/store/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function Pageination(props) {
    const { selectPage, page, currentList, offset } = props;
    const maxPage = Math.floor(currentList.length / offset);
    const paginationList = new Array(maxPage + 1).fill(1).map((item, index) => index + 1);
    return (
        <div className="pageination-wrapper">
            <button onClick={selectPage.bind(null, page - 1, maxPage)}>
                上一页
            </button>
            {paginationList.map((item, index) => {
                return (
                    <span
                        onClick={selectPage.bind(null, item - 1, maxPage)}
                        className={page + 1 === item ? 'active' : ''}
                        key={index}
                    >
                        {item}
                    </span>
                );
            })}
            <button onClick={selectPage.bind(null, page + 1, maxPage)}>
                下一页
            </button>
            <div>共{maxPage + 1}页</div>
        </div>
    );
}

const mapState = (state) => ({
    page: state.peopleListReducer.page,
    currentList: state.peopleListReducer.currentList,
    offset: state.peopleListReducer.offset,
});
const mapDispatch = (dispatch) => {
    return bindActionCreators(actions, dispatch);
};

export default connect(mapState, mapDispatch)(Pageination);

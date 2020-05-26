import React from 'react';
import './index.css';
import * as actions from '@/pages/peopleList/store/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function List(props) {
    let { currentList, page, offset, onClickEdit } = props;
    const list = currentList.slice(page * offset, (page + 1) * offset);
    return (
        <div className="list-wrapper">
            {list.length ? (
                list.map((item) => (
                    <div key={item.id} className="list-item">
                        <span className="name">{item.name}</span>
                        <span className="age">{item.age}</span>
                        <button onClick={onClickEdit.bind(null, item.id)}>
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

const mapState = (state) => ({
    currentList: state.peopleListReducer.currentList,
    page: state.peopleListReducer.page,
    offset: state.peopleListReducer.offset,
});
const mapDispatch = (dispatch) => {
    return bindActionCreators(actions, dispatch);
};

export default connect(mapState, mapDispatch)(List);

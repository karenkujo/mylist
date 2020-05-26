import React from 'react';
import './index.css';
import * as actions from '@/pages/peopleList/store/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function Mask(props) {
    let { onClickMask } = props;
    return <div className="mask" onClick={onClickMask}></div>;
}

const mapDispatch = (dispatch) => {
    return bindActionCreators(actions, dispatch);
};

export default connect(null, mapDispatch)(Mask);

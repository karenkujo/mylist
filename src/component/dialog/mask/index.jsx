import React from 'react';
import './index.css';
import * as actions from '@/store/action';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

function Mask(props) {
    return <div className="mask" onClick={props.onClickMask}></div>;
}

const mapDispatch = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

export default connect(null, mapDispatch)(Mask);

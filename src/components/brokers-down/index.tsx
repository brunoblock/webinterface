import React from "react";
import { connect } from "react-redux";

import BrokersDownSlide from ".//brokers-down-slide";

const mapStateToProps = state => ({
    history: state.upload.history
});
const mapDispatchToProps = dispatch => ({});

const BrokersDownPage = ({ history }) => {
    return <BrokersDownSlide/>;
};

export default connect(mapStateToProps, mapDispatchToProps)(BrokersDownPage);
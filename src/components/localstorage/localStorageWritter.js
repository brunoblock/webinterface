import React, { Component } from "react";
import { connect } from "react-redux";

import localStorageActions from "../../redux/actions/localStorage-actions";

const mapStateToProps = state => ({
  items: state.items
});
const mapDispatchToProps = dispatch => ({
  addFn: item => dispatch(localStorageActions.addAction(item))
});

class LocalStorageWritter extends Component {
  render() {
    const { addFn } = this.props;
    return (
      <div>
        <input
          ref="writterInput"
          type="text"
        />
        <button
          onClick={() => {
            const item = this.refs.writterInput.value;
            addFn(item);
          }}
        >
          Add item
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocalStorageWritter);

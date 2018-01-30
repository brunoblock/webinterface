import React, { Component } from "react";
import { connect } from "react-redux";
import FileSaver from "file-saver";

const mapStateToProps = state => ({
  items: state.upload.history
});

const mapDispatchToProps = dispatch => ({
});

function generateUploadHistoryFileFn(items) {
  let output = "";
  if(items.length) {
    const items_map =  items.map((e, i) => (e));
    Object.keys(items_map).forEach((key) => {
      output += items_map[key].handle + "\n";
    });
    let blob = new Blob([output], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "uploadHistory.txt");
  }
}

class UploadHistoryButton extends Component {
  render() {
    const items = this.props.items;
    return (
      <div>
        <button
          onClick={() => {
            generateUploadHistoryFileFn(items);
          }}
        >
          Generate upload history
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadHistoryButton);

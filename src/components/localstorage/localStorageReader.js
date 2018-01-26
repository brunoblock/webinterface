import React, { Component } from "react";
import { connect } from "react-redux";
import FileSaver from "file-saver";

const mapStateToProps = state => ({
  items: state.localStorage.items
});

const mapDispatchToProps = dispatch => ({
});

function generateFileLocalStorageFn() {
  let output = "";
  const localStorageItems = JSON.parse(localStorage.getItem("reduxPersist:localStorage"));
  const items =  localStorageItems.items.map((e, i) => (e));
  Object.keys(items).forEach( (key) => {
    output += items[key] + "\n";
  });
  let blob = new Blob([output], {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(blob, "localStorage.txt");
}

function generateFilePropsFn(itemsProps) {
  let output = "";
  const items =  itemsProps.map((e, i) => (e));
  Object.keys(items).forEach((key) => {
    output += items[key] + "\n";
  });
  let blob = new Blob([output], {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(blob, "localStorage.txt");
}

class LocalStorageReader extends Component {
  render() {
    const items = this.props.items;
    return (
      <div>
        <button
          onClick={() => {
            generateFileLocalStorageFn();
          }}
        >
          Generate file directly localStorage
        </button>
        <button
          onClick={() => {
            generateFilePropsFn(items);
          }}
        >
          Generate file props
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocalStorageReader);

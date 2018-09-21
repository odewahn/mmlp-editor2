import React from "react";
import fetch from "isomorphic-unfetch";
import buildUrl from "build-url";
import { connect } from "react-redux";

import SearchBar from "@oreillymedia/design-system/SearchBar";
import Icon from "@oreillymedia/design-system/Icon";

// Imported Actions
import {
  setSearchResults,
  setActiveTab,
  setSelectedItem,
  fetchWorks,
  setErrorMessage
} from "../state/search";

function safeIterator(x) {
  return x ? x : [];
}

class SearchResultList extends React.Component {
  render() {
    return (
      <div style={{ minHeight: "50vh", maxHeight: "50vh", overflowY: "auto" }}>
        <ul className="mdc-list demo-list mdc-list--two-line mdc-list--avatar-list">
          {safeIterator(this.props.results["results"]).map((item, idx) => (
            <li
              key={item.isbn + "-" + idx}
              className="mdc-list-item mdc-ripple-upgraded"
              onClick={() => {
                this.props.dispatch(setSelectedItem(item));
                this.props.dispatch(setActiveTab(1));
              }}
            >
              <span
                className="mdc-list-item__graphic material-icons"
                aria-hidden="true"
              >
                <Icon size={56} name={item.format} />
              </span>
              <span className="mdc-list-item__text">
                <span className="mdc-list-item__primary-text">
                  {item.title}
                </span>
                <span className="mdc-list-item__secondary-text">
                  {item.authors ? item.authors.join(", ") : null}
                </span>
              </span>
              <span
                className="mdc-list-item__meta material-icons"
                aria-hidden="true"
              >
                <Icon name="chevron-right" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(state => state)(
  class SearchWork extends React.Component {
    render() {
      return (
        <div>
          {this.props.searchSpinner ? <p>Searching...</p> : null}
          <SearchResultList
            results={this.props.results["results"]}
            {...this.props}
          />
        </div>
      );
    }
  }
);

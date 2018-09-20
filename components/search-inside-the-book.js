import React from "react";
import { connect } from "react-redux";

import SearchBar from "@oreillymedia/design-system/SearchBar";
import Icon from "@oreillymedia/design-system/Icon";

// Imported Actions
import {
  setSITBResults,
  setActiveTab,
  setSelectedItem,
  fetchSITB,
  addSegment,
  segmentInSelectedSegments
} from "../state/search";

function safeIterator(x) {
  return x ? x : [];
}

class SITBResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemHasBeenChecked: 0
    };
  }
  render() {
    return (
      <ul className="mdc-list demo-list mdc-list--two-line mdc-list--avatar-list">
        {safeIterator(this.props.sitb_results["results"]).map((item, idx) => (
          <li
            key={item.isbn + "-" + idx}
            className="mdc-list-item mdc-ripple-upgraded"
            onClick={() => {
              this.props.dispatch(addSegment(item));
              this.setState({ itemHasBeenChecked: Math.random() });
            }}
            itemchecked={this.state.itemHasBeenChecked}
          >
            <span
              className="mdc-list-item__graphic material-icons"
              aria-hidden="true"
            >
              {segmentInSelectedSegments(item, this.props.segments) ? (
                <Icon size={56} name="checkmark" />
              ) : (
                <Icon size={56} name="topics" />
              )}
            </span>
            <span className="mdc-list-item__text">
              <span className="mdc-list-item__primary-text">
                {item.chapter_title}
              </span>
              <span className="mdc-list-item__secondary-text">
                {item.title}
              </span>
            </span>
            <span
              className="mdc-list-item__meta material-icons"
              aria-hidden="true"
            >
              <Icon size={36} name="add-plus" />
            </span>
          </li>
        ))}
      </ul>
    );
  }
}

export default connect(state => state)(
  class SearchSITB extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        query: "",
        spinning: false,
        forceRefresh: 0.0
      };
    }

    handleChange(k, v) {
      this.setState({ [k]: v });
    }

    performSearch() {
      this.props.dispatch(
        fetchSITB({
          identifier: this.props.selectedItem.isbn,
          query: this.state.query
        })
      );
    }

    render() {
      return (
        <div>
          <SearchBar
            variant="slim"
            ariaHidden={true}
            inputLabel="Search"
            placeholder="Search this work for a segment"
            onAutocomplete={e => this.handleChange("query", e)}
            onSearch={() => this.performSearch()}
          />
          {this.props.searchSpinner ? <p>Searching...</p> : null}
          <h1>{this.props.selectedItem.title}</h1>
          <SITBResultList
            results={this.props.sitb_results["results"]}
            {...this.props}
          />
        </div>
      );
    }
  }
);

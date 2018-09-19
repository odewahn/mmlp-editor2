import React from "react";
import { connect } from "react-redux";

import SearchBar from "@oreillymedia/design-system/SearchBar";
import Icon from "@oreillymedia/design-system/Icon";

// Imported Actions
import {
  setSITBResults,
  setActiveTab,
  setSelectedItem,
  fetchSITB
} from "../state/search";

function safeIterator(x) {
  return x ? x : [];
}

class SITBResultList extends React.Component {
  render() {
    return (
      <ul className="mdc-list demo-list mdc-list--two-line mdc-list--avatar-list">
        {safeIterator(this.props.Search.sitb_results["results"]).map(item => (
          <li
            className="mdc-list-item mdc-ripple-upgraded"
            onClick={() => {
              //this.props.dispatch(setSelectedItem(item));
              //this.props.dispatch(setActiveTab(1));
              console.log(item);
            }}
          >
            <span
              className="mdc-list-item__graphic material-icons"
              aria-hidden="true"
            >
              <Icon size={56} name="topics" />
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
        spinning: false
      };
    }

    handleChange(k, v) {
      this.setState({ [k]: v });
    }

    performSearch() {
      this.props.dispatch(
        fetchSITB({
          identifier: this.props.Search.selectedItem.isbn,
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
            placeholder="Select a work"
            onAutocomplete={e => this.handleChange("query", e)}
            onSearch={() => this.performSearch()}
          />
          {this.props.Search.sitbSpinner ? <p>Searching...</p> : null}
          <h1>{this.props.Search.selectedItem.title}</h1>
          <SITBResultList
            results={this.props.Search.sitb_results["results"]}
            {...this.props}
          />
        </div>
      );
    }
  }
);

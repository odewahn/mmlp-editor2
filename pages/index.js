import React from "react";
import fetch from "isomorphic-unfetch";
import buildUrl from "build-url";
import { connect } from "react-redux";

import Head from "../components/head";
import Modal from "@oreillymedia/design-system/Modal";
import Card from "@oreillymedia/design-system/Card";
import CardGroup from "@oreillymedia/design-system/CardGroup";
import SearchBar from "@oreillymedia/design-system/SearchBar";
import { TabGroup, Tab } from "@oreillymedia/design-system/TabGroup";
import Icon from "@oreillymedia/design-system/Icon";

// Imported Actions
import {
  setSearchResults,
  setActiveTab,
  setSelectedItem
} from "../state/search";

class SearchResultList extends React.Component {
  render() {
    return (
      <ul className="mdc-list demo-list mdc-list--two-line mdc-list--avatar-list">
        {this.props.results.map(item => (
          <li
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
              <span className="mdc-list-item__primary-text">{item.title}</span>
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
    );
  }
}

export default connect(state => state)(
  class Page extends React.Component {
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

    performSearch = async e => {
      this.setState({ spinning: true });

      const res = await fetch(
        buildUrl("https://falcon.sfo.safaribooks.com", {
          path: "/api/v2/search/",
          queryParams: {
            query: this.state.query
          }
        })
      );
      const json = await res.json();
      this.props.dispatch(setSearchResults(json));
      this.setState({ spinning: false });
    };

    render() {
      return (
        <Modal open={true}>
          <Head title="Home" />
          <TabGroup
            activeTab={this.props.Search.activeTab}
            onTabChange={i => this.props.dispatch(setActiveTab(i))}
          >
            <Tab title="Select Work" onClick={() => console.log("Doin it!")}>
              <SearchBar
                variant="slim"
                ariaHidden={true}
                inputLabel="Search"
                placeholder="Select a work"
                onAutocomplete={e => this.handleChange("query", e)}
                onSearch={() => this.performSearch()}
              />
              {this.state.spinning ? <p>Searching...</p> : null}
              <SearchResultList
                results={
                  "results" in this.props.Search.results
                    ? this.props.Search.results["results"]
                    : []
                }
                {...this.props}
              />
            </Tab>
            <Tab title="Select segment">
              <p>{this.props.Search.selectedItem["title"]}</p>
            </Tab>
          </TabGroup>
        </Modal>
      );
    }
  }
);

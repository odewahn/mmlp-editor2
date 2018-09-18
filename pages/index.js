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

class SearchResult extends React.Component {
  render() {
    return (
      <li
        className="mdc-list-item mdc-ripple-upgraded"
        onClick={() => {
          console.log("They clicked", this.props.item.isbn);
        }}
      >
        <span
          className="mdc-list-item__graphic material-icons"
          aria-hidden="true"
        >
          <Icon size={56} name={this.props.item.format} />
        </span>
        <span className="mdc-list-item__text">
          <span className="mdc-list-item__primary-text">
            {this.props.item.title}
          </span>
          <span className="mdc-list-item__secondary-text">
            {this.props.item.authors
              ? this.props.item.authors.join(", ")
              : null}
          </span>
        </span>
        <span className="mdc-list-item__meta material-icons" aria-hidden="true">
          <Icon name="chevron-right" />
        </span>
      </li>
    );
  }
}

class SearchResultList extends React.Component {
  render() {
    return (
      <ul className="mdc-list demo-list mdc-list--two-line mdc-list--avatar-list">
        {this.props.results.map(result => <SearchResult item={result} />)}
      </ul>
    );
  }
}

export default connect(state => state)(
  class Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        results: {
          results: []
        },
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
      console.log(json.results);
      this.setState({ results: json, spinning: false });
    };

    render() {
      console.log(this.props);
      return (
        <Modal open={true}>
          <Head title="Home" />
          <TabGroup
            activeTab={this.state.activeSearchTab}
            onTabChange={i => this.setState({ activeSearchTab: i })}
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
              <SearchResultList results={this.state.results["results"]} />
            </Tab>
            <Tab title="Select segment">
              <p>Search more in here</p>
            </Tab>
          </TabGroup>
        </Modal>
      );
    }
  }
);

//export default connect(state => state)(Page);

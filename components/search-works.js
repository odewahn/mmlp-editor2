import React from "react";
import fetch from "isomorphic-unfetch";

import Head from "../components/head";
import Modal from "@oreillymedia/design-system/Modal";
import Card from "@oreillymedia/design-system/Card";
import CardGroup from "@oreillymedia/design-system/CardGroup";
import SearchBar from "@oreillymedia/design-system/SearchBar";
import { TabGroup, Tab } from "@oreillymedia/design-system/TabGroup";

class SearchResult extends React.Component {
  render() {
    return (
      <CardGroup>
        <div
          key={this.props.item.isbn}
          onClick={() => {
            console.log("They clicked", this.props.item.isbn);
          }}
        >
          <Card
            label={this.props.item.format}
            iconLabel={this.props.item.format}
            title={this.props.item.title}
            authors={this.props.item.authors}
            level={3}
          />
        </div>
      </CardGroup>
    );
  }
}

class SearchResultList extends React.Component {
  render() {
    return (
      <div style={{ align: "left" }}>
        {this.props.results.map(result => <SearchResult item={result} />)}
      </div>
    );
  }
}

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSearchTab: 0,
      results: {
        results: []
      },
      query: "",
      spinning: false,
      selectedItem: {}
    };
  }

  buildUrl(url, parameters) {
    let qs = "";
    for (const key in parameters) {
      if (parameters.hasOwnProperty(key)) {
        const value = parameters[key];
        qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
      }
    }
    if (qs.length > 0) {
      qs = qs.substring(0, qs.length - 1); //chop off last "&"
      url = url + "?" + qs;
    }

    return url;
  }

  handleChange(k, v) {
    this.setState({ [k]: v });
  }

  performSearch = async e => {
    this.setState({ spinning: true });
    const res = await fetch(
      this.buildUrl("https://falcon.sfo.safaribooks.com/api/v2/search/", {
        query: this.state.query
      })
    );
    const json = await res.json();
    console.log(json.results);
    this.setState({ results: json, spinning: false });
  };

  render() {
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
              onChange={() => console.log("Doin it!")}
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

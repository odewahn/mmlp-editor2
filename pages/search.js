import React from "react";
import fetch from "isomorphic-unfetch";

import Head from "../components/head";
import SearchBar from "@oreillymedia/design-system/SearchBar";
import { Grid, Row, Column } from "@oreillymedia/design-system/Grid";
import SearchResultList from "../components/search-result-list";

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
    this.setState({ results: json, spinning: false });
  };

  render() {
    return (
      <div>
        <div>
          <Head title="Home" />
          <Grid>
            <Row>
              <Column col={{ medium: 8 }}>
                <SearchBar
                  variant="slim"
                  ariaHidden={true}
                  inputLabel="Search"
                  placeholder="Find you some content"
                  onAutocomplete={e => this.handleChange("query", e)}
                  onChange={() => console.log("Doin it!")}
                  onSearch={() => this.performSearch()}
                />
                {this.state.spinning ? <p>Searching...</p> : null}
              </Column>
            </Row>
            <SearchResultList results={this.state.results["results"]} />
            <Row />
          </Grid>
        </div>
      </div>
    );
  }
}

export default Page;

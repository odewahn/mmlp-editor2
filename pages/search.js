import React from "react";
import fetch from "isomorphic-unfetch";

import Head from "../components/head";
import SearchBar from "@oreillymedia/design-system/SearchBar";
import { Grid, Row, Column } from "@oreillymedia/design-system/Grid";

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      query: "",
      spinning: false
    };
  }

  handleChange(k, v) {
    console.log(k, v);
  }

  handleRefresh = async e => {
    console.log("doing something");

    this.setState({ spinning: true });
    const res = await fetch(
      "https://falcon.sfo.safaribooks.com/api/v2/search/"
    );
    const json = await res.json();
    this.setState({ results: json, spinning: false });
    console.log(this.state.results);
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
                  onAutocomplete={e => this.handleChange("xxx", e)}
                  onChange={() => console.log("Doin it!")}
                  onSearch={() => this.handleRefresh()}
                />
                {this.state.spinning ? <p>Searching...</p> : null}
              </Column>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Page;

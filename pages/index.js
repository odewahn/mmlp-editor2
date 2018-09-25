import "babel-polyfill";
import React from "react";
import fetch from "isomorphic-unfetch";
import buildUrl from "build-url";
import { connect } from "react-redux";

import Head from "../components/head";
import Navigation from "@oreillymedia/design-system/Navigation";
import Footer from "@oreillymedia/design-system/Footer";
import Button from "@oreillymedia/design-system/Button";
import { Grid, Row, Column } from "@oreillymedia/design-system/Grid";

import Notification from "@oreillymedia/design-system/Modal";

// Imported Actions
import { clearErrorMessage, fetchSOLRWorks } from "../state/search";
import SearchResults from "../components/search-results";

export default connect(state => state)(
  class Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectorOpen: false,
        query: ""
      };
    }
    handleChange(k, v) {
      this.setState({ [k]: v });
    }
    render() {
      return (
        <Grid>
          <Row>
            <Column col={{ medium: 12 }}>
              <Head title="Search Content" />
              <Navigation
                onAutocomplete={x => {
                  this.handleChange("query", x);
                }}
                onSearch={() => {
                  this.props.dispatch(fetchSOLRWorks(this.state.query));
                }}
              />
            </Column>
          </Row>
          <Row>
            <Column col={{ medium: 12 }}>
              <Notification
                icon="warning-bang"
                open={this.props.errorMessage ? true : false}
                onClose={() => {
                  this.props.dispatch(clearErrorMessage());
                }}
              >
                {this.props.errorMessage}
              </Notification>
            </Column>
          </Row>
          <Row>
            <Column col={{ medium: 5 }}>
              <SearchResults {...this.props} />
            </Column>
            <Column col={{ medium: 7 }}>
              {this.props.contentSpinner ? <p>Searching...</p> : null}
              <h1>{this.props.content.title}</h1>
              {this.props.content.authors
                ? this.props.content.authors.join(", ")
                : null}
              <br />
              {this.props.content.publishers
                ? this.props.content.publishers.join(", ")
                : null}
              <br />
              {this.props.content.issued}
              <br />
              {Object.keys(this.props.content).length > 0 ? (
                <Button variant="secondary">Add to my path</Button>
              ) : null}

              <hr />
              <div
                dangerouslySetInnerHTML={{
                  __html: this.props.content.content_raw
                }}
              />
            </Column>
          </Row>
          <Row>
            <Column col={{ medium: 12 }}>
              <Footer />
            </Column>
          </Row>
        </Grid>
      );
    }
  }
);

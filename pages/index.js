import "babel-polyfill";
import React from "react";
import { connect } from "react-redux";

import Head from "../components/head";
import Button from "@oreillymedia/design-system/Button";
import SearchBar from "@oreillymedia/design-system/SearchBar";
import { Grid, Row, Column } from "@oreillymedia/design-system/Grid";

import Notification from "@oreillymedia/design-system/Modal";
import VideoPlayer from "../components/video-player";

// Imported Actions
import {
  clearErrorMessage,
  fetchSOLRWorks,
  computeKalturaReferenceID
} from "../state/search";
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
              <SearchBar
                onAutocomplete={x => {
                  this.handleChange("query", x);
                }}
                onSearch={() => {
                  this.props.dispatch(fetchSOLRWorks(this.state.query));
                }}
              />
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

              {this.props.content.format == "video" ? (
                <VideoPlayer
                  targetId="kaltura-player"
                  referenceId={computeKalturaReferenceID(this.props.content)}
                />
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.props.content.content_raw
                  }}
                />
              )}
            </Column>
          </Row>
        </Grid>
      );
    }
  }
);

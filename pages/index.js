import "babel-polyfill";
import React from "react";
import { connect } from "react-redux";

import Head from "../components/head";
import SearchBar from "@oreillymedia/design-system/SearchBar";
import { Grid, GridCell, GridInner } from "@rmwc/grid";

import Notification from "@oreillymedia/design-system/Modal";
import VideoPlayer from "../components/video-player";
import AddContentCard from "../components/add-content-card";

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
          <GridCell span="12">
            <Head title="Search Content" />
          </GridCell>
          <GridCell span="12">
            <Notification
              icon="warning-bang"
              open={this.props.errorMessage ? true : false}
              onClose={() => {
                this.props.dispatch(clearErrorMessage());
              }}
            >
              {this.props.errorMessage}
            </Notification>
          </GridCell>
          <GridCell span="5">
            <SearchBar
              onAutocomplete={x => {
                this.handleChange("query", x);
              }}
              onSearch={() => {
                this.props.dispatch(fetchSOLRWorks(this.state.query));
              }}
            />
            <SearchResults {...this.props} />
          </GridCell>
          <GridCell span="7">
            <AddContentCard content={this.props.contents} />
            {this.props.content.format == "video" ? (
              <VideoPlayer
                targetId="kaltura-player"
                referenceId={computeKalturaReferenceID(this.props.content)}
                session={this.props.kalturaSession}
              />
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: this.props.content.content_raw
                }}
              />
            )}
          </GridCell>
        </Grid>
      );
    }
  }
);

import "babel-polyfill";
import React from "react";
import { connect } from "react-redux";

import Layout from "../layouts/main";

import SearchBar from "@oreillymedia/design-system/SearchBar";
import { Grid, GridCell, GridInner } from "@rmwc/grid";
import { TextField, TextFieldIcon, TextFieldHelperText } from "@rmwc/textfield";

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
        query: ""
      };
    }

    render() {
      return (
        <Layout title="Select Content">
          <Grid>
            <GridCell span="12">
              <SearchBar
                onAutocomplete={e => {
                  this.setState({ query: e });
                }}
                onSearch={() => {
                  this.props.dispatch(fetchSOLRWorks(this.state.query));
                }}
              />
            </GridCell>
            <GridCell span="5">
              <SearchResults {...this.props} />
            </GridCell>
            <GridCell span="7">
              {this.props.content.title ? (
                <AddContentCard content={this.props.contents} />
              ) : null}
              {this.props.content.format == "video" ? (
                <VideoPlayer
                  targetId="kaltura-player"
                  referenceId={computeKalturaReferenceID(this.props.content)}
                  session="djJ8MTkyNjA4MXys4Xm-byj22T3TWrlNtEEDvFwA4f3-vN_JshsnT2jBrEFLwOfNdbs8Ws5b8usK_r9qE9KQXG_6DOKCe3wf7jessF_Q7Wo3Ya7xojWlYad7Vg=="
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
        </Layout>
      );
    }
  }
);

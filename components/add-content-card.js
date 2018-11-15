import React, { Component } from "react";
import Button from "@oreillymedia/design-system/Button";
import { Grid, GridCell, GridInner } from "@rmwc/grid";
import { Fab } from "@rmwc/fab";
import { Elevation } from "@rmwc/elevation";
import { CircularProgress } from "@rmwc/circular-progress";

import { connect } from "react-redux";

// Imported Actions
import {
  addSegment,
  segmentInSelectedSegments,
  safeIterator
} from "../state/search";

export default connect(state => state)(
  class AddContentCard extends React.Component {
    render() {
      return (
        <Grid>
          <GridCell span="12">
            <h2>{this.props.content.chapter_title}</h2>
          </GridCell>
          <GridCell span="4">
            <Button
              onClick={() => {
                this.props.dispatch(addSegment(this.props.content));
                console.log(this.props.content);
              }}
              disabled={
                segmentInSelectedSegments(
                  this.props.content,
                  this.props.segments
                )
                  ? true
                  : false
              }
            >
              {segmentInSelectedSegments(
                this.props.content,
                this.props.segments
              )
                ? "Added"
                : "Add"}
            </Button>
          </GridCell>
          <GridCell span="8">
            {safeIterator(this.props.content.authors).join(", ")}
            <br />
            {safeIterator(this.props.content.publishers).join(", ")}
            <br />
            {this.props.content.issued.substring(0, 10)}
          </GridCell>
        </Grid>
      );
    }
  }
);

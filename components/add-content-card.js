import React, { Component } from "react";
import Button from "@oreillymedia/design-system/Button";
import { Grid, GridCell, GridInner } from "@rmwc/grid";
import { Fab } from "@rmwc/fab";
import { Elevation } from "@rmwc/elevation";
import { CircularProgress } from "@rmwc/circular-progress";

import { connect } from "react-redux";

// Imported Actions
import { addSegment } from "../state/search";

export default connect(state => state)(
  class AddContentCard extends React.Component {
    render() {
      return (
        <Grid>
          <GridCell span="4">
            {Object.keys(this.props.content).length > 0 ? (
              <Button
                onClick={() => {
                  this.props.dispatch(addSegment(this.props.content));
                  console.log(this.props.content);
                }}
                disabled={
                  this.props.selectedItem["id"] == this.props.content.id
                    ? true
                    : false
                }
              >
                Add
              </Button>
            ) : null}
          </GridCell>
          <GridCell span="8">
            {this.props.content.chapter_title ? (
              <h4>{this.props.content.chapter_title}</h4>
            ) : null}
            {this.props.content.authors
              ? this.props.content.authors.join(", ")
              : null}
            {this.props.content.title ? " (" : null}
            {this.props.content.publishers
              ? this.props.content.publishers.join(", ")
              : null}
            {this.props.content.issued
              ? ", " + this.props.content.issued.substring(0, 10)
              : null}
            {this.props.content.title ? ")" : null}
          </GridCell>
        </Grid>
      );
    }
  }
);

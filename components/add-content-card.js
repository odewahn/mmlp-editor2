import React, { Component } from "react";
import Button from "@oreillymedia/design-system/Button";
import { Grid, GridCell, GridInner } from "@rmwc/grid";

import { connect } from "react-redux";

export default connect(state => state)(
  class AddContentCard extends React.Component {
    render() {
      return (
        <Grid>
          <GridCell span="9">
            {this.props.contentSpinner ? <p>Searching...</p> : null}
            <h3>{this.props.content.title}</h3>
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
          <GridCell span="3">
            {Object.keys(this.props.content).length > 0 ? (
              <Button
                onClick={() => {
                  console.log(this.props.content);
                }}
              >
                Add to my path
              </Button>
            ) : null}
          </GridCell>
        </Grid>
      );
    }
  }
);

import React, { Component } from "react";
import Button from "@oreillymedia/design-system/Button";
import { Grid, GridCell, GridInner } from "@rmwc/grid";
import { Fab } from "@rmwc/fab";
import { TextField, TextFieldIcon, TextFieldHelperText } from "@rmwc/textfield";

import { connect } from "react-redux";

// Imported Actions
import {
  addSegment,
  segmentInSelectedSegments,
  safeIterator
} from "../state/search";

export default connect(state => state)(
  class EditSegmentMetadata extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        query: ""
      };
    }
    render() {
      return (
        <Grid>
          <GridCell span="12">
            <TextField fullwidth disabled placeholder="Link Id" />
            <br />
            <TextField fullwidth placeholder="Title" />
            <br />
            <TextField textarea fullwidth label="Description" rows="4" />
          </GridCell>
        </Grid>
      );
    }
  }
);

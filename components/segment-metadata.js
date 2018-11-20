import React, { Component } from "react";
import Button from "@oreillymedia/design-system/Button";
import { Grid, GridCell, GridInner } from "@rmwc/grid";
import { Fab } from "@rmwc/fab";
import { TextField, TextFieldIcon, TextFieldHelperText } from "@rmwc/textfield";

import { SegmentConsumer } from "../state/segment-provider";

import { connect } from "react-redux";

// Imported Actions
import {
  addSegment,
  segmentInSelectedSegments,
  safeIterator,
  updateSegment
} from "../state/search";

export default connect(state => state)(
  class EditSegmentMetadata extends React.Component {
    render() {
      return (
        <SegmentConsumer>
          {({ state, setField }) => (
            <Grid>
              <GridCell span="12">
                <TextField
                  fullwidth
                  placeholder="Title"
                  value={state.title}
                  onChange={e => {
                    setField("title", e.target.value);
                    this.props.dispatch(updateSegment(state));
                  }}
                />
                <br />
                <TextField
                  textarea
                  fullwidth
                  label="Description"
                  value={state.description}
                  rows="3"
                  onChange={e => {
                    setField("description", e.target.value);
                    this.props.dispatch(updateSegment(state));
                  }}
                />
                <br />
                <TextField
                  textarea
                  fullwidth
                  label="Intro"
                  value={state.intro}
                  rows="3"
                  onChange={e => {
                    setField("intro", e.target.value);
                    this.props.dispatch(updateSegment(state));
                  }}
                />
                <br />
                <TextField
                  textarea
                  fullwidth
                  label="Outro"
                  value={state.outro}
                  rows="3"
                  onChange={e => {
                    this.props.dispatch(updateSegment(state));
                    setField("outro", e.target.value);
                  }}
                />
              </GridCell>
            </Grid>
          )}
        </SegmentConsumer>
      );
    }
  }
);

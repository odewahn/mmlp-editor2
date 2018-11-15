import "babel-polyfill";
import React from "react";
import { connect } from "react-redux";

import Layout from "../layouts/main";
import SelectedSegments from "../components/selected-segments";
import SegmentMetadata from "../components/segment-metadata";

import { Grid, GridCell, GridInner } from "@rmwc/grid";
import { TextField, TextFieldIcon, TextFieldHelperText } from "@rmwc/textfield";

export default connect(state => state)(
  class Page extends React.Component {
    render() {
      return (
        <Layout title="Create and edit your path">
          <Grid>
            <GridCell span="5">
              <SelectedSegments />
            </GridCell>
            <GridCell span="7">
              <SegmentMetadata />
            </GridCell>
          </Grid>
        </Layout>
      );
    }
  }
);

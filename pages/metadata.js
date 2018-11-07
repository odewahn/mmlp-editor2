import "babel-polyfill";
import React from "react";
import { connect } from "react-redux";

import Layout from "../layouts/main";

import { Grid, GridCell, GridInner } from "@rmwc/grid";
import { TextField, TextFieldIcon, TextFieldHelperText } from "@rmwc/textfield";

export default connect(state => state)(
  class Page extends React.Component {
    render() {
      return (
        <Layout title="Enter Metadata">
          <Grid>
            <GridCell span="6">
              <p>Put some metadata here!</p>
            </GridCell>
            <GridCell span="6">
              <p>Put some metadata over here, too!</p>
            </GridCell>
          </Grid>
        </Layout>
      );
    }
  }
);

import "babel-polyfill";
import React from "react";
import fetch from "isomorphic-unfetch";
import buildUrl from "build-url";
import { connect } from "react-redux";

import Head from "../components/head";
import Modal from "@oreillymedia/design-system/Modal";
import Navigation from "@oreillymedia/design-system/Navigation";
import Footer from "@oreillymedia/design-system/Footer";
import Button from "@oreillymedia/design-system/Button";

import Notification from "@oreillymedia/design-system/Modal";
import SegmentSelector from "../components/segment-selector";

// Imported Actions
import {
  clearErrorMessage,
  fetchSOLRWorks,
  setActiveTab
} from "../state/search";

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
        <div>
          <Head title="Search Content" />
          <Navigation
            onAutocomplete={x => {
              this.handleChange("query", x);
            }}
            onSearch={() => {
              this.props.dispatch(fetchSOLRWorks(this.state.query));
            }}
          />

          <Notification
            icon="warning-bang"
            open={this.props.errorMessage ? true : false}
            onClose={() => {
              this.props.dispatch(clearErrorMessage());
            }}
          >
            {this.props.errorMessage}
          </Notification>
          <div>
            <p>this is some awesome fucking content</p>
          </div>
          <Footer />
          <hr />
        </div>
      );
    }
  }
);

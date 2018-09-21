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
import { clearErrorMessage, fetchWorks, setActiveTab } from "../state/search";

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
      console.log(v);
      this.setState({ [k]: v });
    }
    render() {
      return (
        <div>
          <Head title="Home" />
          <Navigation
            onAutocomplete={x => {
              this.handleChange("query", x);
            }}
            onSearch={() => {
              this.setState({ selectorOpen: true });
              this.props.dispatch(setActiveTab(0));
              this.props.dispatch(
                fetchWorks({
                  query: this.state.query
                })
              );
            }}
          />
          <p>Some stuff goes here!</p>
          <Notification
            icon="warning-bang"
            open={this.props.errorMessage ? true : false}
            onClose={() => {
              this.props.dispatch(clearErrorMessage());
            }}
          >
            {this.props.errorMessage}
          </Notification>
          <div style={{ width: "80%", marginLeft: "10%", opacity: "0.9" }}>
            <Modal
              open={this.state.selectorOpen}
              onClose={() => {
                this.setState({ selectorOpen: false });
              }}
            >
              <SegmentSelector query={this.state.query} {...this.props} />
            </Modal>
          </div>
          <Footer />
        </div>
      );
    }
  }
);

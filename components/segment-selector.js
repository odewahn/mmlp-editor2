import React from "react";
import fetch from "isomorphic-unfetch";
import buildUrl from "build-url";
import { connect } from "react-redux";

import Head from "../components/head";
import Notification from "@oreillymedia/design-system/Modal";
import { TabGroup, Tab } from "@oreillymedia/design-system/TabGroup";

import SearchWork from "../components/search-work";
import SITB from "../components/search-inside-the-book";

// Imported Actions
import {
  setSearchResults,
  setActiveTab,
  setSelectedItem,
  clearErrorMessage
} from "../state/search";

export default connect(state => state)(
  class Page extends React.Component {
    render() {
      return (
        <TabGroup
          activeTab={this.props.activeTab}
          onTabChange={i => this.props.dispatch(setActiveTab(i))}
        >
          <Tab title="Select Work">
            <SearchWork {...this.props} />
          </Tab>
          <Tab title="Select segment">
            <SITB {...this.props} />
          </Tab>
        </TabGroup>
      );
    }
  }
);

import React from "react";
import fetch from "isomorphic-unfetch";
import buildUrl from "build-url";
import { connect } from "react-redux";

import Head from "../components/head";
import Modal from "@oreillymedia/design-system/Modal";
import { TabGroup, Tab } from "@oreillymedia/design-system/TabGroup";

import SearchWork from "../components/search-work";

// Imported Actions
import {
  setSearchResults,
  setActiveTab,
  setSelectedItem
} from "../state/search";

export default connect(state => state)(
  class Page extends React.Component {
    render() {
      return (
        <Modal open={true}>
          <Head title="Home" />

          <TabGroup
            activeTab={this.props.Search.activeTab}
            onTabChange={i => this.props.dispatch(setActiveTab(i))}
          >
            <Tab title="Select Work">
              <SearchWork {...this.props} />
            </Tab>
            <Tab title="Select segment">
              <p>{this.props.Search.selectedItem["title"]}</p>
            </Tab>
          </TabGroup>
        </Modal>
      );
    }
  }
);

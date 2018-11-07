/* layouts/Main.js */

import Head from "next/head";
import { ThemeProvider } from "@rmwc/theme";
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  TopAppBarTitle
} from "@rmwc/top-app-bar";

import Logo from "@oreillymedia/design-system/Logo";

import React, { Component } from "react";

import { connect } from "react-redux";

export default connect(state => state)(
  class Layout extends React.Component {
    render() {
      return (
        <span>
          <Head>
            <meta charSet="UTF-8" />
            <title>{this.props.title || ""}</title>

            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />

            <link
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"
            />

            <link
              rel="stylesheet"
              type="text/css"
              href="/static/material-components-web.min.css"
            />

            <link rel="stylesheet" type="text/css" href="/static/base.css" />
            <link
              rel="stylesheet"
              type="text/css"
              href="/static/components.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="/static/video-player.css"
            />
          </Head>
          <ThemeProvider
            options={{
              primary: "#d3002d"
            }}
          >
            <TopAppBar>
              <TopAppBarRow>
                <TopAppBarSection>
                  <Logo size="small" />
                </TopAppBarSection>
                <TopAppBarSection alignEnd>
                  <TopAppBarActionItem aria-label="Download" alt="Download">
                    file_download
                  </TopAppBarActionItem>
                  <TopAppBarActionItem
                    aria-label="Print this page"
                    alt="Print this page"
                  >
                    print
                  </TopAppBarActionItem>
                  <TopAppBarActionItem
                    aria-label="Bookmark this page"
                    alt="Bookmark this page"
                  >
                    bookmark
                  </TopAppBarActionItem>
                </TopAppBarSection>
              </TopAppBarRow>
            </TopAppBar>

            <main>
              <div style={{ height: "64px" }} />
              {this.props.children}
            </main>
          </ThemeProvider>
        </span>
      );
    }
  }
);

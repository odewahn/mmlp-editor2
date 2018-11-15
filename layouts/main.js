/* layouts/Main.js */

import Head from "next/head";
import Router from "next/router";

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
import { LinearProgress } from "@rmwc/linear-progress";

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
                  {this.props.title}
                </TopAppBarSection>
                <TopAppBarSection alignEnd>
                  <TopAppBarActionItem
                    aria-label="Add content to path"
                    alt="Create path"
                    onClick={() => Router.push("/")}
                  >
                    search
                  </TopAppBarActionItem>
                  <TopAppBarActionItem
                    aria-label="Add content"
                    alt="Select segments"
                    onClick={() => Router.push("/edit-path")}
                  >
                    build
                  </TopAppBarActionItem>{" "}
                  <TopAppBarActionItem
                    aria-label="Edit your metadata"
                    alt="Edit Metadata"
                    onClick={() => Router.push("/metadata")}
                  >
                    dashboard
                  </TopAppBarActionItem>
                </TopAppBarSection>
              </TopAppBarRow>
            </TopAppBar>

            <main>
              <div style={{ height: "66px" }} />
              <LinearProgress
                determinate={false}
                closed={!this.props.spinner}
              />
              {this.props.loggedIn ? (
                this.props.children
              ) : (
                <p>Fuck off, anonymous user!</p>
              )}
            </main>
          </ThemeProvider>
        </span>
      );
    }
  }
);

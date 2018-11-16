import App, { Container } from "next/app";
import React from "react";
import withReduxStore from "../state/lib/with-redux-store";
import { Provider } from "react-redux";

import SegmentProvider from "../state/segment-provider";

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <SegmentProvider>
            <Component {...pageProps} />
          </SegmentProvider>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);

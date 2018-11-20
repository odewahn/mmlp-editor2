import App, { Container } from "next/app";
//import React from "react";
import withReduxStore from "../state/lib/with-redux-store";
import { Provider } from "react-redux";

import SegmentProvider from "../state/segment-provider";

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <SegmentProvider>
          <Provider store={reduxStore}>
            <Component {...pageProps} />
          </Provider>
        </SegmentProvider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);

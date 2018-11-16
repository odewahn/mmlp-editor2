import React, { Component } from "react";

// first we will make a new context
const SegmentContext = React.createContext();

// Then create a provider Component
class SegmentProvider extends Component {
  state = {
    linkId: "99-luft-ballons",
    title: "everyones a super hero",
    description: "everyone is a captain kirk",
    intro: "worry worry organize",
    outro: "99 luft ballons go by"
  };
  render() {
    return (
      <SegmentContext.Provider
        value={{
          state: this.state,
          setField: (key, val) =>
            this.setState({
              [key]: val
            })
        }}
      >
        {this.props.children}
      </SegmentContext.Provider>
    );
  }
}

// then make a consumer which will surface it
const SegmentConsumer = SegmentContext.Consumer;

export default SegmentProvider;
export { SegmentConsumer };

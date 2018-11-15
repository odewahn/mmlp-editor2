import React, { Component } from "react";

// first we will make a new context
const SegmentContext = React.createContext();

// Then create a provider Component
class SegmentProvider extends Component {
  state = {
    linkId: "",
    title: "",
    description: "",
    intro: "",
    outro: ""
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

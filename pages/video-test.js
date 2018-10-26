import "babel-polyfill";
import React from "react";
import { connect } from "react-redux";
import VideoPlayer from "../components/video-player";

export default connect(state => state)(
  class Player extends React.Component {
    render() {
      return (
        <div>
          <h1>Hello, {this.props.kalturaPartnerId}!</h1>
          <VideoPlayer
            targetId={Math.random()
              .toString(36)
              .substring(2, 15)}
            referenceId="9781492026075-video321589"
          />
        </div>
      );
    }
  }
);

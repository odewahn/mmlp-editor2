import React from "react";
import Card from "@oreillymedia/design-system/Card";

export default class SearchResult extends React.Component {
  render() {
    return (
      <div
        style={{ float: "left" }}
        onClick={() => {
          console.log("They clicked", this.props.item.isbn);
        }}
      >
        <Card
          label={this.props.item.format}
          iconLabel={this.props.item.format}
          title={this.props.item.title}
          authors={this.props.item.authors}
          level={3}
        />
      </div>
    );
  }
}

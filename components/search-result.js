import React from "react";
import Card from "@oreillymedia/design-system/Card";
import CardGroup from "@oreillymedia/design-system/CardGroup";

export default class SearchResult extends React.Component {
  render() {
    return (
      <CardGroup>
        <div
          key={this.props.item.isbn}
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
      </CardGroup>
    );
  }
}

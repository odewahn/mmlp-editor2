import React from "react";

export default class SearchResult extends React.Component {
  render() {
    return (
      <li>
        <h2>{this.props.item.title}</h2>
        <p>{this.props.item.description}</p>
      </li>
    );
  }
}

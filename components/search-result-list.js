import React from "react";
import SearchResult from "./search-result";

export default class SearchResultList extends React.Component {
  render() {
    return (
      <div style={{ align: "left" }}>
        {this.props.results.map(result => <SearchResult item={result} />)}
      </div>
    );
  }
}

import React from "react";
import fetch from "isomorphic-unfetch";
import buildUrl from "build-url";
import { connect } from "react-redux";

import SearchBar from "@oreillymedia/design-system/SearchBar";
import Icon from "@oreillymedia/design-system/Icon";

import {
  List,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemGraphic,
  ListItemMeta
} from "@rmwc/list";

// Imported Actions
import {
  setSearchResults,
  setSelectedItem,
  fetchWorks,
  setErrorMessage,
  fetchSOLRContent
} from "../state/search";

function safeIterator(x) {
  return x ? x : [];
}

//  selected={this.props.selectedItem["id"] == item.id ? true : false}

class SearchResultList extends React.Component {
  render() {
    return (
      <div style={{ maxHeight: "75vh", overflowY: "auto" }}>
        <List twoLine>
          {safeIterator(this.props.results).map((item, idx) => (
            <ListItem
              onClick={() => {
                this.props.dispatch(setSelectedItem(item));
              }}
            >
              <ListItemGraphic icon={<Icon size={56} name={item.format} />} />
              <ListItemText>
                <ListItemPrimaryText>{item.title}</ListItemPrimaryText>
                <ListItemSecondaryText>
                  {item.chapter_title}
                </ListItemSecondaryText>
              </ListItemText>
              <ListItemMeta icon={<Icon name="chevron-right" />} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default connect(state => state)(
  class SearchWork extends React.Component {
    render() {
      return (
        <div>
          {this.props.searchSpinner ? <p>Searching...</p> : null}
          <SearchResultList
            results={this.props.results["results"]}
            {...this.props}
          />
        </div>
      );
    }
  }
);

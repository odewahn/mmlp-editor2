import React from "react";
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
  fetchSOLRContent,
  segmentInSelectedSegments
} from "../state/search";

function safeIterator(x) {
  return x ? x : [];
}

//

class SearchResultList extends React.Component {
  render() {
    return (
      <div style={{ maxHeight: "75vh", overflowY: "auto" }}>
        <List twoLine dorefresh={this.props.forceRefresh}>
          {safeIterator(this.props.results).map((item, idx) => (
            <ListItem
              onClick={() => {
                this.props.dispatch(setSelectedItem(item));
              }}
              selected={this.props.selectedItem["id"] == item.id ? true : false}
              key={"search-items" + this.props.selectedItem["id"] + "-" + idx}
            >
              <ListItemGraphic icon={<Icon size={56} name={item.format} />} />
              <ListItemText>
                <ListItemPrimaryText>{item.chapter_title}</ListItemPrimaryText>
                <ListItemSecondaryText>{item.title}</ListItemSecondaryText>
              </ListItemText>
              <ListItemMeta
                icon={
                  segmentInSelectedSegments(item, this.props.segments) ? (
                    <Icon name="checkmark" />
                  ) : (
                    <Icon name="chevron-right" />
                  )
                }
              />
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
          <SearchResultList
            results={this.props.results["results"]}
            {...this.props}
          />
        </div>
      );
    }
  }
);

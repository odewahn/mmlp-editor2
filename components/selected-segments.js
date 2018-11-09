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

import { deleteSegment } from "../state/search";

function safeIterator(x) {
  return x ? x : [];
}

export default connect(state => state)(
  class SelectedSegments extends React.Component {
    render() {
      return (
        <div style={{ maxHeight: "75vh", overflowY: "auto" }}>
          <List twoLine>
            {safeIterator(this.props.segments).map((item, idx) => (
              <ListItem
                key={
                  "selected-items" + this.props.selectedItem["id"] + "-" + idx
                }
              >
                <ListItemGraphic icon={<Icon size={56} name={item.format} />} />
                <ListItemText>
                  <ListItemPrimaryText>{item.title}</ListItemPrimaryText>
                  <ListItemSecondaryText>
                    {item.chapter_title}
                  </ListItemSecondaryText>
                </ListItemText>
                <ListItemMeta
                  icon={
                    <Icon
                      onClick={() => {
                        this.props.dispatch(deleteSegment(item));
                        console.log("they wanna delete", item);
                      }}
                      name="close-x"
                    />
                  }
                />
              </ListItem>
            ))}
          </List>
        </div>
      );
    }
  }
);

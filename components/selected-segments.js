import React from "react";
import { connect } from "react-redux";

import SearchBar from "@oreillymedia/design-system/SearchBar";
import Icon from "@oreillymedia/design-system/Icon";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

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

const SortableItem = SortableElement(({ value }) => {
  return (
    <ListItem>
      <ListItemGraphic icon={<Icon size={56} name={value.format} />} />
      <ListItemText>
        <ListItemPrimaryText>{value.title}</ListItemPrimaryText>
        <ListItemSecondaryText>{value.chapter_title}</ListItemSecondaryText>
      </ListItemText>
      <ListItemMeta
        icon={
          <Icon
            onClick={() => {
              this.props.dispatch(deleteSegment(value));
              console.log("they wanna delete", value);
            }}
            name="close-x"
          />
        }
      />
    </ListItem>
  );
});

const SortableList = SortableContainer(({ items }) => {
  return (
    <List twoLine>
      {safeIterator(items).map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </List>
  );
});

export default connect(state => state)(
  class SelectedSegments extends React.Component {
    /*
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
    */

    render() {
      return (
        <SortableList
          items={this.props.segments}
          onSortEnd={(oldIndex, newIndex) => {
            console.log("they're moving", oldIndex, newIndex);
          }}
        />
      );
    }
  }
);

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

import { deleteSegment, moveSegment } from "../state/search";

function safeIterator(x) {
  return x ? x : [];
}

/*
<ListItemMeta
  icon={
    <Icon
      index={999}
      onClick={() => {
        this.props.dispatch(deleteSegment(value));
        console.log("they wanna delete", value);
      }}
      name="close-x"
    />
  }
/>
*/
const SortableItem = SortableElement(({ value }) => {
  return (
    <ListItem>
      <ListItemGraphic icon={<Icon size={56} name={value.format} />} />
      <ListItemText>
        <ListItemPrimaryText>{value.title}</ListItemPrimaryText>
        <ListItemSecondaryText>{value.chapter_title}</ListItemSecondaryText>
      </ListItemText>
    </ListItem>
  );
});

const SortableList = SortableContainer(({ items }) => {
  return (
    <List twoLine>
      {safeIterator(items).map((value, index) => (
        <SortableItem key={`item-${index}`} value={value} index={index} />
      ))}
    </List>
  );
});

export default connect(state => state)(
  class SelectedSegments extends React.Component {
    render() {
      return (
        <SortableList
          items={this.props.segments}
          dorefresh={this.props.forceRefresh}
          onSortEnd={x => {
            this.props.dispatch(moveSegment(x));
          }}
        />
      );
    }
  }
);

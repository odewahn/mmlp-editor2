import React from "react";
import { connect } from "react-redux";

import SearchBar from "@oreillymedia/design-system/SearchBar";
import Icon from "@oreillymedia/design-system/Icon";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { SegmentConsumer } from "../state/segment-provider";

import {
  List,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemGraphic,
  ListItemMeta
} from "@rmwc/list";

import { deleteSegment, moveSegment, safeIterator } from "../state/search";

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
    <SegmentConsumer>
      {({ meta, setField }) => (
        <ListItem
          onClick={() => {
            setField("id", value.id);
            setField("title", value.title);
            setField("description", value.description);
            setField("intro", value.intro);
            setField("outro", value.outro);
            console.log(value);
          }}
        >
          <ListItemGraphic icon={<Icon size={56} name={value.format} />} />
          <ListItemText>
            <ListItemPrimaryText>{value.title}</ListItemPrimaryText>
            <ListItemSecondaryText>{value.work}</ListItemSecondaryText>
          </ListItemText>
        </ListItem>
      )}
    </SegmentConsumer>
  );
});

const SortableList = SortableContainer(({ items }) => {
  return (
    <div style={{ maxHeight: "75vh", overflowY: "auto" }}>
      <List twoLine>
        {safeIterator(items).map((value, index) => (
          <SortableItem key={`item-${index}`} value={value} index={index} />
        ))}
      </List>
    </div>
  );
});

export default connect(state => state)(
  class SelectedSegments extends React.Component {
    render() {
      return (
        <SortableList
          items={this.props.segments}
          dorefresh={this.props.forceRefresh}
          pressDelay={200}
          onSortEnd={x => {
            this.props.dispatch(moveSegment(x));
          }}
        />
      );
    }
  }
);

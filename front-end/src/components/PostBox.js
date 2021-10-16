import React from "react";
import { Card, Label, Image } from "semantic-ui-react";
import moment from "moment";

function PostBox(props) {
  const { body, createdAt, id, username, likeAmount, commentAmount, likes } =
    props.post;
  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra></Card.Content>
    </Card>
  );
}

export default PostBox;

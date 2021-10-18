import React from "react";
import { Card, Label, Button, Image, CardDescription } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

function PostBox(props) {
  const { body, createdAt, id, username, likeAmount, commentAmount, likes } =
    props.post;
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Button
            color="#6B8E23"
            content="Like"
            icon="thumbs up"
            label={{
              basic: true,
              color: "#6B8E23",
              pointing: "left",
              content: likeAmount ? likeAmount : 0,
            }}
          />
          <Button
            basic
            color="black"
            content="Comment"
            icon="comment alternate"
            label={{
              as: "a",
              basic: true,
              color: "black",
              pointing: "left",
              content: commentAmount ? commentAmount : 0,
            }}
          />
        </div>
      </Card.Content>
    </Card>
  );
}

export default PostBox;

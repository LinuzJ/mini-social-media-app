import React from "react";
import { Card, Label, Button, Image, CardDescription } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

function PostBox(props) {
  const { body, createdAt, id, username, likeAmount, commentAmount, likes } =
    props.post;

  function likePost() {
    console.log("Post liked");
  }
  function commentPost() {
    console.log("Commented on Post");
  }
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
            basic
            icon="thumbs up"
            label={{
              basic: true,
              color: "black",
              pointing: "left",
              content: likeAmount ? likeAmount : 0,
            }}
            onClick={likePost}
          />
          <Button
            basic
            color="black"
            icon="comment alternate"
            label={{
              as: "a",
              basic: true,
              color: "black",
              pointing: "left",
              content: commentAmount ? commentAmount : 0,
            }}
            onClick={commentPost}
          />
        </div>
      </Card.Content>
    </Card>
  );
}

export default PostBox;

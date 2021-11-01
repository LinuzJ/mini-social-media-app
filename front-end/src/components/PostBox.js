import React, { useContext } from "react";
import { Card, Button, Image, Icon } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

function PostBox(props) {
  const { body, createdAt, id, username, likeAmount, commentAmount, likes } =
    props.post;

  // Global context
  const context = useContext(AuthContext);

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
          <LikeButton user={context.user} post={{ id, likes, likeAmount }} />
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
            as={Link}
            to={`/posts/${id}`}
          />
          {context.user && context.user.username === username && (
            <Button
              as="div"
              onClick={() => {
                console.log("Deleted post");
              }}
              floated="right"
            >
              <Icon name="delete" style={{ margin: 0 }} />
            </Button>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}

export default PostBox;

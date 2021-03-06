import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import DeleteCommentButton from "../components/DeleteCommentButton";
import queries from "../utils/queries";

import { AuthContext } from "../context/auth";

// Style
import {
  Segment,
  Dimmer,
  Loader,
  Grid,
  GridColumn,
  Card,
  CardContent,
  Image,
  Button,
} from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import CreateComment from "../components/CreateComment";

const Post = (props) => {
  // Get post id from url
  const postId = props.match.params.PostId;
  const context = useContext(AuthContext);
  // query
  const { loading, data } = useQuery(queries.GET_POST_QUERY, {
    variables: {
      postId,
    },
  });
  let layout; // init layour variable

  if (loading) {
    layout = (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  } else {
    const {
      id,
      username,
      createdAt,
      body,
      commentsAmount,
      likesAmount,
      likes,
      comments,
    } = data.getPost;
    layout = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated="right"
              size="medium"
              src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton
                  user={context.user}
                  post={{ id, likes, likesAmount }}
                />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("Comment")}
                >
                  <Button
                    basic
                    icon="comment alternate"
                    label={{
                      as: "a",
                      basic: true,
                      color: "black",
                      pointing: "left",
                      content: commentsAmount ? commentsAmount : 0,
                    }}
                  />
                </Button>
                <DeleteButton user={context.user} post={{ id, username }} />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={10} center>
            <CreateComment id={postId} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={10} center>
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                  {context.user &&
                    context.user.username === comment.username && (
                      <DeleteCommentButton
                        post={id}
                        username={comment.username}
                        comment={comment.id}
                        user={context.user}
                      />
                    )}
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return layout;
};

export default Post;

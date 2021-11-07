import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
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
} from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../components/LikeButton";

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
    const post = data.getPost;
    layout = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated="right"
              size="mini"
              src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{post.username}</Card.Header>
                <Card.Meta>{moment(post.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{post.body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={context.user} post={post} />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return layout;
};

export default Post;

import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import PostBox from "./components/PostBox";

const POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      createdAt
      username
      likesAmount
      likes {
        username
      }
      commentsAmount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
function Home() {
  const { loading, data } = useQuery(POSTS_QUERY);
  return (
    <Grid columns={3} divided>
      <Grid.Row>
        <h1>POSTS</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <p>Loading Posts</p>
        ) : (
          data.getPosts.map((post) => (
            <Grid.Column key={post.id}>
              <PostBox post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;

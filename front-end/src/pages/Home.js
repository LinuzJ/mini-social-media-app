import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import PostBox from "../components/PostBox";
import PostWrite from "../components/PostWrite";
import queries from "../utils/queries";

function Home() {
  const { loading, data } = useQuery(queries.GET_POSTS_QUERY);
  return (
    <Grid columns={1}>
      <Grid.Row className="title">
        <h1>POSTS</h1>
      </Grid.Row>
      <Grid.Row>
        <PostWrite />
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <p>Loading Posts</p>
        ) : data ? (
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 10 }}>
              <PostBox post={post} />
            </Grid.Column>
          ))
        ) : (
          <p style={{ margin: "auto" }}>No posts added!</p>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;

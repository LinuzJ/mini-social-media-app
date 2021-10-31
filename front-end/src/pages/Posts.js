import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import PostBox from "../components/PostBox";
import { AuthContext } from "../context/auth";
import queries from "../utils/queries";

function Posts() {
  const { loading, data } = useQuery(queries.GET_POSTSOF_QUERY);

  const context = useContext(AuthContext);

  return (
    <Grid columns={1}>
      <Grid.Row className="title">
        <h1>POSTS</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <p>Loading Posts</p>
        ) : data ? (
          data.getPostsOf(context.user).map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 10 }}>
              <PostBox post={post} />
            </Grid.Column>
          ))
        ) : (
          <p style={{ margin: "auto" }}>You have not added any posts!</p>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Posts;

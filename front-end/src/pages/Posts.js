import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";
import PostBox from "../components/PostBox";
import { AuthContext } from "../context/auth";
import queries from "../utils/queries";

function Posts() {
  const context = useContext(AuthContext);

  const { loading, data } = useQuery(queries.GET_POSTSOF_QUERY, {
    variables: {
      username: context.user.username,
    },
  });

  return (
    <Grid columns={1}>
      <Grid.Row className="title">
        <h1>POSTS</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <p>Loading Posts</p>
        ) : data.getPostsOf ? (
          data.getPostsOf.map((post) => (
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

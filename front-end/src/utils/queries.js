import gql from "graphql-tag";

const queries = {
  SEND_POST_MUTATION: gql`
    mutation createPost($body: String!) {
      createPost(body: $body) {
        id
        body
        createdAt
        username
        likes {
          id
          username
          createdAt
        }
        likesAmount
        comments {
          id
          body
          username
          createdAt
        }
        commentsAmount
      }
    }
  `,
  GET_POSTS_QUERY: gql`
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
  `,
  GET_POSTSOF_QUERY: gql`
    query getPostsOf($user: String!) {
      getPostsOf(user: $user) {
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
  `,
};

export default queries;

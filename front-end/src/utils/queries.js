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
    query getPostsOf($username: String!) {
      getPostsOf(username: $username) {
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
  LIKE_POST_QUERY: gql`
    mutation likePost($postId: ID!) {
      likePost(postId: $postId) {
        id
        likes {
          id
          username
        }
        likesAmount
      }
    }
  `,
  GET_POST_QUERY: gql`
    query ($postId: ID!) {
      getPost(postId: $postId) {
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
  DELETE_POST_QUERY: gql`
    mutation deletePost($postId: ID!) {
      deletePost(postId: $postId)
    }
  `,
  DELETE_COMMENT_QUERY: gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
      deleteComment(postId: $postId, commentId: $commentId) {
        id
      }
    }
  `,
  SEND_COMMENT_MUTATION: gql`
    mutation createComment($postId: String!, $body: String!) {
      createComment(postId: $postId, body: $body) {
        id
        body
        createdAt
        username
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

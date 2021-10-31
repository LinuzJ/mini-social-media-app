import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import { ValuesOfCorrectTypeRule } from "graphql";

const POST_MUTATION = gql`
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
`;

const PostWrite = (props) => {
  // Global login context
  const context = useContext(AuthContext);
  // Form body state
  const [inputs, setInputs] = useState({
    body: "",
  });
  // Errors
  const [errors, setErrors] = useState({});

  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  // USe the mutation query
  const [post, { error }] = useMutation(POST_MUTATION, {
    variables: inputs,
    update(proxy, result) {
      console.log(result);
      inputs.body = "";
    },
  });

  // onSubmit for posting
  const onSubmit = (event) => {
    event.preventDefault();
    post();
  };

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="Write your post here!"
          name="body"
          onChange={onChange}
          value={inputs.body}
        />
        <Button type="submit">Post</Button>
      </Form.Field>
    </Form>
  );
};

export default PostWrite;

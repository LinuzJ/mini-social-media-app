import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import queries from "../utils/queries";

const PostWrite = (props) => {
  // Global login context
  const context = useContext(AuthContext);
  // Form body state
  const [inputs, setInputs] = useState({
    body: "",
  });

  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  // USe the mutation query
  const [post, { error }] = useMutation(queries.SEND_POST_MUTATION, {
    variables: inputs,
    update(proxy, result) {
      // get data from apollo cache
      const cache = proxy.readQuery({
        query: queries.GET_POSTS_QUERY,
      });
      // Update same data with the newly created post
      proxy.writeQuery({
        query: queries.GET_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...cache.getPosts],
        },
      });
      inputs.body = "";
    },
  });

  // State to determine if post form is shown or not
  const [showForm, setShowForm] = useState();

  // onSubmit for posting
  const onSubmit = (event) => {
    event.preventDefault();
    setShowForm();
    post();
  };

  const form = (
    <div style={{ margin: "auto" }}>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Write your post here!"
            name="body"
            onChange={onChange}
            value={inputs.body}
            style={{
              width: "200px",
              heigh: "200px",
            }}
            error={error ? true : false}
          />
          <Button type="submit">Post</Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </div>
  );

  const button = (
    <div style={{ margin: "auto" }}>
      <Button
        onClick={() => {
          setShowForm(true);
        }}
      >
        Create Post
      </Button>
    </div>
  );

  const dispay = context.user ? (
    error ? (
      form
    ) : showForm ? (
      form
    ) : (
      button
    )
  ) : (
    <div style={{ margin: "auto" }}>Login to create posts!</div>
  );

  return dispay;
};

export default PostWrite;

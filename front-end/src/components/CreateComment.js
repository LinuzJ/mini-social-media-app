import React, { useContext, useState } from "react";
import { Form, Button, Message, Card } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import queries from "../utils/queries";

function CreateComment({ id }) {
  // Global context
  const context = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const [postComment] = useMutation(queries.SEND_COMMENT_MUTATION, {
    update() {
      setComment("");
    },
    variables: {
      postId: id,
      body: comment,
    },
  });
  const display = context.user ? (
    <>
      <p>Post a Comment!</p>
      <Form>
        <div className="ui">
          <Form.Input
            placeholder="Write your comment here!"
            name="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            type="text"
          />
          <Button
            className="ui button teal"
            type="submit"
            disabled={comment.trim() === ""}
            onClick={postComment}
          >
            Post
          </Button>
        </div>
      </Form>
    </>
  ) : (
    <p>Please Login to post a comment!</p>
  );
  return (
    <Card fluid>
      <Card.Content>{display}</Card.Content>
    </Card>
  );
}

export default CreateComment;

import React, { useContext } from "react";
import { Form, Button, Message, Card } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

function CreateComment() {
  // Global context
  const context = useContext(AuthContext);

  return (
    <Card fluid>
      <Form className="comment-box">
        <Form.Input
          label="Comment"
          placeholder="Write your comment here!"
          name="comment"
          type="text"
        />

        <Button type="comment">Submit Comment</Button>
      </Form>
    </Card>
  );
}

export default CreateComment;

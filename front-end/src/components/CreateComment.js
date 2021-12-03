import React, { useContext } from "react";
import { Form, Button, Message, Card } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

import PostWriteComment from "./PostWriteComment";

function CreateComment() {
  // Global context
  const context = useContext(AuthContext);

  return (
    <Card fluid>
      <PostWriteComment />
    </Card>
  );
}

export default CreateComment;

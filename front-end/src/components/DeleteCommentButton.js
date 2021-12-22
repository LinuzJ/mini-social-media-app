import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Confirm } from "semantic-ui-react";
import queries from "../utils/queries";

const DeleteCommentButton = (props) => {
  // Extract data from props
  const postId = props.post;
  const username = props.username;
  const commentId = props.comment;
  const user = props.user;

  console.log(postId, username, commentId, user);
  const [confirm, setConfirm] = useState(false);

  // Mutation for like
  const [deleteComment] = useMutation(queries.DELETE_COMMENT_QUERY, {
    update() {
      setConfirm(false);
      // TODO: Remove from apollo cache
    },
    variables: { postId: postId, commentId: commentId },
  });

  return (
    <>
      {user && user.username === username && (
        <>
          <Button
            as="div"
            onClick={() => {
              setConfirm(true);
            }}
            floated="right"
          >
            <Icon name="delete" style={{ margin: 0 }} />
          </Button>
          <Confirm
            open={confirm}
            onCancel={() => setConfirm(false)}
            onConfirm={deleteComment}
          />
        </>
      )}
    </>
  );
};

export default DeleteCommentButton;

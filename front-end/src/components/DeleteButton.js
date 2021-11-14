import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Confirm } from "semantic-ui-react";
import queries from "../utils/queries";

const DeleteButton = (props) => {
  // Extract data from props
  const { id, username } = props.post;
  const { user } = props;

  const [confirm, setConfirm] = useState(false);

  // Mutation for like
  const [deletePost] = useMutation(queries.DELETE_POST_QUERY, {
    update() {
      setConfirm(false);
      // TODO: Remove from apollo cache
    },
    variables: { postId: id },
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
            onConfirm={deletePost}
          />
        </>
      )}
    </>
  );
};

export default DeleteButton;

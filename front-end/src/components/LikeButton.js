import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Button } from "semantic-ui-react";
import queries from "../utils/queries";

const LikeButton = (props) => {
  // Extract data from props
  const { id, likesAmount, likes } = props.post;
  const { user } = props;

  // state for if liked
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((x) => x.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);
  // Mutation for like
  const [likePost] = useMutation(queries.LIKE_POST_QUERY, {
    variables: { postId: id },
  });

  // Like button depending on login and if liked
  const button = user ? (
    // If logged in
    liked ? (
      // If this user has liked
      <Button
        color="facebook"
        icon="thumbs up"
        label={{
          basic: true,
          color: "black",
          pointing: "left",
          content: likesAmount ? likesAmount : 0,
        }}
        onClick={likePost}
      />
    ) : (
      // If this user has not liked
      <Button
        color="facebook"
        basic
        icon="thumbs up"
        label={{
          basic: true,
          color: "black",
          pointing: "left",
          content: likesAmount ? likesAmount : 0,
        }}
        onClick={likePost}
      />
    )
  ) : (
    // If the user is not logged in, link to login
    <Button
      as={Link}
      to="/login"
      color="facebook"
      basic
      icon="thumbs up"
      label={{
        basic: true,
        color: "black",
        pointing: "left",
        content: likesAmount ? likesAmount : 0,
      }}
      onClick={likePost}
    />
  );
  return button;
};

export default LikeButton;

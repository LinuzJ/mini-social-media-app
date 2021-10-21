import React, { useState } from "react";
import { Icon, Button, Form, Message } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

// Query for registering user, returns data and token
const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      authToken
    }
  }
`;
function Register() {
  // State for input variables, used for login verification
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  // errors
  const [errors, setErrors] = useState({});

  // onChange to change the values of the variables
  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  // Add user
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
      console.log(errors);
    },
    variables: inputs,
  });

  // onSubmit for registration
  const onSubmit = (event) => {
    event.preventDefault();
    console.log("trying to update with: ", inputs);
    addUser();
  };
  return (
    <div className="registration_container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>
          <Form.Input
            label="Username"
            placeholder="exampleUsername123"
            name="username"
            type="text"
            value={inputs.username}
            onChange={onChange}
          />
          <Form.Input
            label="Email"
            placeholder="example.email@emai.com"
            name="email"
            type="email"
            value={inputs.email}
            onChange={onChange}
          />
          <Form.Input
            label="Password"
            placeholder="*********"
            name="password"
            type="password"
            value={inputs.password}
            onChange={onChange}
          />
          <Form.Input
            label="Confirm Password"
            placeholder="*********"
            name="confirmPassword"
            type="password"
            value={inputs.confirmPassword}
            onChange={onChange}
          />
          <Button icon labelPosition="right">
            Submit
            <Icon name="right arrow" />
          </Button>
        </h1>
      </Form>
      {Object.keys(errors).length !== 0 && (
        <Message negative>
          <Message.Header>Mo bamba</Message.Header>
          <ul className="list-error">
            {Object.values(errors).map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </Message>
      )}
    </div>
  );
}

export default Register;

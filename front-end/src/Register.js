import React, { useState } from "react";
import { Icon, Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";

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
      token
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
  // onChange to change the values of the variables
  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  // onSubmit for registration
  const onSubmit = (event) => {};
  return (
    <>
      <Form onSubmit={onSubmit} noValidate>
        <h1>
          <Form.Input
            label="Username"
            placeholder="exampleUsername123"
            name="username"
            value={inputs.username}
            onChange={onChange}
          />
          <Form.Input
            label="Email"
            placeholder="example.email@emai.com"
            name="email"
            value={inputs.email}
            onChange={onChange}
          />
          <Form.Input
            label="Password"
            placeholder="*********"
            name="password"
            value={inputs.password}
            onChange={onChange}
          />
          <Form.Input
            label="Confirm Password"
            placeholder="*********"
            name="confirmPassword"
            value={inputs.confirmPassword}
            onChange={onChange}
          />
          <Button icon labelPosition="right">
            Submit
            <Icon name="right arrow" />
          </Button>
        </h1>
      </Form>
    </>
  );
}

export default Register;

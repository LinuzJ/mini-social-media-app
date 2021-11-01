import React, { useState, useContext } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

// Query for registering user, returns data and token
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      authToken
    }
  }
`;
function Login(props) {
  // global context for login
  const context = useContext(AuthContext);
  // State for input variables, used for login verification
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  // errors
  const [errors, setErrors] = useState({});

  // onChange to change the values of the variables
  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  // Add user
  const [login, { loading }] = useMutation(LOGIN, {
    update(_, result) {
      context.login(result.data.login);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: inputs,
  });

  // onSubmit for registration
  const onSubmit = (event) => {
    event.preventDefault();
    login();
  };
  return (
    <div className="registration_container">
      <h1>LOGIN</h1>
      <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          value={inputs.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="text"
          value={inputs.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />

        <Button type="login">Login</Button>
      </Form>
      {Object.keys(errors).length !== 0 && (
        <Message negative>
          <Message.Header>Error</Message.Header>
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

export default Login;

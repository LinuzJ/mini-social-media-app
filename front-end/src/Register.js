import React, { useState, useContext } from "react";
import { Icon, Button, Form, Message } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "./context/auth";
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
function Register(props) {
  // global context for login
  const context = useContext(AuthContext);
  // State for input variables, used for login verification
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  // errors
  const [errors, setErrors] = useState({});

  //isGoodAwnser
  const [recieved, setRecieved] = useState();

  // onChange to change the values of the variables
  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  // Add user
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      setRecieved(result.data.register.username);
      context.login(result.data.login);
      props.history.push("");
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
  // Main return
  return (
    <div className="registration_container">
      <h1>REGISTER</h1>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>
          <Form.Input
            label="Username"
            placeholder="exampleUsername123"
            name="username"
            type="text"
            value={inputs.username}
            error={errors.username ? true : false}
            onChange={onChange}
          />
          <Form.Input
            label="Email"
            placeholder="example.email@emai.com"
            name="email"
            type="email"
            value={inputs.email}
            error={errors.email ? true : false}
            onChange={onChange}
          />
          <Form.Input
            label="Password"
            placeholder="*********"
            name="password"
            type="password"
            value={inputs.password}
            error={errors.password ? true : false}
            onChange={onChange}
          />
          <Form.Input
            label="Confirm Password"
            placeholder="*********"
            name="confirmPassword"
            type="password"
            value={inputs.confirmPassword}
            error={errors.confirmPassword ? true : false}
            onChange={onChange}
          />
          <Button icon labelPosition="right">
            Submit
            <Icon name="right arrow" />
          </Button>
        </h1>
      </Form>
      {recieved ? (
        <Message success>
          <Message.Header>Success!</Message.Header>
          <p>Successfully added user "{recieved}"</p>
        </Message>
      ) : (
        ""
      )}
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

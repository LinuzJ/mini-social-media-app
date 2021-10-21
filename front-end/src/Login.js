import React from "react";
import { Form, Button } from "semantic-ui-react";

function Login() {
  return (
    <div className="registration_container">
      <h1>LOGIN</h1>
      <Form>
        <Form.Field>
          <label>Username</label>
          <input placeholder="Username" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder="Password" />
        </Form.Field>

        <Button type="login">Login</Button>
      </Form>
    </div>
  );
}

export default Login;

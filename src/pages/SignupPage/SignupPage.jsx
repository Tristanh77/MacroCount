import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
} from "semantic-ui-react";
import { useState } from "react";
import userService from "../../utils/userService";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useNavigate, Link } from "react-router-dom";
import "./SignupPage.css"; // Add the CSS import

export default function Signup({ handleSignUpOrLogin }) {
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    passwordConf: "",
    bio: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await userService.signup(state);
      handleSignUpOrLogin();
      navigate("/create-profile");
    } catch (err) {
      console.log(err.message, " this is the error signup up");
      setError("Check your terminal, there was an error signing up!");
    }
  }

  return (
    <Grid
      textAlign="center"
      style={{ height: "100vh" }}
      verticalAlign="top" // Changed from "middle" to "top"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" style={{ color: '#f9744b' }} textAlign="center">
          Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="name"
              placeholder="name"
              value={state.name}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Button
              style={{ backgroundColor: '#102937', color: 'white', borderRadius: '5px' }} // Matching the style
              fluid
              size="large"
              type="submit"
              className="btn"
            >
              Signup
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <Link to="/login">Login Here</Link>
        </Message>
        {error ? <ErrorMessage error={error} /> : null}
      </Grid.Column>
    </Grid>
  );
}

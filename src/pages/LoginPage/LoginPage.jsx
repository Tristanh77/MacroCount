import React, { useState } from "react";
import { Button, Form, Header, Segment, Message, Icon } from "semantic-ui-react";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import "./LoginPage.css";

export default function LoginPage({ handleSignUpOrLogin }) {
  const [error, setError] = useState("");
  const [state, setState] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await userService.login(state);
      handleSignUpOrLogin();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  return (
    <div className="auth-page">
      <div className="animated-bg"></div>
      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="orb orb3"></div>
      <div className="rotating-ring"></div>

      <div className="auth-card">
        <div className="brand-container">
          <Icon name="heartbeat" size="large" className="brand-icon" />
          <span className="brand-name">MacroCount</span>
        </div>
        <Header as="h2" className="auth-header" textAlign="center">
          Log In To Your Account
        </Header>
        <p className="auth-subtagline">
          Welcome back! Continue achieving your nutrition goals.
        </p>
        <ul className="auth-features-list">
          <li><Icon name="check circle" /> Access your custom macro targets</li>
          <li><Icon name="check circle" /> Review past meals & workouts</li>
          <li><Icon name="check circle" /> Stay on track with daily insights</li>
        </ul>

        <Form onSubmit={handleSubmit}>
          <Segment stacked className="auth-segment">
            <Form.Input
              type="email"
              name="email"
              placeholder="Email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Button
              fluid
              size="large"
              type="submit"
              className="auth-btn primary-btn"
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message className="auth-message">
          New to us? <Link to="/signup" className="auth-link">Sign Up</Link>
        </Message>
        {error && <ErrorMessage error={error} />}
      </div>
    </div>
  );
}
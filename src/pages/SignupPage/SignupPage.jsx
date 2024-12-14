import React, { useState } from "react";
import { Button, Form, Header, Segment, Message, Icon } from "semantic-ui-react";
import { useNavigate, Link } from "react-router-dom";
import userService from "../../utils/userService";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./SignupPage.css";

export default function Signup({ handleSignUpOrLogin }) {
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await userService.signup(state);
      handleSignUpOrLogin();
      navigate("/create-profile");
    } catch (err) {
      setError("Check your terminal, there was an error signing up!");
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
          Create Your Account
        </Header>
        <p className="auth-subtagline">
          Kickstart your fitness journey with customized macro goals.
        </p>
        <ul className="auth-features-list">
          <li><Icon name="check circle" /> Personalized macro targets</li>
          <li><Icon name="check circle" /> Easy meal & exercise logging</li>
          <li><Icon name="check circle" /> Track progress & daily resets</li>
        </ul>

        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked className="auth-segment">
            <Form.Input
              name="name"
              placeholder="Name"
              value={state.name}
              onChange={handleChange}
              required
            />
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
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Button
              fluid
              size="large"
              type="submit"
              className="auth-btn primary-btn"
            >
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Message className="auth-message">
          Already have an account? <Link to="/login" className="auth-link">Login Here</Link>
        </Message>
        {error && <ErrorMessage error={error} />}
      </div>
    </div>
  );
}
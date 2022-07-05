import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div>
      if no token:
      <br />
      <Link to="/sign-in">Sign In</Link>
      <br />
      <Link to="/sign-up">Sign Up</Link>
      <br />
      <br />
      if token:
      <br />
      <Link to="/my-projects">Start</Link>
      <br />
      <Link to="/">Sign Out</Link>
    </div>
  )
}

export default Welcome
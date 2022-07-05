import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FormField from './FormField';
import RememberMe from './RememberMe';
import SignButton from './SignButton';
import { BASE_URL } from '../../utils/globalConst.js'

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const [notes, setNotes] = useState("");

  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onNameChange = (e) => setName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1));
  const onRememberMeChange = (e) => setRememberMe(e.target.checked);

  const onSignButtonClick = async (e) => {
    e.preventDefault();
    let noteMessage = ""
    if (email === "") {
      noteMessage += "email is required.\n";
    }
    if (name === "") {
      noteMessage += "name is required.\n";
    }
    if (password.length < 4) {
      noteMessage += "Your password must contain at least 4 characters.";
    }
    if (noteMessage) {
      setNotes(noteMessage);
      return;
    }

    const params = {
      name,
      email,
      password,
      rememberMe
    }
    try {
      const results = await axios.post(BASE_URL + "/users/signup", { params });
      console.log("results:", results);
    } catch (err) {
      console.error("error:", err);
      setNotes("Something wrong.");
    }
  }



  return (
    <div className="sign-up" onSubmit={(e) => onSignButtonClick(e)}>
      <form className='sign-form-container'>
        <div className="fields-container">
          <FormField onFieldChange={onEmailChange} type={"email"} field={"Email"} valField={email} />
          <FormField onFieldChange={onPasswordChange} type={"password"} field={"Password"} valField={password} />
          <FormField onFieldChange={onNameChange} type={"text"} field={"Name"} valField={name} />
          <RememberMe onCheckboxChange={onRememberMeChange} valRememberMe={rememberMe} />
        </div>
        <SignButton notes={notes} />
      </form>
      <div className="other-sign-type center-text">
        <span>Do you already have an account? </span>
        <Link to="/sign-in">Sign In</Link>
      </div>
    </div>
  );
}

export default SignUpForm
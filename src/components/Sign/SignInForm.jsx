import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormField from './FormField';
import RememberMe from './RememberMe';
import SignButton from './SignButton';
import { BASE_URL } from '../../utils/globalConst.js'
import { UserContext } from '../../providers/UserProvider';

function SignInForm() {
  const { setUser } = useContext(UserContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onRememberMeChange = (e) => setRememberMe(e.target.checked);

  const onSignButtonClick = async (e) => {
    e.preventDefault();
    setNotes("Loading...");
    let noteMessage = ""
    if (email === "") {
      noteMessage += "email is required.\n";
    }
    if (password.length < 4) {
      noteMessage += "Your password must contain at least 4 characters.";
    }
    if (noteMessage) {
      setNotes(noteMessage);
      return;
    }

    const params = {
      email,
      password,
      rememberMe
    }
    try {
      const results = await axios.post(BASE_URL + "/users/signin", params);
      setUser(results.data.user);
      if (rememberMe && results.data.hasOwnProperty('token')) {
        localStorage.setItem('TOKEN', results.data.token);
      }
      navigate('/my-projects');
    } catch (err) {
      setNotes("Sign in failed.");
    }
  }

  return (
    <div className="sign-in">
      <form className='sign-form-container' onSubmit={(e) => onSignButtonClick(e)}>
        <div className="fields-container">
          <FormField type={"email"} field={"Email"} onFieldChange={onEmailChange} valField={email} />
          <FormField type={"password"} field={"Password"} onFieldChange={onPasswordChange} valField={password} />
          <RememberMe onCheckboxChange={onRememberMeChange} valRememberMe={rememberMe} />
        </div>
        <SignButton />
      </form>
      <section className='notes'>{notes}</section>
      <div className="other-sign-type center-text">
        <section>
          <span>Forget your password? </span>
          <Link to="/sign-in">click hear</Link>
          <span> to send you a new password to your mail</span>
        </section>
        <section>
          <span>Do you already have an account? </span>
          <Link to="/sign-up">Sign Up</Link>
        </section>
      </div>
    </div>
  )
}

export default SignInForm